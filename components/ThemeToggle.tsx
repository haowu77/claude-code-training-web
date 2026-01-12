'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

/**
 * 主题切换按钮组件 - Simple Modern 风格
 * 使用 next-themes 实现深浅色主题切换
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // 防止服务端渲染时的主题闪烁
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 bg-[var(--color-code-bg)] rounded-lg animate-pulse" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="no-print flex items-center justify-center w-10 h-10 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-code-bg)] hover:border-[var(--color-text-secondary)] transition-all"
      aria-label="切换主题"
      title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-[var(--color-primary)]" />
      ) : (
        <Moon className="w-5 h-5 text-[var(--color-text-primary)]" />
      )}
    </button>
  )
}
