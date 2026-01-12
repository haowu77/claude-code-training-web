'use client'

import { useEffect, useState, ReactNode } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { ContentSection } from '@/lib/content'
import { HeadingNode } from '@/lib/markdown'
import { SearchIndex, buildSearchIndex } from '@/lib/search'

/**
 * 客户端页面组件 - Simple Modern 风格
 * 只保留左侧导航，去掉右侧 TOC，实现更简洁的布局
 */

interface ClientPageProps {
  allContent: string
  sections: ContentSection[]
  headings: HeadingNode[]
  children: ReactNode // Markdown 内容作为 children 传入
}

export default function ClientPage({ allContent, sections, headings, children }: ClientPageProps) {
  const [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null)

  // 在客户端构建搜索索引
  useEffect(() => {
    const index = buildSearchIndex(allContent)
    setSearchIndex(index)
  }, [allContent])

  // 在搜索索引准备好之前显示 loading 状态
  if (!searchIndex) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <p className="text-[var(--color-text-secondary)]">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* 顶部导航栏 */}
      <Header searchIndex={searchIndex} />

      {/* 主内容区域 - 双栏布局：Sidebar + Content */}
      <div className="w-full">
        <div className="max-w-[1920px] mx-auto flex">
          {/* 左侧边栏 - 固定宽度 280px */}
          <Sidebar sections={sections} />

          {/* 主内容区域 - 占满剩余空间，内部内容最大 1000px 居中 */}
          <main className="flex-1 min-w-0 px-12 py-16 lg:px-20 lg:py-20">
            <article className="max-w-[1000px] mx-auto">
              {children}
            </article>
          </main>
        </div>
      </div>
    </div>
  )
}
