<template>
  <div class="container-blog py-12">
    <section class="max-w-3xl">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">
        About <span class="text-brand-400">Me</span>
      </h1>
      <div class="h-1 w-16 bg-brand-500 rounded-full mb-10"></div>

      <div class="prose prose-invert max-w-none">
        <p>
          你好！我是一名热爱技术的全栈开发者，专注于前端工程和用户体验优化。
        </p>

        <h2>技术栈</h2>
        <p>
          我日常使用 Vue.js / Nuxt.js 构建 Web 应用，对 TypeScript 有深入的理解和实践。
          在后端方面，我熟悉 Node.js 和 Python，能够独立完成从数据库到前端的全链路开发。
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          <div class="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
            <h3 class="text-sm font-mono font-semibold text-brand-400 mb-3">Frontend</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in frontendTech" :key="tech" class="px-2 py-1 rounded text-xs font-mono bg-gray-900 text-gray-400 border border-gray-700/50">{{ tech }}</span>
            </div>
          </div>
          <div class="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
            <h3 class="text-sm font-mono font-semibold text-brand-400 mb-3">Backend</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in backendTech" :key="tech" class="px-2 py-1 rounded text-xs font-mono bg-gray-900 text-gray-400 border border-gray-700/50">{{ tech }}</span>
            </div>
          </div>
        </div>

        <h2>工作经历</h2>
        <div class="space-y-6 my-6">
          <div v-for="exp in experiences" :key="exp.company" class="relative pl-6 border-l-2 border-gray-800 hover:border-brand-500/50 transition-colors">
            <div class="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-gray-700"></div>
            <h3 class="text-lg font-semibold text-gray-200">{{ exp.role }}</h3>
            <p class="text-sm text-brand-400 font-mono">{{ exp.company }} &middot; {{ exp.period }}</p>
            <p class="text-sm text-gray-400 mt-2">{{ exp.description }}</p>
          </div>
        </div>

        <h2>兴趣爱好</h2>
        <p>
          工作之余，我喜欢阅读技术文章和开源项目源码，参与社区讨论。
          也喜欢跑步和摄影，用不同的视角观察世界。
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于我 - Dev Blog',
})

const frontendTech = ['Vue 3', 'Nuxt 3', 'TypeScript', 'Tailwind CSS', 'React', 'Vite', 'Pinia']
const backendTech = ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'Nginx']

const experiences = [
  {
    role: '高级前端工程师',
    company: '某科技公司',
    period: '2022 - 至今',
    description: '负责核心业务系统的前端架构设计与性能优化，主导技术栈升级和团队规范建设。',
  },
  {
    role: '前端开发工程师',
    company: '某互联网公司',
    period: '2019 - 2022',
    description: '参与多个 ToB 产品的开发，从 0 到 1 搭建组件库和自动化测试体系。',
  },
]
</script>
