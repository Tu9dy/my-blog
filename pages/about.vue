<template>
  <div class="container-blog py-16 sm:py-24">
    <!-- Page Header -->
    <section class="mb-8 opacity-0 animate-fade-up">
      <p class="text-xs font-mono font-medium uppercase tracking-[0.2em] mb-4" :style="{ color: 'var(--accent)' }">
        About
      </p>
      <h1 class="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4" :style="{ color: 'var(--text)' }">
        About <span class="text-gradient">Me</span>
      </h1>
      <div class="divider mb-10" />
    </section>

    <!-- Bio -->
    <section class="mb-12 opacity-0 animate-fade-up stagger-2">
      <p class="text-base leading-relaxed max-w-xl" :style="{ color: 'var(--text-muted)' }">
        {{ about.bio }}
      </p>
    </section>

    <!-- Tech Stack -->
    <section class="mb-12 opacity-0 animate-fade-up stagger-3">
      <h2 class="text-xs font-mono font-semibold uppercase tracking-[0.15em] mb-6" :style="{ color: 'var(--text-subtle)' }">
        Tech Stack
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          class="rounded-2xl p-5 transition-all duration-300"
          :style="{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
          }"
        >
          <h3 class="text-xs font-mono font-semibold uppercase tracking-[0.15em] mb-4" :style="{ color: 'var(--accent)' }">
            Frontend
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in about.frontendTech"
              :key="tech"
              class="px-2.5 py-1 rounded-lg text-xs font-mono font-medium"
              :style="{
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
              }"
            >{{ tech }}</span>
          </div>
        </div>
        <div
          class="rounded-2xl p-5 transition-all duration-300"
          :style="{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
          }"
        >
          <h3 class="text-xs font-mono font-semibold uppercase tracking-[0.15em] mb-4" :style="{ color: 'var(--accent)' }">
            Backend
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in about.backendTech"
              :key="tech"
              class="px-2.5 py-1 rounded-lg text-xs font-mono font-medium"
              :style="{
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
              }"
            >{{ tech }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience -->
    <section class="mb-12 opacity-0 animate-fade-up stagger-4">
      <h2 class="text-xs font-mono font-semibold uppercase tracking-[0.15em] mb-6" :style="{ color: 'var(--text-subtle)' }">
        Experience
      </h2>
      <div class="space-y-0">
        <div
          v-for="(exp, index) in about.experiences"
          :key="index"
          class="relative pl-8 pb-8 last:pb-0"
        >
          <!-- Timeline Line -->
          <div
            v-if="index < about.experiences.length - 1"
            class="absolute left-[5px] top-3 bottom-0 w-px"
            :style="{ backgroundColor: 'var(--border)' }"
          />
          <!-- Timeline Dot -->
          <div
            class="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full"
            :style="{
              backgroundColor: index === 0 ? 'var(--accent)' : 'var(--bg-elevated)',
              border: `2px solid ${index === 0 ? 'var(--accent)' : 'var(--border)'}`,
            }"
          />
          <!-- Content -->
          <h3 class="text-base font-display font-semibold mb-1" :style="{ color: 'var(--text)' }">
            {{ exp.role }}
          </h3>
          <p class="text-xs font-mono tracking-wide mb-2" :style="{ color: 'var(--accent)' }">
            {{ exp.company }} &middot; {{ exp.period }}
          </p>
          <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-muted)' }">
            {{ exp.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Interests -->
    <section class="opacity-0 animate-fade-up stagger-5">
      <h2 class="text-xs font-mono font-semibold uppercase tracking-[0.15em] mb-6" :style="{ color: 'var(--text-subtle)' }">
        Interests
      </h2>
      <div
        class="rounded-2xl p-5"
        :style="{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
        }"
      >
        <p class="text-sm leading-relaxed" :style="{ color: 'var(--text-muted)' }">
          {{ about.interests }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于我 - Studio',
})

const defaultAbout = {
  bio: '你好！我是一名热爱技术的全栈开发者，专注于前端工程和用户体验优化。',
  frontendTech: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Tailwind CSS', 'React', 'Vite', 'Pinia'],
  backendTech: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
  experiences: [
    { role: '高级前端工程师', company: '某科技公司', period: '2022 - 至今', description: '负责核心业务系统的前端架构设计与性能优化，主导技术栈升级和团队规范建设。' },
    { role: '前端开发工程师', company: '某互联网公司', period: '2019 - 2022', description: '参与多个 ToB 产品的开发，从 0 到 1 搭建组件库和自动化测试体系。' },
  ],
  interests: '工作之余，我喜欢阅读技术文章和开源项目源码，参与社区讨论。也喜欢跑步和摄影，用不同的视角观察世界。',
}

const about = ref({ ...defaultAbout })

onMounted(() => {
  const saved = localStorage.getItem('site_about_data')
  if (saved) {
    try { Object.assign(about.value, JSON.parse(saved)) } catch {}
  }
})
</script>
