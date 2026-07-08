<template>
  <div class="container-blog py-16 sm:py-24">
    <!-- Page Header -->
    <section class="mb-16 opacity-0 animate-fade-up">
      <p class="text-xs font-mono font-medium uppercase tracking-[0.2em] mb-4" :style="{ color: 'var(--accent)' }">
        Portfolio
      </p>
      <h1 class="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4" :style="{ color: 'var(--text)' }">
        My <span class="text-gradient">Projects</span>
      </h1>
      <p class="text-base leading-relaxed max-w-lg mb-8" :style="{ color: 'var(--text-muted)' }">
        这里展示了我参与或独立完成的一些项目。每个项目都代表了一段学习旅程或解决实际问题的尝试。
      </p>
      <div class="divider" />
    </section>

    <!-- Projects Grid -->
    <section class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div
        v-for="(project, index) in projects"
        :key="project.name"
        class="group relative rounded-2xl p-6 transition-all duration-500 opacity-0 animate-fade-up"
        :class="`stagger-${index + 2}`"
        :style="{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
        }"
        @mouseenter="$event.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 30%, var(--border))'; $event.currentTarget.style.transform = 'translateY(-2px)'; $event.currentTarget.style.boxShadow = '0 8px 32px -8px color-mix(in srgb, var(--accent) 12%, transparent)'"
        @mouseleave="$event.currentTarget.style.borderColor = 'var(--border)'; $event.currentTarget.style.transform = 'translateY(0)'; $event.currentTarget.style.boxShadow = 'none'"
      >
        <!-- Top Row: Icon + Links -->
        <div class="flex items-start justify-between mb-5">
          <div
            class="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300"
            :style="{
              backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              color: 'var(--accent)',
              border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)',
            }"
          >
            {{ project.icon }}
          </div>
          <div class="flex items-center gap-2">
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="p-1.5 rounded-lg transition-all duration-300"
              :style="{ color: 'var(--text-subtle)' }"
              title="GitHub"
              @mouseenter="$event.target.style.color = 'var(--text)'"
              @mouseleave="$event.target.style.color = 'var(--text-subtle)'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a
              v-if="project.live"
              :href="project.live"
              target="_blank"
              rel="noopener noreferrer"
              class="p-1.5 rounded-lg transition-all duration-300"
              :style="{ color: 'var(--text-subtle)' }"
              title="Live Demo"
              @mouseenter="$event.target.style.color = 'var(--accent)'"
              @mouseleave="$event.target.style.color = 'var(--text-subtle)'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Project Info -->
        <h3
          class="text-lg font-display font-semibold mb-2 transition-colors duration-300"
          :style="{ color: 'var(--text)' }"
        >
          {{ project.name }}
        </h3>
        <p class="text-sm leading-relaxed mb-5" :style="{ color: 'var(--text-muted)' }">
          {{ project.description }}
        </p>

        <!-- Tech Tags -->
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tech in project.tech"
            :key="tech"
            class="px-2 py-0.5 rounded text-[11px] font-mono font-medium tracking-wide"
            :style="{
              color: 'var(--text-subtle)',
              backgroundColor: 'var(--bg-elevated)',
            }"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '项目 - Studio',
})

const projects = [
  {
    name: 'CRM 管理系统',
    icon: 'CR',
    description: '企业级客户关系管理系统，包含客户管理、销售漏斗、数据分析等模块，支持多角色权限和实时协作。',
    tech: ['Vue 3', 'TypeScript', 'Nuxt 3', 'Pinia'],
    github: 'https://github.com',
    live: '',
  },
  {
    name: 'DevToolkit CLI',
    icon: 'DT',
    description: '开发者效率工具集，集成代码生成、项目脚手架、Git 工作流自动化等常用命令。',
    tech: ['Node.js', 'TypeScript', 'Commander'],
    github: 'https://github.com',
    live: '',
  },
  {
    name: 'Markdown Editor',
    icon: 'ME',
    description: '在线 Markdown 编辑器，支持实时预览、语法高亮、自定义主题和导出 PDF 功能。',
    tech: ['Vue 3', 'CodeMirror', 'Vite'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    name: 'API Monitor',
    icon: 'AM',
    description: '轻量级 API 监控面板，实时监控接口响应时间、错误率和吞吐量，支持告警通知。',
    tech: ['React', 'D3.js', 'Express', 'Redis'],
    github: 'https://github.com',
    live: '',
  },
]
</script>
