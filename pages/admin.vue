<template>
  <div class="container-blog py-16 sm:py-24">
    <!-- Page Header -->
    <section class="mb-12 opacity-0 animate-fade-up">
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
        Site <span class="text-gradient">Settings</span>
      </h1>
      <div class="divider mb-6" />
      <p class="text-sm" :style="{ color: 'var(--text-muted)' }">
        修改后点击保存，关于页会实时同步更新。
      </p>
    </section>

    <!-- Personal Info Section -->
    <section class="mb-12 opacity-0 animate-fade-up stagger-1">
      <h2 class="text-xs font-mono font-semibold uppercase tracking-[0.15em] mb-6" :style="{ color: 'var(--text-subtle)' }">
        Personal Info
      </h2>

      <!-- Avatar Upload -->
      <div class="rounded-2xl p-5 mb-4 flex items-center gap-5" :style="{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }">
        <div
          class="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
          :style="{
            backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)',
          }"
        >
          <img v-if="personal.avatar" :src="personal.avatar" class="w-full h-full object-cover" />
          <span v-else class="font-display font-bold text-xl" :style="{ color: 'var(--accent)' }">
            {{ personal.name?.charAt(0) || '?' }}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-[11px] font-mono uppercase tracking-[0.15em] mb-2" :style="{ color: 'var(--text-subtle)' }">头像</p>
          <div class="flex items-center gap-3">
            <label
              class="px-3 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer transition-all duration-300"
              :style="{
                color: 'var(--accent)',
                backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)',
              }"
              @mouseenter="$event.target.style.backgroundColor = 'color-mix(in srgb, var(--accent) 15%, transparent)'"
              @mouseleave="$event.target.style.backgroundColor = 'color-mix(in srgb, var(--accent) 8%, transparent)'"
            >
              选择图片
              <input type="file" accept="image/*" class="hidden" @change="handleAvatarUpload" />
            </label>
            <button
              v-if="personal.avatar"
              class="text-xs font-mono transition-colors"
              :style="{ color: 'var(--text-subtle)' }"
              @click="personal.avatar = ''"
              @mouseenter="$event.target.style.color = 'var(--accent)'"
              @mouseleave="$event.target.style.color = 'var(--text-subtle)'"
            >移除</button>
            <span class="text-[11px]" :style="{ color: 'var(--text-subtle)' }">支持 JPG/PNG，建议 200×200</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="field in personalFields" :key="field.key" class="rounded-2xl p-5" :style="{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }">
          <label class="text-[11px] font-mono uppercase tracking-[0.15em] block mb-2" :style="{ color: 'var(--text-subtle)' }">{{ field.label }}</label>
          <input
            v-model="personal[field.key]"
            class="w-full bg-transparent text-sm outline-none pb-1"
            :style="{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }"
            @focus="$event.target.style.borderBottomColor = 'var(--accent)'"
            @blur="$event.target.style.borderBottomColor = 'var(--border)'"
          />
        </div>
      </div>
    </section>

    <!-- About Content Section -->
    <section class="mb-12 opacity-0 animate-fade-up stagger-2">
      <h2 class="text-xs font-mono font-semibold uppercase tracking-[0.15em] mb-6" :style="{ color: 'var(--text-subtle)' }">
        About Page Content
      </h2>

      <!-- Bio -->
      <div class="rounded-2xl p-5 mb-4" :style="{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }">
        <label class="text-[11px] font-mono uppercase tracking-[0.15em] block mb-3" :style="{ color: 'var(--text-subtle)' }">Bio / 简介</label>
        <textarea
          v-model="about.bio"
          rows="3"
          class="w-full bg-transparent text-sm outline-none resize-none"
          :style="{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }"
          @focus="$event.target.style.borderBottomColor = 'var(--accent)'"
          @blur="$event.target.style.borderBottomColor = 'var(--border)'"
        />
      </div>

      <!-- Tech Stacks -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div class="rounded-2xl p-5" :style="{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }">
          <label class="text-[11px] font-mono uppercase tracking-[0.15em] block mb-3" :style="{ color: 'var(--accent)' }">Frontend</label>
          <input
            v-model="about.frontendInput"
            class="w-full bg-transparent text-sm outline-none pb-1"
            :style="{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }"
            placeholder="用逗号分隔，如 Vue 3, Nuxt 3, TypeScript"
            @focus="$event.target.style.borderBottomColor = 'var(--accent)'"
            @blur="$event.target.style.borderBottomColor = 'var(--border)'"
          />
        </div>
        <div class="rounded-2xl p-5" :style="{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }">
          <label class="text-[11px] font-mono uppercase tracking-[0.15em] block mb-3" :style="{ color: 'var(--accent)' }">Backend</label>
          <input
            v-model="about.backendInput"
            class="w-full bg-transparent text-sm outline-none pb-1"
            :style="{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }"
            placeholder="用逗号分隔，如 Node.js, Python"
            @focus="$event.target.style.borderBottomColor = 'var(--accent)'"
            @blur="$event.target.style.borderBottomColor = 'var(--border)'"
          />
        </div>
      </div>

      <!-- Experiences -->
      <div class="rounded-2xl p-5 mb-4" :style="{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }">
        <div class="flex items-center justify-between mb-4">
          <label class="text-[11px] font-mono uppercase tracking-[0.15em]" :style="{ color: 'var(--text-subtle)' }">Experiences / 工作经历</label>
          <button
            class="text-[11px] font-mono px-2 py-1 rounded-lg transition-colors"
            :style="{ color: 'var(--accent)', border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }"
            @click="addExperience"
          >+ 添加</button>
        </div>
        <div v-for="(exp, i) in about.experiences" :key="i" class="mb-4 last:mb-0 p-4 rounded-xl" :style="{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }">
          <div class="flex justify-between items-start mb-3">
            <span class="text-[10px] font-mono" :style="{ color: 'var(--text-subtle)' }">#{{ i + 1 }}</span>
            <button class="text-[10px] font-mono transition-colors" :style="{ color: 'var(--text-subtle)' }" @click="removeExperience(i)" @mouseenter="$event.target.style.color = 'var(--accent)'" @mouseleave="$event.target.style.color = 'var(--text-subtle)'">删除</button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input v-model="exp.role" placeholder="职位" class="w-full bg-transparent text-sm outline-none pb-1" :style="{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }" @focus="$event.target.style.borderBottomColor = 'var(--accent)'" @blur="$event.target.style.borderBottomColor = 'var(--border)'" />
            <input v-model="exp.company" placeholder="公司" class="w-full bg-transparent text-sm outline-none pb-1" :style="{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }" @focus="$event.target.style.borderBottomColor = 'var(--accent)'" @blur="$event.target.style.borderBottomColor = 'var(--border)'" />
          </div>
          <input v-model="exp.period" placeholder="时间段，如 2022 - 至今" class="w-full bg-transparent text-sm outline-none pb-1 mb-3" :style="{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }" @focus="$event.target.style.borderBottomColor = 'var(--accent)'" @blur="$event.target.style.borderBottomColor = 'var(--border)'" />
          <textarea v-model="exp.description" placeholder="工作描述" rows="2" class="w-full bg-transparent text-sm outline-none resize-none" :style="{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }" @focus="$event.target.style.borderBottomColor = 'var(--accent)'" @blur="$event.target.style.borderBottomColor = 'var(--border)'" />
        </div>
      </div>

      <!-- Interests -->
      <div class="rounded-2xl p-5" :style="{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }">
        <label class="text-[11px] font-mono uppercase tracking-[0.15em] block mb-3" :style="{ color: 'var(--text-subtle)' }">Interests / 兴趣爱好</label>
        <textarea
          v-model="about.interests"
          rows="3"
          class="w-full bg-transparent text-sm outline-none resize-none"
          :style="{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }"
          @focus="$event.target.style.borderBottomColor = 'var(--accent)'"
          @blur="$event.target.style.borderBottomColor = 'var(--border)'"
        />
      </div>
    </section>

    <!-- Actions -->
    <section class="opacity-0 animate-fade-up stagger-3">
      <div class="flex items-center gap-4">
        <button
          class="px-6 py-3 rounded-xl text-sm font-mono font-medium transition-all duration-300"
          :style="{ color: '#fff', backgroundColor: 'var(--accent)' }"
          @click="saveAll"
          @mouseenter="$event.target.style.backgroundColor = 'var(--accent-glow)'"
          @mouseleave="$event.target.style.backgroundColor = 'var(--accent)'"
        >
          {{ saved ? '已保存 ✓' : '保存全部' }}
        </button>
        <button
          class="px-4 py-3 rounded-xl text-xs font-mono transition-colors duration-300"
          :style="{ color: 'var(--text-subtle)' }"
          @click="resetAll"
          @mouseenter="$event.target.style.color = 'var(--accent)'"
          @mouseleave="$event.target.style.color = 'var(--text-subtle)'"
        >
          重置为默认
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
// Auth guard
if (typeof window !== 'undefined' && !sessionStorage.getItem('admin_auth')) {
  navigateTo('/')
}

useHead({ title: 'Site Settings - Studio' })

// ── Default data ──
const defaultPersonal = {
  name: '张三',
  phone: '138-0000-0000',
  email: 'zhangsan@example.com',
  location: '中国 · 北京',
  avatar: '',
}

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

// ── State ──
const personalFields = [
  { key: 'name', label: '姓名' },
  { key: 'phone', label: '手机' },
  { key: 'email', label: '邮箱' },
  { key: 'location', label: '所在地' },
]

const personal = ref({ ...defaultPersonal })
const about = ref({
  ...defaultAbout,
  frontendInput: defaultAbout.frontendTech.join(', '),
  backendInput: defaultAbout.backendTech.join(', '),
})
const saved = ref(false)

// ── Load from localStorage ──
onMounted(() => {
  const savedPersonal = localStorage.getItem('site_personal_data')
  const savedAbout = localStorage.getItem('site_about_data')
  if (savedPersonal) {
    try { Object.assign(personal.value, JSON.parse(savedPersonal)) } catch {}
  }
  if (savedAbout) {
    try {
      const parsed = JSON.parse(savedAbout)
      about.value = {
        ...parsed,
        frontendInput: parsed.frontendTech?.join(', ') || '',
        backendInput: parsed.backendTech?.join(', ') || '',
      }
    } catch {}
  }
})

// ── Actions ──
function addExperience() {
  about.value.experiences.push({ role: '', company: '', period: '', description: '' })
}

function removeExperience(i: number) {
  about.value.experiences.splice(i, 1)
}

function handleAvatarUpload(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    personal.value.avatar = ev.target?.result as string
  }
  reader.readAsDataURL(file)
  input.value = ''
}

function saveAll() {
  // Parse comma-separated tech inputs
  const aboutData = {
    bio: about.value.bio,
    frontendTech: about.value.frontendInput.split(/[,，]/).map(s => s.trim()).filter(Boolean),
    backendTech: about.value.backendInput.split(/[,，]/).map(s => s.trim()).filter(Boolean),
    experiences: about.value.experiences,
    interests: about.value.interests,
  }
  localStorage.setItem('site_personal_data', JSON.stringify(personal.value))
  localStorage.setItem('site_about_data', JSON.stringify(aboutData))
  saved.value = true
  setTimeout(() => { saved.value = false }, 2000)
}

function resetAll() {
  personal.value = { ...defaultPersonal }
  about.value = {
    ...defaultAbout,
    frontendInput: defaultAbout.frontendTech.join(', '),
    backendInput: defaultAbout.backendTech.join(', '),
  }
  localStorage.removeItem('site_personal_data')
  localStorage.removeItem('site_about_data')
}

function logout() {
  sessionStorage.removeItem('admin_auth')
  navigateTo('/')
}
</script>
