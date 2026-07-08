<template>
  <div class="container-blog py-16 sm:py-24">
    <!-- Page Header -->
    <section class="mb-16 opacity-0 animate-fade-up">
      <div class="flex items-center gap-3 mb-4">
        <p class="text-xs font-mono font-medium uppercase tracking-[0.2em]" :style="{ color: 'var(--accent)' }">
          Admin
        </p>
        <span
          class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider"
          :style="{
            color: 'var(--accent)',
            backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
          }"
        >Private</span>
      </div>
      <h1 class="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4" :style="{ color: 'var(--text)' }">
        Personal <span class="text-gradient">Info</span>
      </h1>
      <div class="divider mb-10" />
    </section>

    <!-- Contact Details -->
    <section class="mb-12 opacity-0 animate-fade-up stagger-1">
      <h2 class="text-xs font-mono font-semibold uppercase tracking-[0.15em] mb-6" :style="{ color: 'var(--text-subtle)' }">
        Contact
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="item in contactItems"
          :key="item.label"
          class="rounded-2xl p-5"
          :style="{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
          }"
        >
          <p class="text-[11px] font-mono uppercase tracking-[0.15em] mb-2" :style="{ color: 'var(--text-subtle)' }">
            {{ item.label }}
          </p>
          <p class="text-sm font-medium" :style="{ color: 'var(--text)' }">
            {{ item.value }}
          </p>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section class="mb-12 opacity-0 animate-fade-up stagger-2">
      <h2 class="text-xs font-mono font-semibold uppercase tracking-[0.15em] mb-6" :style="{ color: 'var(--text-subtle)' }">
        Education
      </h2>
      <div
        class="rounded-2xl p-5"
        :style="{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
        }"
      >
        <div v-for="edu in education" :key="edu.school" class="relative pl-8 pb-6 last:pb-0">
          <div
            class="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full"
            :style="{
              backgroundColor: 'var(--bg-elevated)',
              border: '2px solid var(--border)',
            }"
          />
          <div v-if="edu !== education[education.length - 1]" class="absolute left-[5px] top-3 bottom-0 w-px" :style="{ backgroundColor: 'var(--border)' }" />
          <h3 class="text-base font-display font-semibold mb-1" :style="{ color: 'var(--text)' }">
            {{ edu.degree }}
          </h3>
          <p class="text-xs font-mono tracking-wide mb-1" :style="{ color: 'var(--accent)' }">
            {{ edu.school }} &middot; {{ edu.period }}
          </p>
          <p class="text-sm" :style="{ color: 'var(--text-muted)' }">
            {{ edu.detail }}
          </p>
        </div>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="opacity-0 animate-fade-up stagger-3">
      <h2 class="text-xs font-mono font-semibold uppercase tracking-[0.15em] mb-6" :style="{ color: 'var(--text-subtle)' }">
        Quick Actions
      </h2>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="action in quickActions"
          :key="action.label"
          class="px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-300"
          :style="{
            color: 'var(--accent)',
            backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
            border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)',
          }"
          @click="action.handler"
          @mouseenter="$event.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--accent) 15%, transparent)'"
          @mouseleave="$event.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--accent) 8%, transparent)'"
        >
          {{ action.label }}
        </button>
      </div>
    </section>

    <!-- Logout -->
    <div class="mt-16 pt-8" :style="{ borderTop: '1px solid var(--border)' }">
      <button
        class="text-xs font-mono transition-colors duration-300"
        :style="{ color: 'var(--text-subtle)' }"
        @click="logout"
        @mouseenter="$event.target.style.color = 'var(--accent)'"
        @mouseleave="$event.target.style.color = 'var(--text-subtle)'"
      >
        Lock &rarr;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Auth guard — redirect if not authenticated
if (typeof window !== 'undefined' && !sessionStorage.getItem('admin_auth')) {
  navigateTo('/')
}

useHead({
  title: 'Personal Info - Studio',
})

const contactItems = [
  { label: '姓名', value: '张三' },
  { label: '手机', value: '138-0000-0000' },
  { label: '邮箱', value: 'zhangsan@example.com' },
  { label: '所在地', value: '中国 · 北京' },
]

const education = [
  {
    degree: '计算机科学与技术 · 本科',
    school: '某大学',
    period: '2015 - 2019',
    detail: '主修软件工程、数据结构、操作系统等核心课程。',
  },
]

const quickActions = [
  {
    label: '复制邮箱',
    handler: () => {
      navigator.clipboard.writeText('zhangsan@example.com')
    },
  },
  {
    label: '复制手机',
    handler: () => {
      navigator.clipboard.writeText('13800000000')
    },
  },
]

function logout() {
  sessionStorage.removeItem('admin_auth')
  navigateTo('/')
}
</script>
