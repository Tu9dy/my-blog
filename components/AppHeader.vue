<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-xl"
    :style="{
      backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)',
      borderBottom: '1px solid var(--border)',
    }"
  >
    <nav class="container-blog flex items-center justify-between h-[72px]">
      <!-- Left: Personal (with hover dropdown) -->
      <div
        class="relative flex items-center gap-3 profile-trigger"
        @mouseenter="showProfile = true"
        @mouseleave="showProfile = false"
      >
        <!-- Avatar -->
        <div class="relative">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300"
            :class="{ 'scale-110': showProfile }"
            :style="{
              backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
              border: `2px solid ${showProfile ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 20%, transparent)'}`,
            }"
          >
            <img v-if="personal.avatar" :src="personal.avatar" class="w-full h-full object-cover" />
            <span v-else class="font-display font-bold text-sm" :style="{ color: 'var(--accent)' }">
              {{ personal.name?.charAt(0) || '?' }}
            </span>
          </div>
          <!-- Online dot -->
          <span
            class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            :style="{
              backgroundColor: '#22c55e',
              borderColor: 'var(--bg)',
            }"
          />
        </div>

        <!-- Name (visible on larger screens) -->
        <div class="hidden sm:flex flex-col">
          <span
            class="text-[15px] font-display font-bold tracking-tight leading-tight transition-colors duration-300"
            :style="{ color: showProfile ? 'var(--accent)' : 'var(--text)' }"
          >
            {{ personal.name || 'studio' }}<span class="text-gradient">.</span>
          </span>
          <span class="text-[10px] font-mono leading-tight" :style="{ color: 'var(--text-subtle)' }">
            developer &middot; designer
          </span>
        </div>

        <!-- Profile Dropdown Panel -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 -translate-y-2 scale-95"
        >
          <div
            v-if="showProfile"
            class="absolute top-full left-0 -translate-x-[124px] mt-10 w-72 rounded-2xl overflow-visible"
            :style="{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 60px -12px color-mix(in srgb, #000 30%, transparent)',
            }"
          >
            <!-- Top: Large protruding avatar -->
            <div class="relative pt-0">
              <!-- Avatar circle that breaks out of the panel -->
              <div
                class="absolute left-1/2 -translate-x-1/2 -top-10 w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
                :style="{
                  backgroundColor: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                  border: '3px solid var(--accent)',
                  boxShadow: '0 4px 20px color-mix(in srgb, var(--accent) 25%, transparent)',
                }"
              >
                <img v-if="personal.avatar" :src="personal.avatar" class="w-full h-full object-cover" />
                <span v-else class="font-display font-bold text-2xl" :style="{ color: 'var(--accent)' }">
                  {{ personal.name?.charAt(0) || '?' }}
                </span>
              </div>
              <!-- Spacer to push content below the protruding avatar -->
              <div class="h-12" />
              <!-- Name + location centered below avatar -->
              <div class="text-center px-5 pb-4" :style="{ borderBottom: '1px solid var(--border)' }">
                <h3 class="text-lg font-display font-bold" :style="{ color: 'var(--text)' }">
                  {{ personal.name || '未设置' }}
                </h3>
                <p v-if="personal.location" class="text-xs font-mono mt-1" :style="{ color: 'var(--text-subtle)' }">
                  {{ personal.location }}
                </p>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="p-4 space-y-2.5" :style="{ borderBottom: '1px solid var(--border)' }">
              <div v-if="personal.phone" class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" :style="{ color: 'var(--text-subtle)' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span class="text-sm" :style="{ color: 'var(--text-muted)' }">{{ personal.phone }}</span>
                </div>
                <button class="text-[11px] font-mono transition-colors" :style="{ color: 'var(--text-subtle)' }" @click="copyText(personal.phone)" @mouseenter="$event.target.style.color = 'var(--accent)'" @mouseleave="$event.target.style.color = 'var(--text-subtle)'">复制</button>
              </div>
              <div v-if="personal.email" class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" :style="{ color: 'var(--text-subtle)' }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm" :style="{ color: 'var(--text-muted)' }">{{ personal.email }}</span>
                </div>
                <button class="text-[11px] font-mono transition-colors" :style="{ color: 'var(--text-subtle)' }" @click="copyText(personal.email)" @mouseenter="$event.target.style.color = 'var(--accent)'" @mouseleave="$event.target.style.color = 'var(--text-subtle)'">复制</button>
              </div>
            </div>

            <!-- Actions -->
            <div class="p-2">
              <button
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-200"
                :style="{ color: 'var(--text-muted)' }"
                @click="toggleTheme"
                @mouseenter="$event.currentTarget.style.backgroundColor = 'var(--bg-elevated)'; $event.currentTarget.style.color = 'var(--text)'"
                @mouseleave="$event.currentTarget.style.backgroundColor = 'transparent'; $event.currentTarget.style.color = 'var(--text-muted)'"
              >
                <svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                {{ colorMode.value === 'dark' ? '切换亮色模式' : '切换暗色模式' }}
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Right: Nav -->
      <div class="hidden sm:flex items-center gap-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="relative px-3.5 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-300"
          :style="isActive(item.to)
            ? { color: 'var(--accent)' }
            : { color: 'var(--text-muted)' }"
          @mouseenter="$event.target.style.color = isActive(item.to) ? 'var(--accent)' : 'var(--text)'"
          @mouseleave="$event.target.style.color = isActive(item.to) ? 'var(--accent)' : 'var(--text-muted)'"
        >
          {{ item.label }}
          <span
            v-if="isActive(item.to)"
            class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
            :style="{ backgroundColor: 'var(--accent)' }"
          />
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="sm:hidden p-2 rounded-lg transition-colors"
        :style="{ color: 'var(--text-muted)' }"
        @click="mobileOpen = !mobileOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="sm:hidden backdrop-blur-xl"
        :style="{
          backgroundColor: 'color-mix(in srgb, var(--bg) 95%, transparent)',
          borderBottom: '1px solid var(--border)',
        }"
      >
        <div class="container-blog py-3 space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :style="isActive(item.to)
              ? { color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)' }
              : { color: 'var(--text-muted)' }"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()
const mobileOpen = ref(false)
const showProfile = ref(false)

const navItems = [
  { label: '博客', to: '/' },
  { label: '项目', to: '/projects' },
  { label: '关于', to: '/about' },
]

const personal = ref({ name: '', avatar: '', phone: '', email: '', location: '' })

onMounted(() => {
  const saved = localStorage.getItem('site_personal_data')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      personal.value = {
        name: data.name || '',
        avatar: data.avatar || '',
        phone: data.phone || '',
        email: data.email || '',
        location: data.location || '',
      }
    } catch {}
  }
})

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function copyText(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<style scoped>
/* Keep dropdown open when moving mouse from trigger to panel */
.profile-trigger {
  padding-bottom: 20px;
  margin-bottom: -20px;
}
</style>
