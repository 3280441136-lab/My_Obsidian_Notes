---
version: V1.0
updated: 2026-05-04
author: RUI
---

# C 语言链表入门笔记

> 适合对象：会写一点 C 语言，但刚开始接触 <span style="color:#1565c0;"><b>结构体、指针、malloc、链表</b></span> 的同学。  
> 学习目标：看懂 `list_node`、`list_t`、`list_init()`、`list_push_back()`、`list_pop_back()`，并理解为什么链表在 FreeRTOS 同步互斥里常被拿来当"共享资源"讲。

---

## 目录

- [先给结论](C语言链表入门.md#先给结论)
- [为什么要学链表](C语言链表入门.md#为什么要学链表)
- [节点结构体 list_node](C语言链表入门.md#节点结构体-list_node)
- [为什么结构体里写 struct list_node*](C语言链表入门.md#为什么结构体里写-struct-list_node)
- [typedef 是什么](C语言链表入门.md#typedef-是什么)
- [链表管理结构体 list_t](C语言链表入门.md#链表管理结构体-list_t)
- [空链表是什么状态](C语言链表入门.md#空链表是什么状态)
- [list_init() 初始化链表](C语言链表入门.md#list_init-初始化链表)
- [malloc 是什么](C语言链表入门.md#malloc-是什么)
- [为什么第一个节点这样创建](C语言链表入门.md#为什么第一个节点这样创建)
- [为什么不能用局部变量当节点](C语言链表入门.md#为什么不能用局部变量当节点)
- [list_push_back() 尾插](C语言链表入门.md#list_push_back-尾插)
- [list_pop_back() 尾删](C语言链表入门.md#list_pop_back-尾删)
- [链表和 FreeRTOS 同步互斥的关系](C语言链表入门.md#链表和-freertos-同步互斥的关系)
- [互斥锁保护链表](C语言链表入门.md#互斥锁保护链表)
- [同步信号量通知有数据](C语言链表入门.md#同步信号量通知有数据)
- [工程上要注意的坑](C语言链表入门.md#工程上要注意的坑)
- [小白记忆口诀](C语言链表入门.md#小白记忆口诀)

---

## 先给结论

<span style="color:#d32f2f;"><b>链表就是一串靠指针串起来的节点。</b></span>

数组像一排连续座位：

```text
arr[0] arr[1] arr[2] arr[3]
```

链表像一串火车车厢：

```text
[10] <-> [20] <-> [30]
```

每个节点不只存数据，还要存：

```text
前一个节点在哪里
后一个节点在哪里
```

所以链表节点一般长这样：

```c
typedef struct list_node
{
    int data;
    struct list_node *next;
    struct list_node *pre;
} list_node;
```

---

## 为什么要学链表

链表的核心意义：

```text
数据数量不固定时，可以运行过程中动态增加/删除节点
```

数组的问题：

```c
int arr[10];
```

这个数组最多只能放 10 个 `int`。如果运行时要放第 11 个，就不够了。

链表的思路：

```text
需要一个，就 malloc 一个节点
不用一个，就 free 一个节点
```

适合场景：

| 场景 | 链表是否适合 |
|---|---|
| 数据数量变化频繁 | 适合 |
| 经常从头/尾插入删除 | 适合 |
| 要用下标快速访问第 N 个元素 | 不太适合 |
| 嵌入式内存很紧张、实时性很高 | 要谨慎 |

---

## 节点结构体 list_node

代码：

```c
typedef struct list_node
{
    int data;
    struct list_node *next;
    struct list_node *pre;
} list_node;
```

### 每一行是什么意思

```c
int data;
```

表示：

```text
这个节点真正存的数据
```

例如节点里存 `10`、`20`、`30`。

```c
struct list_node *next;
```

表示：

```text
指向后一个节点
```

```c
struct list_node *pre;
```

表示：

```text
指向前一个节点
```

图：

```text
一个节点 list_node
┌────────────────┐
│ data = 20       │
│ pre  ──────────┼──> 前一个节点
│ next ──────────┼──> 后一个节点
└────────────────┘
```

---

## 为什么结构体里写 struct list_node*

你可能会疑惑：

```c
struct list_node *next;
```

为什么不是：

```c
list_node *next;
```

原因是：

<span style="color:#d32f2f;"><b>在结构体内部，typedef 的别名 list_node 还没有定义完成。</b></span>

这段代码：

```c
typedef struct list_node
{
    int data;
    struct list_node *next;
    struct list_node *pre;
} list_node;
```

编译器理解过程：

```text
1. 先看到 struct list_node，这是结构体的正式名字
2. 进入结构体内部，此时 list_node 这个别名还没生成
3. 所以内部要用 struct list_node*
4. 到最后 } list_node; 才完成别名
```

完成后，后面就可以写：

```c
list_node *p;
```

不用每次写：

```c
struct list_node *p;
```

---

## typedef 是什么

`typedef` 的作用是：

```text
给类型起一个别名
```

没有 `typedef`：

```c
struct list_node node;
struct list_node *p;
```

有 `typedef`：

```c
list_node node;
list_node *p;
```

<span style="color:#1565c0;"><b>注意：typedef 不会创建变量，它只是给类型起名字。</b></span>

---

## 链表管理结构体 list_t

截图里的链表管理结构体大概是：

```c
typedef struct
{
    list_node *head;
    list_node *tail;
    int num;
} list_t;
```

它不是节点，而是"链表总管"。

| 成员 | 作用 |
|---|---|
| `head` | 指向第一个节点 |
| `tail` | 指向最后一个节点 |
| `num` | 记录节点数量 |

图：

```text
list_t
┌──────────────┐
│ head ────────┼──> [10] <-> [20] <-> [30]
│ tail ────────┼───────────────────────↑
│ num = 3       │
└──────────────┘
```

为什么要有 `head`？

```text
方便从头开始遍历整个链表
```

为什么要有 `tail`？

```text
方便从尾部快速添加/删除节点
```

为什么要有 `num`？

```text
方便知道当前有多少个节点，不用每次从头数
```

---

## 空链表是什么状态

空链表应该是：

```c
head = NULL;
tail = NULL;
num = 0;
```

图：

```text
list_t
┌──────────────┐
│ head = NULL   │
│ tail = NULL   │
│ num  = 0      │
└──────────────┘
```

`NULL` 的意思是：

```text
这个指针不指向任何有效对象
```

---

## list_init() 初始化链表

代码：

```c
void list_init(list_t *t)
{
    memset(t, 0, sizeof(list_t));
}
```

### 这是干什么的

人话：

```text
把 list_t 结构体里的所有字节清零
```

清零后相当于：

```c
t->head = NULL;
t->tail = NULL;
t->num = 0;
```

### 参数 list_t *t 是什么

```c
list_t *t
```

表示：

```text
t 是一个指针，指向一个 list_t 链表管理结构体
```

为什么传指针？

```text
因为函数要修改外面的链表本体，而不是修改一个临时副本
```

### -> 是什么

如果 `t` 是结构体指针：

```c
t->head
```

等价于：

```c
(*t).head
```

人话：

```text
先通过指针找到结构体，再访问里面的 head 成员
```

---

## malloc 是什么

代码：

```c
t->head = (list_node *)malloc(sizeof(list_node));
```

### malloc 的作用

`malloc` 是 C 标准库函数，全称可以理解为：

```text
memory allocation，动态内存分配
```

它的作用：

```text
从堆 heap 里申请一块指定大小的内存
```

函数原型大概是：

```c
void *malloc(size_t size);
```

参数：

```text
size：要申请多少字节
```

返回值：

```text
成功：返回申请到的内存地址
失败：返回 NULL
```

---

### sizeof(list_node) 是什么

```c
sizeof(list_node)
```

表示：

```text
一个 list_node 节点需要多少字节
```

节点里有：

```c
int data;
struct list_node *next;
struct list_node *pre;
```

在 ESP32 这类 32 位平台上可以粗略理解：

```text
int：4 字节
指针 next：4 字节
指针 pre：4 字节
```

总共大约 12 字节，实际还可能因为内存对齐变成 12 或 16 字节。

---

### 为什么要强转成 list_node*

```c
(list_node *)malloc(sizeof(list_node))
```

`malloc()` 返回的是：

```c
void *
```

表示：

```text
一块还没有具体类型的内存地址
```

强转成：

```c
list_node *
```

表示：

```text
我打算把这块内存当成 list_node 节点来用
```

补充：在标准 C 里，`malloc` 的返回值可以不强转；但很多教学代码会写强转，方便小白看出类型。

---

## 为什么第一个节点这样创建

代码：

```c
t->head = (list_node *)malloc(sizeof(list_node));
t->tail = t->head;
t->head->data = data;
t->head->next = NULL;
t->head->pre = NULL;
t->num++;
```

逐行解释：

```c
t->head = (list_node *)malloc(sizeof(list_node));
```

从堆里申请一个节点，让 `head` 指向它。

```c
t->tail = t->head;
```

因为这是第一个节点，它既是头，也是尾。

```c
t->head->data = data;
```

把传进来的数据存进去。

```c
t->head->next = NULL;
t->head->pre = NULL;
```

因为只有一个节点，所以：

```text
它前面没有节点
它后面也没有节点
```

```c
t->num++;
```

节点数量加 1。

图：

```text
list_t
┌──────────────┐
│ head ────────┼──┐
│ tail ────────┼──┘
│ num = 1       │
└──────────────┘
                 ↓
           ┌──────────┐
           │ data     │
           │ pre=NULL │
           │ next=NULL│
           └──────────┘
```

---

## 为什么不能用局部变量当节点

错误写法：

```c
void list_push_back(list_t *t, int data)
{
    list_node node;
    node.data = data;
    t->head = &node;
}
```

问题：

```text
node 是局部变量，在栈上
函数返回后，这块栈空间就失效了
t->head 还指向它，就变成野指针
```

所以动态链表节点要放在堆上：

```c
list_node *node = malloc(sizeof(list_node));
```

对比：

| 创建方式 | 内存位置 | 函数结束后是否还有效 | 适合链表节点吗 |
|---|---|---|---|
| `list_node node;` | 栈 | 失效 | 不适合 |
| `static list_node node;` | 静态区 | 有效 | 数量固定，不灵活 |
| `malloc(sizeof(list_node))` | 堆 | 有效，直到 `free` | 适合 |

---

## list_push_back() 尾插

完整逻辑：

```c
void list_push_back(list_t *t, int data)
{
    if (t->head == NULL)
    {
        // 空链表：创建第一个节点
    }
    else
    {
        // 非空链表：接到尾部
    }
}
```

### 空链表插入

插入前：

```text
head = NULL
tail = NULL
num  = 0
```

插入后：

```text
head/tail
    ↓
  [data]
```

### 非空链表插入

原来：

```text
head           tail
 ↓              ↓
[10] <-------> [20]
```

执行：

```c
list_push_back(&list, 30);
```

变成：

```text
head                  tail
 ↓                     ↓
[10] <-------> [20] <-> [30]
```

对应代码：

```c
t->tail->next = (list_node *)malloc(sizeof(list_node));
t->tail->next->pre = t->tail;
t->tail = t->tail->next;
t->tail->data = data;
t->tail->next = NULL;
t->num++;
```

人话步骤：

```text
1. 在旧 tail 后面申请一个新节点
2. 新节点的 pre 指向旧 tail
3. tail 移动到新节点
4. 给新节点填数据
5. 新节点后面没有节点，所以 next = NULL
6. num++
```

---

## list_pop_back() 尾删

当前 `list.c` 中的实现逻辑：

```c
void list_pop_back(list_t *t)
{
    if (t->tail == NULL)
    {
        return;
    }

    list_node *node_old_tail = t->tail;
    t->tail = t->tail->pre;

    if (t->tail)
    {
        t->tail->next = NULL;
    }
    else
    {
        t->head = NULL;
    }

    free(node_old_tail);
    t->num--;
}
```

### 空链表

```c
if (t->tail == NULL)
{
    return;
}
```

意思：

```text
链表是空的，没东西可删，直接返回
```

### 保存旧尾节点

```c
list_node *node_old_tail = t->tail;
```

为什么要保存？

```text
因为后面 tail 要往前移动
旧 tail 还需要 free 掉
```

### tail 往前移动

```c
t->tail = t->tail->pre;
```

原来：

```text
[10] <-> [20] <-> [30]
                 ↑
                tail
```

移动后：

```text
[10] <-> [20] <-> [30]
          ↑       ↑
        tail    old_tail
```

### 断开新 tail 的 next

```c
if (t->tail)
{
    t->tail->next = NULL;
}
```

变成：

```text
[10] <-> [20]    [30]
          ↑
        tail
```

### 如果删的是最后一个节点

如果原来只有一个节点：

```text
head/tail
   ↓
 [10]
```

执行：

```c
t->tail = t->tail->pre;
```

由于第一个节点的 `pre` 是 `NULL`，所以：

```text
t->tail = NULL
```

这时要：

```c
t->head = NULL;
```

链表恢复为空：

```text
head = NULL
tail = NULL
num = 0
```

### free 是什么

```c
free(node_old_tail);
```

意思：

```text
把 malloc 申请来的节点还给堆
```

<span style="color:#d32f2f;"><b>malloc 和 free 要成对出现。</b></span>

```text
malloc：借内存
free：还内存
```

如果只 `malloc` 不 `free`：

```text
内存泄漏，系统可用堆越来越少
```

---

## 链表和 FreeRTOS 同步互斥的关系

老师讲同步互斥前写链表，是为了构造一个：

```text
共享资源
```

例如：

```text
task1：往链表里 push 数据
task2：从链表里 pop 数据
```

链表修改不是一步完成的，而是一串步骤：

```text
malloc 节点
修改 next
修改 pre
移动 tail
修改 num
free 节点
```

如果 task1 改到一半，task2 插进来删节点，链表可能会乱。

这就需要：

```text
互斥 mutex：同一时刻只允许一个任务操作链表
同步 semaphore：没有数据时消费者等待，有数据时生产者通知
```

---

## 互斥锁保护链表

伪代码：

```c
xSemaphoreTake(list_mutex, portMAX_DELAY);
list_push_back(&list, data);
xSemaphoreGive(list_mutex);
```

人话：

```text
先上锁
操作链表
再解锁
```

消费者：

```c
xSemaphoreTake(list_mutex, portMAX_DELAY);
list_pop_back(&list);
xSemaphoreGive(list_mutex);
```

记住：

<span style="color:#1565c0;"><b>mutex 管安全，保证链表不会被两个任务同时改。</b></span>

---

## 同步信号量通知有数据

生产者：

```c
list_push_back(&list, data);
xSemaphoreGive(data_sem);
```

消费者：

```c
xSemaphoreTake(data_sem, portMAX_DELAY);
list_pop_back(&list);
```

人话：

```text
生产者放入数据后通知一下
消费者没收到通知就先等着
```

完整思想：

```text
生产者：
    加锁
    push 数据
    解锁
    通知有数据

消费者：
    等有数据通知
    加锁
    pop 数据
    解锁
```

---

## 工程上要注意的坑

| 坑 | 后果 | 建议 |
|---|---|---|
| `malloc` 后不判断 NULL | 内存不足时崩溃 | 申请后立刻检查 |
| 只 `malloc` 不 `free` | 内存泄漏 | 删除节点时必须 free |
| 多任务同时改链表不加锁 | 链表结构损坏 | 用 mutex |
| 删除节点后还访问它 | 野指针 | free 后不要再用旧指针 |
| `num--` 时链表本来为空 | 数量变负 | 空链表先 return |
| 指针没初始化 | 随机崩溃 | `list_init()` 清零 |

更严谨的节点申请写法：

```c
list_node *node = malloc(sizeof(list_node));
if (node == NULL) {
    return;
}

node->data = data;
node->next = NULL;
node->pre = NULL;
```

---

## 小白记忆口诀

```text
结构体定义节点长什么样。
malloc 才是真的申请一个节点。
head 找第一个，tail 找最后一个。
next 指后面，pre 指前面。
malloc 借内存，free 还内存。
链表多任务共享，一定要考虑互斥。
有数据才让消费者取，这叫同步。
```

---

## 相关笔记

- [[../../02.嵌入式系统/实时操作系统/FreeRTOS同步与互斥]]
