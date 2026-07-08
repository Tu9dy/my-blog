---
title: "TypeScript 类型体操实战"
description: "通过实际项目中的案例，学习 TypeScript 高级类型编程技巧，包括条件类型、映射类型和模板字面量类型。"
date: "2026-07-03"
tags: ["TypeScript", "前端", "教程"]
---

# TypeScript 类型体操实战

TypeScript 的类型系统远比大多数人使用的要强大。本文将通过实际项目中的案例，展示一些高级类型编程技巧。

## 条件类型

条件类型是类型体操的基础，它允许我们根据条件选择不同的类型：

```typescript
// 基础条件类型
type IsString<T> = T extends string ? true : false

type A = IsString<'hello'>  // true
type B = IsString<42>       // false

// 实际应用：API 响应类型
type ApiResponse<T> = {
  code: number
  message: string
  data: T extends Array<infer U> ? U[] : T
}
```

## 映射类型

映射类型可以基于已有类型创建新类型：

```typescript
// 将所有属性变为可选且只读
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K]
}

interface Config {
  database: {
    host: string
    port: number
  }
  cache: {
    ttl: number
  }
}

// 现在所有深层属性都是只读的了
type ReadonlyConfig = DeepReadonly<Config>
```

## 模板字面量类型

TypeScript 4.1 引入的模板字面量类型非常强大：

```typescript
// CSS 属性类型
type CSSProperty =
  | 'margin' | 'padding'
  | 'border'

type CSSDirection = 'top' | 'right' | 'bottom' | 'left'

type CSSPropertyWithDirection =
  | CSSProperty
  | `${CSSProperty}-${CSSDirection}`

// 结果: 'margin' | 'padding' | 'border' | 'margin-top' | 'margin-right' | ...
type Spacing = CSSPropertyWithDirection
```

### 实际应用：事件处理器

```typescript
// 类型安全的事件系统
type EventMap = {
  click: { x: number; y: number }
  focus: { target: HTMLElement }
  change: { value: string }
}

type EventHandler<K extends keyof EventMap> = (
  event: EventMap[K]
) => void

// 使用
const handleClick: EventHandler<'click'> = (e) => {
  console.log(e.x, e.y) // 类型安全 ✓
}
```

## 实战：类型安全的 API 客户端

让我们把这些技巧结合起来，构建一个类型安全的 API 客户端：

```typescript
// 定义 API 路由
interface ApiRoutes {
  '/users': {
    GET: { response: User[] }
    POST: { body: CreateUserDto; response: User }
  }
  '/users/:id': {
    GET: { response: User }
    PUT: { body: UpdateUserDto; response: User }
    DELETE: { response: void }
  }
}

// 类型安全的请求函数
async function apiRequest<
  Path extends keyof ApiRoutes,
  Method extends keyof ApiRoutes[Path]
>(
  path: Path,
  method: Method,
  ...args: ApiRoutes[Path][Method] extends { body: infer B }
    ? [body: B]
    : []
): Promise<ApiRoutes[Path][Method] extends { response: infer R } ? R : never> {
  const response = await fetch(path as string, {
    method: method as string,
    body: args[0] ? JSON.stringify(args[0]) : undefined,
  })
  return response.json()
}

// 使用 — 完全类型安全
const users = await apiRequest('/users', 'GET')
// users: User[]

await apiRequest('/users', 'POST', { name: 'Alice', email: 'alice@example.com' })
// 第二个参数自动推导为 CreateUserDto
```

## 实用工具类型

最后分享几个我在项目中常用的自定义工具类型：

```typescript
// 提取 Promise 的内部类型
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

// 提取数组元素类型
type ElementOf<T extends readonly unknown[]> = T[number]

// 排除 null 和 undefined
type NonNullable<T> = T extends null | undefined ? never : T

// 深度 Partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

// 精确的 Omit（保留联合类型分发）
type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
```

## 总结

类型体操不是炫技，而是为了让代码更安全、更具表达力。关键原则：

- 从简单开始，逐步增加复杂度
- 为复杂类型添加注释说明意图
- 使用 `type` 关键字创建类型别名提高可读性
- 善用 `infer` 关键字提取类型信息
- 在类型安全和开发效率之间找到平衡
