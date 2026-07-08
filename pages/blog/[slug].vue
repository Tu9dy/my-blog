<template>
  <article class="container-blog py-16 sm:py-24">
    <!-- Back Link -->
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wide transition-all duration-300 mb-10 opacity-0 animate-fade-up"
      :style="{ color: 'var(--text-subtle)' }"
      @mouseenter="$event.target.style.color = 'var(--accent)'"
      @mouseleave="$event.target.style.color = 'var(--text-subtle)'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back to posts
    </NuxtLink>

    <!-- Article Header -->
    <header class="mb-12 opacity-0 animate-fade-up stagger-1">
      <!-- Meta -->
      <div class="flex items-center gap-3 mb-5">
        <time class="text-xs font-mono tracking-wide" :style="{ color: 'var(--text-subtle)' }">
          {{ formatDate(post?.date) }}
        </time>
        <span :style="{ color: 'var(--border)' }">&middot;</span>
        <span class="text-xs font-mono tracking-wide" :style="{ color: 'var(--text-subtle)' }">
          {{ readingTime }} min read
        </span>
      </div>

      <!-- Title -->
      <h1
        class="text-3xl sm:text-4xl font-display font-bold tracking-tight leading-[1.15] mb-5"
        :style="{ color: 'var(--text)' }"
      >
        {{ post?.title }}
      </h1>

      <!-- Description -->
      <p v-if="post?.description" class="text-base leading-relaxed max-w-xl mb-6" :style="{ color: 'var(--text-muted)' }">
        {{ post.description }}
      </p>

      <!-- Tags -->
      <div v-if="post?.tags?.length" class="flex flex-wrap gap-1.5 mb-8">
        <NuxtLink
          v-for="tag in post.tags"
          :key="tag"
          to="/"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide transition-all duration-300"
          :style="{
            color: 'var(--accent)',
            backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
            border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)',
          }"
        >
          #{{ tag }}
        </NuxtLink>
      </div>

      <!-- Divider -->
      <div class="divider" />
    </header>

    <!-- Article Content -->
    <div class="prose prose-invert max-w-none opacity-0 animate-fade-up stagger-2">
      <ContentRenderer v-if="post" :value="post" />
    </div>

    <!-- Article Footer -->
    <footer class="mt-16 pt-8 opacity-0 animate-fade-up stagger-3">
      <div class="divider mb-8" />
      <div class="flex items-center justify-between">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wide transition-all duration-300"
          :style="{ color: 'var(--text-subtle)' }"
          @mouseenter="$event.target.style.color = 'var(--accent)'"
          @mouseleave="$event.target.style.color = 'var(--text-subtle)'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
  title: computed(() => post.value ? `${post.value.title} - Studio` : 'Studio'),
  meta: computed(() => [
    { name: 'description', content: post.value?.description || '' },
  ]),
})
</script>
