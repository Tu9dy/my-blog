/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', '"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#FFF5F0',
          100: '#FFE8DC',
          200: '#FFD0BA',
          300: '#FFB08E',
          400: '#FF8A65',
          500: '#E8623A',
          600: '#D4502A',
          700: '#B03E1F',
          800: '#8E3118',
          900: '#6B2512',
          950: '#4A1A0D',
        },
        surface: {
          0: '#0C0C0E',
          1: '#131316',
          2: '#1A1A1F',
          3: '#222228',
          4: '#2A2A32',
        },
        content: {
          DEFAULT: '#E8E4DC',
          muted: '#8A8578',
          subtle: '#5A564E',
          faint: '#3A3832',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.content.muted'),
            '--tw-prose-headings': theme('colors.content.DEFAULT'),
            '--tw-prose-links': theme('colors.brand.400'),
            '--tw-prose-bold': theme('colors.content.DEFAULT'),
            '--tw-prose-code': theme('colors.brand.300'),
            '--tw-prose-pre-bg': theme('colors.surface.2'),
            '--tw-prose-quotes': theme('colors.content.muted'),
            '--tw-prose-quote-borders': theme('colors.brand.500'),
            maxWidth: 'none',
            fontFamily: '"Plus Jakarta Sans", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif',
            h1: { fontFamily: '"Fraunces", "Noto Serif SC", Georgia, serif' },
            h2: { fontFamily: '"Fraunces", "Noto Serif SC", Georgia, serif' },
            h3: { fontFamily: '"Fraunces", "Noto Serif SC", Georgia, serif' },
            h4: { fontFamily: '"Fraunces", "Noto Serif SC", Georgia, serif' },
            a: {
              textDecoration: 'none',
              color: theme('colors.brand.400'),
              transition: 'color 0.2s',
              '&:hover': {
                color: theme('colors.brand.300'),
                textDecoration: 'underline',
              },
            },
            code: {
              fontWeight: '500',
              padding: '0.15em 0.4em',
              borderRadius: '0.3rem',
              backgroundColor: theme('colors.surface.3'),
              fontSize: '0.875em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              borderRadius: '0.75rem',
              border: '1px solid',
              borderColor: theme('colors.surface.4'),
              backgroundColor: theme('colors.surface.2'),
            },
            blockquote: {
              borderLeftWidth: '3px',
              borderColor: theme('colors.brand.500'),
              fontStyle: 'italic',
            },
            hr: {
              borderColor: theme('colors.surface.3'),
            },
          },
        },
      }),
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
