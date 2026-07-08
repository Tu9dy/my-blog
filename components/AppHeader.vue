<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-xl"
    :style="{
      backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)',
      borderBottom: '1px solid var(--border)',
    }"
  >
    <nav class="container-blog flex items-center justify-between h-16">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <span
          class="text-lg font-display font-bold tracking-tight transition-colors duration-300"
          :style="{ color: 'var(--text)' }"
        >
          studio<span class="text-gradient">.</span>
        </span>
      </NuxtLink>

      <!-- Desktop Nav -->
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

        <!-- Theme Toggle -->
        <button
          class="ml-3 p-2 rounded-lg transition-all duration-300"
          :style="{ color: 'var(--text-muted)' }"
          :title="colorMode.value === 'dark' ? '切换亮色模式' : '切换暗色模式'"
          @click="toggleColorMode"
          @mouseenter="$event.target.style.color = 'var(--text)'"
          @mouseleave="$event.target.style.color = 'var(--text-muted)'"
        >
          <svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
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

const navItems = [
  { label: '博客', to: '/' },
  { label: '项目', to: '/projects' },
  { label: '关于', to: '/about' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
