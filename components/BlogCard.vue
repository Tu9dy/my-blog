<template>
  <article class="group">
    <NuxtLink :to="`/blog/${post.slug}`" class="block p-5 -mx-5 rounded-xl hover:bg-gray-800/40 transition-all duration-200">
      <!-- Date -->
      <div class="flex items-center gap-3 mb-3">
        <time class="text-sm text-gray-500 font-mono">{{ formatDate(post.date) }}</time>
        <span v-if="post.readingTime" class="text-sm text-gray-600">&middot; {{ post.readingTime }} min</span>
      </div>

      <!-- Title -->
      <h2 class="text-xl font-semibold text-gray-100 group-hover:text-brand-400 transition-colors mb-2">
        {{ post.title }}
      </h2>

      <!-- Description -->
      <p class="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
        {{ post.description }}
      </p>

      <!-- Tags -->
      <div v-if="post.tags?.length" class="flex flex-wrap gap-2">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-gray-800 text-gray-400 border border-gray-700/50"
        >
          {{ tag }}
        </span>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  post: {
    slug: string
    title: string
    description: string
    date: string
    readingTime?: number
    tags?: string[]
  }
}>()

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
</script>
