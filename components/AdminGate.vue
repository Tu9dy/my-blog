<template>
  <div>
    <!-- Password Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0" :style="{ backgroundColor: 'color-mix(in srgb, var(--bg) 80%, transparent)' }" />

        <!-- Modal -->
        <div
          class="relative w-full max-w-sm rounded-2xl p-6 opacity-0 animate-fade-up"
          :style="{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 48px -12px color-mix(in srgb, #000 40%, transparent)',
          }"
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <div>
              <p class="text-xs font-mono uppercase tracking-[0.15em] mb-1" :style="{ color: 'var(--accent)' }">
                Auth Required
              </p>
              <h3 class="text-lg font-display font-semibold" :style="{ color: 'var(--text)' }">
                管理员验证
              </h3>
            </div>
            <button
              class="p-1.5 rounded-lg transition-colors"
              :style="{ color: 'var(--text-subtle)' }"
              @click="closeModal"
              @mouseenter="$event.target.style.color = 'var(--text)'"
              @mouseleave="$event.target.style.color = 'var(--text-subtle)'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Password Input -->
          <div class="mb-4">
            <input
              ref="passwordInput"
              v-model="password"
              type="password"
              placeholder="输入密码..."
              class="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
              :style="{
                backgroundColor: 'var(--bg-elevated)',
                border: `1px solid ${error ? 'var(--accent)' : 'var(--border)'}`,
                color: 'var(--text)',
              }"
              @keyup.enter="verify"
              @input="error = false"
            />
          </div>

          <!-- Error Message -->
          <p v-if="error" class="text-xs mb-4" :style="{ color: 'var(--accent)' }">
            密码错误，请重试。
          </p>

          <!-- Hint -->
          <p v-if="!error" class="text-[11px] mb-4" :style="{ color: 'var(--text-subtle)' }">
            按 Enter 确认
          </p>

          <!-- Submit Button -->
          <button
            class="w-full py-3 rounded-xl text-sm font-mono font-medium transition-all duration-300"
            :style="{
              color: '#fff',
              backgroundColor: 'var(--accent)',
            }"
            @click="verify"
            @mouseenter="$event.target.style.backgroundColor = 'var(--accent-glow)'"
            @mouseleave="$event.target.style.backgroundColor = 'var(--accent)'"
          >
            验证
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const showModal = ref(false)
const password = ref('')
const error = ref(false)
const passwordInput = ref<HTMLInputElement | null>(null)

// Simple password check (client-side only — not real security)
// Change this to your own password
const ADMIN_PASSWORD = 'studio2026'

function openModal() {
  showModal.value = true
  error.value = false
  password.value = ''
  nextTick(() => {
    passwordInput.value?.focus()
  })
}

function closeModal() {
  showModal.value = false
  password.value = ''
  error.value = false
}

function verify() {
  if (password.value === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_auth', 'true')
    closeModal()
    navigateTo('/admin')
  } else {
    error.value = true
    password.value = ''
    passwordInput.value?.focus()
  }
}

// Global keyboard shortcut: Ctrl+Shift+X
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'x') {
      e.preventDefault()
      // If already on admin page and authenticated, do nothing
      if (useRoute().path === '/admin' && sessionStorage.getItem('admin_auth')) return
      openModal()
    }
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>
