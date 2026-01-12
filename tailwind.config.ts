import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Simple Modern 配色方案
        background: '#FAFAFA',
        card: '#FFFFFF',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B6B6B',
        border: '#E5E5E5',
        divider: '#EEEEEE',
        'code-bg': '#F5F5F5',
        primary: {
          DEFAULT: '#0066CC',
          hover: '#0052A3',
        },
        link: '#0066CC',
        success: '#10B981',
        warning: '#F59E0B',
        // Amber 强调色 (用于服务/咨询相关元素)
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // 深色主题颜色（通过 dark: 前缀在组件中使用）
        'dark-bg': '#0F0F0F',
        'dark-card': '#1A1A1A',
        'dark-text': '#FFFFFF',
        'dark-text-secondary': '#A3A3A3',
        'dark-border': '#2A2A2A',
        'dark-code-bg': '#262626',
        'dark-primary': '#3B82F6',
        'dark-primary-hover': '#60A5FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        // 柔和阴影
        sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 12px rgba(0, 0, 0, 0.12)',
        lg: '0 10px 24px rgba(0, 0, 0, 0.15)',
        xl: '0 20px 40px rgba(0, 0, 0, 0.2)',
        // 深色模式阴影
        'dark-sm': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'dark-lg': '0 10px 24px rgba(0, 0, 0, 0.5)',
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        'content': '900px',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '12px',
      },
      lineHeight: {
        'relaxed': '1.75',
        'loose': '1.8',
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em',
      },
    },
  },
  plugins: [],
}

export default config
