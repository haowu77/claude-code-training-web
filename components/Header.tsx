'use client'

import ThemeToggle from './ThemeToggle'
import SearchBar from './SearchBar'
import { SearchIndex } from '@/lib/search'

/**
 * 顶部导航栏组件 - Simple Modern 风格
 * 包含 Logo、搜索栏、主题切换按钮
 */

interface HeaderProps {
  searchIndex: SearchIndex
}

export default function Header({ searchIndex }: HeaderProps) {
  return (
    <header className="no-print sticky top-0 z-50 w-full bg-[var(--color-card)] border-b border-[var(--color-border)] backdrop-blur-sm bg-opacity-95">
      <div className="max-w-[1920px] mx-auto px-8 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-4 min-w-[240px]">
          <h1 className="text-xl font-semibold text-[var(--color-text-primary)] tracking-tight">
            Claude Code
          </h1>
          <span className="hidden md:inline text-sm font-normal text-[var(--color-text-secondary)]">
            培训教程
          </span>
        </div>

        {/* 搜索栏 - 居中，最大宽度 */}
        <div className="flex-1 max-w-2xl mx-auto">
          <SearchBar searchIndex={searchIndex} />
        </div>

        {/* 主题切换 */}
        <div className="min-w-[80px] flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
