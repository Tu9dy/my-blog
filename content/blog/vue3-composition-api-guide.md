---
title: "Vue 3 Composition API 进阶指南"
description: "深入理解 Vue 3 Composition API 的高级用法，包括自定义 composables、响应式原理和性能优化技巧。"
date: "2026-07-06"
tags: ["Vue", "TypeScript", "前端"]
---

# Vue 3 Composition API 进阶指南

Vue 3 的 Composition API 不仅仅是 Options API 的另一种写法，它提供了一种全新的组织组件逻辑的方式。本文将深入探讨一些进阶用法。

## 自定义 Composables 的艺术

Composables 是 Composition API 最强大的特性之一。好的 composable 应该是**可复用的、可测试的、职责单一的**。

### 一个实用的 useLocalStorage

```typescript
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key)
  const initial = stored ? JSON.parse(stored) : defaultValue
  const data = ref(initial) as Ref<T>

  watch(data, (value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, { deep: true })

  return data
}
```

使用方式：

```vue
<script setup lang="ts">
const theme = useLocalStorage('theme', 'dark')
const fontSize = useLocalStorage('fontSize', 14)
</script>
```

### useFetch 封装

```typescript
import { ref, shallowRef } from 'vue'

interface UseFetchOptions {
  immediate?: boolean
}

export function useFetch<T>(url: string, options: UseFetchOptions = {}) {
  const { immediate = true } = options
  const data = shallowRef<T | null>(null) as Ref<T | null>
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function execute() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      data.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      loading.value = false
    }
  }

  if (immediate) execute()

  return { data, error, loading, execute }
}
```

## 响应式原理深入

### ref vs reactive 的选择

```typescript
// ref: 适合基本类型和需要整体替换的对象
const count = ref(0)
const user = ref({ name: 'Alice', age: 25 })
user.value = { name: 'Bob', age: 30 } // 整体替换 ✓

// reactive: 适合需要深层修改的对象
const form = reactive({
  username: '',
  email: '',
  errors: {} as Record<string, string>,
})
form.username = 'alice' // 直接修改 ✓
// form = { username: 'bob' } // 不能替换 ✗
```

### computed 的缓存机制

```typescript
const items = ref<number[]>([1, 2, 3, 4, 5])

// 只有 items 变化时才重新计算
const sum = computed(() => items.value.reduce((a, b) => a + b, 0))
const average = computed(() => sum.value / items.value.length)

// 链式 computed 也能正确缓存
const summary = computed(() => `共 ${items.value.length} 项，平均值为 ${average.value}`)
```

## 性能优化技巧

### 1. 使用 shallowRef 避免深层响应

```typescript
// 对于大型对象（如表格数据），使用 shallowRef
const tableData = shallowRef<Record[]>([])

// 更新时需要替换整个引用
tableData.value = [...tableData.value, newRecord]
```

### 2. v-memo 指令

```vue
<template>
  <div v-for="item in items" :key="item.id">
    <div v-memo="[item.selected, item.name]">
      <!-- 只有 selected 或 name 变化时才重新渲染 -->
      <span>{{ item.name }}</span>
      <Badge v-if="item.selected" />
    </div>
  </div>
</template>
```

### 3. 异步组件与 Suspense

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncDashboard />
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
const AsyncDashboard = defineAsyncComponent(() =>
  import('./components/Dashboard.vue')
)
</script>
```

## 总结

Composition API 的核心价值在于**逻辑复用**和**关注点分离**。通过合理使用 composables，我们可以将复杂的组件逻辑拆分为可管理的小块，同时保持类型安全。

关键要点：

- 好的 composable 职责单一，易于测试
- 根据场景选择 ref 或 reactive
- 大对象使用 shallowRef 提升性能
- 善用 computed 的缓存特性
