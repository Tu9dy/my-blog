<template>
  <article class="container-blog py-12">
    <!-- Back Link -->
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-400 transition-colors mb-8 font-mono"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back to posts
    </NuxtLink>

    <!-- Article Header -->
    <header class="mb-10">
      <div class="flex items-center gap-3 mb-4">
        <time class="text-sm text-gray-500 font-mono">{{ formatDate(post?.date) }}</time>
        <span class="text-gray-700">&middot;</span>
        <span class="text-sm text-gray-500 font-mono">{{ readingTime }} min read</span>
      </div>

      <h1 class="text-3xl sm:text-4xl font-bold text-gray-100 mb-4 leading-tight">
        {{ post?.title }}
      </h1>

      <p v-if="post?.description" class="text-lg text-gray-400 leading-relaxed mb-6">
        {{ post.description }}
      </p>

      <!-- Tags -->
      <div v-if="post?.tags?.length" class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="tag in post.tags"
          :key="tag"
          to="/"
          class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-gray-800 text-gray-400 border border-gray-700/50 hover:border-brand-500/30 hover:text-brand-400 transition-colors"
        >
          #{{ tag }}
        </NuxtLink>
      </div>

      <div class="mt-8 h-px bg-gradient-to-r from-brand-500/20 via-gray-800 to-transparent"></div>
    </header>

    <!-- Article Content -->
    <div class="prose prose-invert max-w-none">
      <ContentRenderer v-if="post" :value="post" />
    </div>

    <!-- Article Footer -->
    <footer class="mt-16 pt-8 border-t border-gray-800">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-400 transition-colors font-mono"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All posts
        </NuxtLink>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first()
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
  })
}

const readingTime = computed(() => {
  if (!post.value?.body) return 3
  const text = JSON.stringify(post.value.body)
  const wordCount = text.replace(/\s+/g, ' ').split(' ').length
  return Math.max(1, Math.ceil(wordCount / 300))
})

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

useHead({
  title: computed(() => post.value ? `${post.value.title} - Dev Blog` : 'Dev Blog'),
  meta: computed(() => [
    { name: 'description', content: post.value?.description || '' },
  ]),
})
</script>
