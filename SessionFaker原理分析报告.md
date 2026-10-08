# SessionFaker 插件原理分析报告

> 分析对象：`advent259141/astrbot_plugin_SessionFaker`
> 分析日期：2026-10-08
> 目标：解释该插件为什么能让 QQ 群聊中的“合并转发消息”显示成多个不同用户的发言，以及这种“伪造”在协议层面究竟伪造了什么。

## 一、结论摘要

这个插件并不是修改 QQ 服务器上的真实聊天记录，也不是盗用其他 QQ 账号登录。它做的事情是：

1. 接收形如 `伪造消息 QQ号 内容 | QQ号 内容` 的指令；
2. 把指令拆成多个消息节点；
3. 为每个节点填入一个可自定义的 `user_id`、`nickname` 和消息内容；
4. 通过 AstrBot 的消息组件，把节点包装成 OneBot/QQ 协议端能够识别的“合并转发消息”；
5. 由机器人账号发送这条合并转发消息。

因此，QQ 客户端看到的“某人说了一句话”主要是合并转发节点中的**展示元数据**。真正的发送者仍然是机器人账号。它伪造的是“转发卡片中的节点外观”，不是 QQ 服务器签名的原始聊天记录。

## 二、总体工作流程

```text
用户消息
   |
   v
AstrBot 监听所有消息
   |
   v
检测是否以“伪造消息”开头
   |
   +--> 解析文本段、图片段和“|”分隔符
   |
   +--> 从每段开头提取 QQ 号和正文
   |
   +--> 查询第三方接口获取昵称，失败则使用“用户{QQ号}”
   |
   v
为每段创建 Node(uin, name, content)
   |
   v
将 Node 列表包装为 Nodes
   |
   v
AstrBot aiocqhttp 适配器转换为 OneBot 消息
   |
   v
调用 send_group_forward_msg 或 send_private_forward_msg
   |
   v
QQ 客户端显示为合并转发卡片
```

## 三、插件侧源码分析

以下行号以插件提交 `9540a997e7d3f37c035344663f34eccab7e06025` 为准。

### 1. 监听入口

`main.py` 中的 `on_all_message` 使用 `@event_message_type(EventMessageType.ALL)`，所以会接收所有消息，而不是只接收某个固定群或某个管理员的命令。

```python
message_text = event.message_str

if not message_text.startswith("伪造消息"):
    return
```

只有消息字符串以精确的 `伪造消息` 开头时，插件才会继续处理。它没有看到命令前缀、权限白名单、调用者 QQ 号白名单或群聊白名单。

### 2. 解析文本和图片

`parse_message_components` 遍历 AstrBot 的消息组件：

- `Plain`：普通文本；
- `Image`：图片组件，插件只取其 `url`。

文本组件中的 `|` 被用作消息节点分隔符。图片则根据组件出现的位置追加到“当前段落”。例如：

```text
伪造消息 10001 第一条 | 10002 第二条
```

会被拆成两个候选段：

```text
段落 1：10001 第一条
段落 2：10002 第二条
```

如果图片组件出现在某个文本段之后，图片会被加入该段的 `images` 列表，后续再转换成 `CompImage.fromURL(img_url)`。

这种解析方式实际上是“按组件顺序做有限状态归组”，不是完整的富文本解析器。它有几个明显边界：

- 正文中不能直接包含 `|`，因为 `|` 会被当作分隔符；
- 图片归属依赖 QQ/AstrBot 把文本和图片拆成不同组件的顺序；
- 如果图片位置和文本组件拆分方式发生变化，图片可能被归到相邻段落；
- 只显式处理了 `Plain` 和 `Image`，语音、视频、@、表情、回复等组件没有完整的节点级映射。

### 3. 提取 QQ 号和正文

对每个段落，插件使用：

```python
match = re.match(r'^\s*(\d+)\s+(.*)', text)
```

也就是：

- 开头允许空白；
- 接着必须是纯数字 QQ 号；
- 然后至少一个空白字符；
- 剩余部分作为正文。

例如 `10001 你好` 被解析为：

```text
qq_number = "10001"
content   = "你好"
```

格式不符合时，当前段落会被跳过。

### 4. 获取昵称

`get_qq_nickname` 不是调用 QQ 官方账号接口，而是请求第三方 HTTP 接口：

```text
http://api.mmp.cc/api/qqname?qq={qq_number}
```

当接口返回 `code == 200` 且包含 `data.name` 时，插件使用返回的昵称；否则使用：

```text
用户{qq_number}
```

这意味着：

- 昵称来自外部服务，不保证是当前 QQ 群里的群名片；
- 昵称可能过期、错误或被第三方服务修改；
- 每个节点都会产生一次外部请求，节点越多越慢；
- 当前代码使用明文 HTTP，QQ 号会被发送给第三方服务；
- 失败时只是降级为占位昵称，不会阻止伪造消息生成。

### 5. 构造 Node 和 Nodes

插件为每段创建一个 `Node`：

```python
node = Node(
    uin=int(qq_number),
    name=nickname,
    content=node_content
)
```

其中：

- `uin`：节点显示的 QQ 号；
- `name`：节点显示的昵称；
- `content`：正文 `Plain` 加上按位置归组的图片。

随后创建：

```python
nodes = Nodes(nodes=nodes_list)
yield event.chain_result([nodes])
```

`Node`/`Nodes` 是 AstrBot 的跨协议消息抽象。它们本身不是 QQ 网络包，而是等待平台适配器转换为具体协议格式。

## 四、AstrBot/OneBot 层为什么能显示成“别人发的”

AstrBot 当前的 `Node` 定义明确把昵称和用户号作为节点字段。转换为 OneBot 字典时，核心结构近似为：

```json
{
  "type": "node",
  "data": {
    "user_id": "10001",
    "nickname": "张三",
    "content": [
      {
        "type": "text",
        "data": {
          "text": "第一条消息"
        }
      }
    ]
  }
}
```

`Nodes` 再把多个这样的对象放进：

```json
{
  "messages": [
    {
      "type": "node",
      "data": {
        "user_id": "10001",
        "nickname": "张三",
        "content": []
      }
    },
    {
      "type": "node",
      "data": {
        "user_id": "10002",
        "nickname": "李四",
        "content": []
      }
    }
  ]
}
```

AstrBot 的 `aiocqhttp` 适配器在发送时检测到 `Node` 或 `Nodes`，会转换成合并转发调用：

- 群聊：`send_group_forward_msg`；
- 私聊：`send_private_forward_msg`。

因此，关键点是：OneBot/QQ 协议端的合并转发节点格式允许发送方提供每个节点的 `user_id` 和 `nickname` 展示字段。客户端在渲染合并转发卡片时，会把这些字段显示成节点标题和头像关联信息。

需要注意，这个能力依赖于所使用的 QQ 协议端、OneBot 实现和 QQ 客户端的具体行为。不同版本可能：

- 接受并完整显示自定义节点；
- 对昵称、头像或用户号做覆盖；
- 只显示机器人本身；
- 不支持合并转发节点；
- 对节点内容做格式转换或压缩。

所以“能伪造”不是 QQ 全局保证的性质，而是特定 OneBot 合并转发实现的兼容行为。

## 五、它到底伪造了什么

可以把消息的可信属性分成几层：

| 层次 | 本插件能否改变 | 说明 |
|---|---|---|
| QQ 服务器真实消息记录 | 不能 | 服务器记录的实际发送者仍是机器人 |
| 机器人发出的消息包 | 能 | 插件构造并发送自定义合并转发消息 |
| 合并转发节点的 `user_id` 字段 | 能 | 由插件填写，通常可自定义 |
| 合并转发节点的 `nickname` 字段 | 能 | 由插件填写，通常可自定义 |
| 节点正文和图片 | 能 | 由插件解析后拼入节点 |
| QQ 客户端最终显示效果 | 取决于客户端/协议端 | 可能显示为节点中的用户 |
| 对方账号的登录、签名、服务端审计 | 不能 | 没有获得其他账号凭证或私钥 |

因此，更准确的名称是“伪造合并转发消息节点的展示身份”，而不是“伪造某人的真实 QQ 消息”。

## 六、端到端示例

输入：

```text
伪造消息 10001 你好 | 10002 我在听 | 10001 那就好 |
```

插件大致会执行：

```text
解析段落
  -> 10001 你好
  -> 10002 我在听
  -> 10001 那就好

查询昵称
  -> 10001 -> 张三
  -> 10002 -> 李四

创建节点
  -> Node(uin=10001, name=张三, content=你好)
  -> Node(uin=10002, name=李四, content=我在听)
  -> Node(uin=10001, name=张三, content=那就好)

包装并发送
  -> Nodes(...)
  -> send_group_forward_msg(...)
```

QQ 客户端通常会显示一张合并转发卡片，卡片内部的三个节点分别显示成 `张三`、`李四`、`张三`。

## 七、主要限制与潜在问题

### 功能限制

1. **只支持有限消息类型**
   主要支持纯文本和图片；其他消息段没有稳定的完整处理逻辑。

2. **分隔符冲突**
   `|` 既是语法分隔符，又是正文的普通字符。正文中的竖线会破坏解析。

3. **图片归属不稳定**
   图片是按消息组件出现顺序附加到“当前段落”的，不是根据视觉位置或复杂消息语法解析的。

4. **昵称不是本地权威数据**
   昵称来自第三方接口，可能与真实群名片不一致。

5. **协议兼容性有限**
   主要依赖 AstrBot `aiocqhttp`/OneBot 的合并转发能力，不能假定所有平台都支持。

6. **解析规则比较脆弱**
   要求每段以“数字 QQ 号 + 空格 + 正文”开头；不符合格式的段落直接跳过。

### 安全和运维风险

1. **没有权限控制**
   插件监听所有消息，任何能给机器人发消息的人，只要满足文本格式，就可能触发生成伪造节点。

2. **第三方隐私泄露**
   所有查询昵称的 QQ 号都会发送给 `api.mmp.cc`。

3. **请求超时和稳定性**
   昵称查询没有显式超时、重试或并发上限；节点很多时可能拖慢响应。

4. **日志泄露**
   调试日志会输出第三方接口返回值和图片 URL，可能包含不必要的隐私信息。

5. **滥用风险**
   该能力可能被用于伪造聊天截图、冒充他人、传播虚假信息或骚扰。应仅在明确授权的测试环境、演示环境或自己的群内使用。

6. **许可证信息不一致**
   README 写的是 MIT，但仓库 `LICENSE` 文件内容是 GNU AGPL v3，GitHub 也识别为 AGPL-3.0。二次分发或修改前应先向作者确认许可证。

## 八、改进方向

如果要把它改造成更安全、可维护的版本，建议：

1. 加入管理员/群组/调用者白名单，默认只允许授权用户使用；
2. 将昵称查询改为可选，并支持本地缓存；
3. 使用 HTTPS、超时、重试、并发限制和响应大小限制；
4. 限制最大节点数量、最大正文长度和图片数量；
5. 明确支持的消息组件类型，其他组件直接拒绝并给出提示；
6. 给伪造消息加明显水印，例如在末尾添加“演示生成”；
7. 记录调用者、群号、节点 QQ 号和生成时间，便于审计；
8. 统一 README、`metadata.yaml` 和源码中的版本与许可证信息。

## 九、参考源码

### 插件仓库

- 仓库：[advent259141/astrbot_plugin_SessionFaker](https://github.com/advent259141/astrbot_plugin_SessionFaker)
- 分析提交：`9540a997e7d3f37c035344663f34eccab7e06025`
- [main.py](https://github.com/advent259141/astrbot_plugin_SessionFaker/blob/9540a997e7d3f37c035344663f34eccab7e06025/main.py)
  - 监听与命令解析：第 96-156 行
  - 昵称查询：第 15-34 行
  - 文本/图片解析：第 36-94 行
  - Node/Nodes 构造：第 121-154 行
- [README.md](https://github.com/advent259141/astrbot_plugin_SessionFaker/blob/9540a997e7d3f37c035344663f34eccab7e06025/README.md)
- [metadata.yaml](https://github.com/advent259141/astrbot_plugin_SessionFaker/blob/9540a997e7d3f37c035344663f34eccab7e06025/metadata.yaml)

### AstrBot 参考实现

以下内容用于解释 `Node`/`Nodes` 如何转换为 OneBot 合并转发格式。分析时参考 AstrBot `master` 提交：

`9248baf902f026f6ffa770a222e70a16fa982ed3`

- [astrbot/core/message/components.py](https://github.com/AstrBotDevs/AstrBot/blob/9248baf902f026f6ffa770a222e70a16fa982ed3/astrbot/core/message/components.py)
  - `Node` 定义与节点字典转换：第 655-705 行
  - `Nodes` 定义与批量转换：第 709-733 行
  - `Image.fromURL`：第 501-516 行
- [aiocqhttp_message_event.py](https://github.com/AstrBotDevs/AstrBot/blob/9248baf902f026f6ffa770a222e70a16fa982ed3/astrbot/core/platform/sources/aiocqhttp/aiocqhttp_message_event.py)
  - OneBot 消息转换：第 70-88 行
  - 合并转发发送分支：第 145-173 行

## 十、最终判断

SessionFaker 的“伪造”本质上是利用 QQ 合并转发消息节点中可填写的 `user_id` 与 `nickname` 展示字段，构造一条由机器人发送的富消息。它不接管其他 QQ 账号，也不篡改 QQ 服务器上的原始聊天记录。看到的用户身份是合并转发卡片的展示元数据，可信度应低于 QQ 官方原始消息记录。
