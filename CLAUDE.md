# Obsidian 知识库操作规范

## 搜索策略

### Grep 三原则
1. **定位用 `files_with_matches`，不用 `content`**
   - 正确：先 `Grep pattern="关键词" output_mode="files_with_matches"` 找到哪些文件相关
   - 错误：直接 `output_mode="content"` 把匹配行全量灌入上下文
2. **必须用 `content` 时加 `head_limit`**
   - `Grep pattern="..." output_mode="content" head_limit=20`
3. **只在文件移动/重命名后做全量链接校验，内容补充类改动不做**

### Read 原则
- **始终带 `offset` + `limit`**，只读需要确认的那几行
- 补充现有笔记时：读 TOC（前 30 行）+ 插入点前后 5 行，不读全篇
- 不为了"对比确认"先把整篇读完再动手——Read 的每一行都算 token

## 写作策略

- 多文件并行写作用一个消息里的多个 Write/Edit 调用
- 新建笔记时内容一次性写完，不反复 Edit 同一个文件
- Edit 的 `old_string` 尽量短且唯一，避免因匹配不唯一重试

## 禁止事项

- 禁止全局 `Grep output_mode="content"` 不做 `head_limit`
- 禁止 Read 不加 offset/limit 读长文件
- 禁止在内容补充后做全库链接验证
