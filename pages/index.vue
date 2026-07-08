<template>
  <div class="container-blog py-12">
    <!-- Hero Section -->
    <section class="mb-16">
      <div class="max-w-2xl">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-100 mb-4 leading-tight">
          Hi, I'm <span class="text-brand-400">Developer</span>
          <span class="inline-block animate-bounce">_</span>
        </h1>
        <p class="text-lg text-gray-400 leading-relaxed mb-6">
          欢迎来到我的技术博客。这里记录我在前端开发、系统设计和日常编码中的思考与实践。
        </p>
        <div class="flex items-center gap-2 text-sm text-gray-500 font-mono">
          <span class="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Currently building something cool...
        </div>
      </div>
    </section>

    <!-- Tag Filter -->
    <section v-if="allTags.length" class="mb-10">
      <div class="flex items-center gap-2 flex-wrap">
        <button
          class="px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200"
          :class="!selectedTag
            ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
            : 'text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-700'"
          @click="selectedTag = ''"
        >
          All
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          class="px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200"
          :class="selectedTag === tag
            ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
            : 'text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-700'"
          @click="selectedTag = selectedTag === tag ? '' : tag"
        >
          #{{ tag }}
        </button>
      </div>
    </section>

    <!-- Blog Posts -->
    <section>
      <div class="flex items-center gap-3 mb-8">
        <h2 class="text-sm font-mono font-semibold text-gray-500 uppercase tracking-wider">
          {{ selectedTag ? `#${selectedTag}` : 'Latest Posts' }}
        </h2>
        <div class="flex-1 h-px bg-gray-800"></div>
        <span class="text-sm font-mono text-gray-600">{{ filteredPosts.length }}</span>
      </div>

      <div class="space-y-2">
        <BlogCard
          v-for="post in filteredPosts"
          :key="post.slug"
          :post="post"
        />
      </div>

      <div v-if="!filteredPosts.length" class="text-center py-20">
        <p class="text-gray-500 font-mono">No posts found.</p>
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
