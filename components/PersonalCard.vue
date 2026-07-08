<template>
  <div
    class="rounded-2xl p-5 mb-8"
    :style="{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border)',
    }"
  >
    <div class="flex items-center gap-3 mb-4">
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
        :style="{
          backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
          border: '1px solid color-mix(in srgb, var(--accent) 15%, transparent)',
        }"
      >
        <img v-if="personal.avatar" :src="personal.avatar" class="w-full h-full object-cover" />
        <span v-else class="font-display font-bold text-lg" :style="{ color: 'var(--accent)' }">
          {{ personal.name?.charAt(0) || '?' }}
        </span>
      </div>
      <div>
        <h3 class="text-base font-display font-semibold" :style="{ color: 'var(--text)' }">
          {{ personal.name || '未设置' }}
        </h3>
        <p class="text-xs font-mono" :style="{ color: 'var(--text-subtle)' }">
          {{ personal.location || '' }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div v-if="personal.phone" class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" :style="{ color: 'var(--text-subtle)' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span class="text-xs" :style="{ color: 'var(--text-muted)' }">{{ personal.phone }}</span>
      </div>
      <div v-if="personal.email" class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" :style="{ color: 'var(--text-subtle)' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span class="text-xs" :style="{ color: 'var(--text-muted)' }">{{ personal.email }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const defaultPersonal = {
  name: '张三',
  phone: '138-0000-0000',
  email: 'zhangsan@example.com',
  location: '中国 · 北京',
  avatar: '',
}

const personal = ref({ ...defaultPersonal })

onMounted(() => {
  const saved = localStorage.getItem('site_personal_data')
  if (saved) {
    try { Object.assign(personal.value, JSON.parse(saved)) } catch {}
  }
})
</script>
