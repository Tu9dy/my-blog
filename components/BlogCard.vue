<template>
  <article class="group">
    <NuxtLink
      :to="`/blog/${post.slug}`"
      class="block py-6 transition-all duration-300"
      :style="{ borderBottom: '1px solid var(--border)' }"
    >
      <div class="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8">
        <!-- Date Column -->
        <div class="sm:w-28 shrink-0">
          <time class="text-xs font-mono tracking-wide" :style="{ color: 'var(--text-subtle)' }">
            {{ formatDate(post.date) }}
          </time>
        </div>

        <!-- Content Column -->
        <div class="flex-1 min-w-0">
          <!-- Title -->
          <h2
            class="text-lg font-display font-semibold leading-snug mb-1.5 transition-colors duration-300"
            :style="{ color: 'var(--text)' }"
          >
            <span class="group-hover:text-gradient transition-all duration-300">
              {{ post.title }}
            </span>
            <span
              class="inline-block ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              :style="{ color: 'var(--accent)' }"
            >&rarr;</span>
          </h2>

          <!-- Description -->
          <p class="text-sm leading-relaxed line-clamp-2 mb-3" :style="{ color: 'var(--text-muted)' }">
            {{ post.description }}
          </p>

          <!-- Tags -->
          <div v-if="post.tags?.length" class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide"
              :style="{
                color: 'var(--accent)',
                backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)',
              }"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Reading Time -->
        <div v-if="post.readingTime" class="hidden sm:block shrink-0">
          <span class="text-xs font-mono" :style="{ color: 'var(--text-subtle)' }">
            {{ post.readingTime }} min
          </span>
        </div>
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
