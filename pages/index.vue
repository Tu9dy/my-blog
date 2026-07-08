<template>
  <div class="container-blog py-16 sm:py-24">
    <!-- Hero Section -->
    <section class="mb-20">
      <div class="max-w-2xl">
        <!-- Status Badge -->
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 opacity-0 animate-fade-up"
          :style="{
            backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
            border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)',
          }"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
          <span class="text-xs font-mono tracking-wide" :style="{ color: 'var(--accent)' }">
            Currently building something cool...
          </span>
        </div>

        <!-- Main Heading -->
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-6 opacity-0 animate-fade-up stagger-1"
          :style="{ color: 'var(--text)' }"
        >
          Hi, I'm
          <span class="text-gradient">Developer</span>
          <span
            class="inline-block w-[3px] h-[0.85em] ml-0.5 align-middle rounded-full animate-pulse-soft"
            :style="{ backgroundColor: 'var(--accent)' }"
          />
        </h1>

        <!-- Subtitle -->
        <p
          class="text-base sm:text-lg leading-relaxed max-w-lg mb-8 opacity-0 animate-fade-up stagger-2"
          :style="{ color: 'var(--text-muted)' }"
        >
          欢迎来到我的技术博客。这里记录我在前端开发、系统设计和日常编码中的思考与实践。
        </p>

        <!-- Divider -->
        <div class="divider opacity-0 animate-fade-up stagger-3" />
      </div>
    </section>

    <!-- Tag Filter -->
    <section v-if="allTags.length" class="mb-12 opacity-0 animate-fade-up stagger-4">
      <div class="flex items-center gap-2 flex-wrap">
        <button
          class="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-300"
          :class="{ 'glow-accent': !selectedTag }"
          :style="!selectedTag
            ? { color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)' }
            : { color: 'var(--text-subtle)', border: '1px solid var(--border)' }"
          @click="selectedTag = ''"
        >
          All
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          class="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-300"
          :class="{ 'glow-accent': selectedTag === tag }"
          :style="selectedTag === tag
            ? { color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)' }
            : { color: 'var(--text-subtle)', border: '1px solid var(--border)' }"
          @click="selectedTag = selectedTag === tag ? '' : tag"
        >
          #{{ tag }}
        </button>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="opacity-0 animate-fade-up stagger-5">
      <!-- Section Header -->
      <div class="flex items-center gap-4 mb-8">
        <h2 class="text-xs font-mono font-semibold uppercase tracking-[0.15em]" :style="{ color: 'var(--text-subtle)' }">
          {{ selectedTag ? `#${selectedTag}` : 'Latest Posts' }}
        </h2>
        <div class="flex-1 h-px" :style="{ backgroundColor: 'var(--border)' }" />
        <span class="text-xs font-mono" :style="{ color: 'var(--text-subtle)' }">{{ filteredPosts.length }}</span>
      </div>

      <!-- Post List -->
      <div>
        <BlogCard
          v-for="(post, index) in filteredPosts"
          :key="post.slug"
          :post="post"
          :class="`stagger-${Math.min(index + 1, 8)}`"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!filteredPosts.length" class="text-center py-24">
        <p class="text-sm font-mono" :style="{ color: 'var(--text-subtle)' }">No posts found.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const selectedTag = ref('')

const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog')
    .select('slug', 'title', 'description', 'date', 'tags')
    .order('date', 'DESC')
    .all()
)

const allTags = computed(() => {
  if (!posts.value) return []
  const tagSet = new Set<string>()
  posts.value.forEach((post: any) => {
    post.tags?.forEach((tag: string) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
})

const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (!selectedTag.value) return posts.value
  return posts.value.filter((post: any) =>
    post.tags?.includes(selectedTag.value)
  )
})

// Calculate reading time
const postsWithTime = computed(() => {
  if (!posts.value) return []
  return posts.value.map((post: any) => ({
    ...post,
    readingTime: post.description ? Math.max(1, Math.ceil(post.description.length / 200)) : 3,
  }))
})
</script>
