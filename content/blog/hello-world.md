---
title: "Hello World - 我的第一篇博客"
description: "这是我的个人博客的第一篇文章，介绍我为什么要搭建这个博客，以及我对技术写作的思考。"
date: "2026-07-08"
tags: ["随笔", "博客"]
---

# Hello World

欢迎来到我的技术博客！这是我的第一篇文章，我想在这里聊聊为什么要搭建这个博客，以及我对技术写作的一些想法。

## 为什么要写博客

在多年的开发工作中，我逐渐意识到**输出**和**输入**同样重要。阅读源码、学习新技术固然关键，但把学到的东西用自己的语言写出来，才能真正检验理解的程度。

写博客对我来说有几个明确的目标：

1. **整理思路** — 写作是思考的镜子，写不清楚往往意味着想不清楚
2. **记录成长** — 回头看自己一年前的代码和文章，总能发现新的改进空间
3. **分享价值** — 如果我的经验能帮到某个正在踩同样坑的开发者，那就太好了

## 技术选型

这个博客使用以下技术栈搭建：

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <ContentRenderer :value="post" />
  </div>
</template>

<script setup lang="ts">
const { data: post } = await useAsyncData('post', () =>
  queryCollection('blog').path('/blog/hello-world').first()
)
</script>
```

核心技术包括：

- **Nuxt 3** — Vue 生态的全栈框架，SSR/SSG 开箱即用
- **@nuxt/content** — 基于 Markdown 的内容管理，无需数据库
- **Tailwind CSS** — 原子化 CSS 框架，快速构建一致的 UI
- **Vercel** — 零配置部署，自动 CI/CD

## 代码高亮示例

既然是一个开发者博客，代码高亮当然必不可少：

```typescript
// 一个简单的 debounce 函数
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
```

```css
/* 一些常用的 Tailwind 自定义样式 */
.container-blog {
  @apply max-w-4xl mx-auto px-4 sm:px-6;
}

.prose pre {
  @apply rounded-xl border border-gray-700 bg-gray-900/50;
}
```

## 未来计划

接下来我打算写一些关于这些主题的文章：

- Vue 3 Composition API 的进阶用法
- TypeScript 类型体操实战
- 前端性能优化案例分析
- 系统设计与架构思考

感谢你的阅读，希望这里的内容对你有所帮助。我们下篇文章见！
