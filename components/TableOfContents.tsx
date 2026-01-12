'use client'

import { useEffect, useState } from 'react'
import { HeadingNode } from '@/lib/markdown'

/**
 * 目录组件（右侧锚点导航）- Simple Modern 风格
 * 显示当前页面的标题列表，支持点击跳转
 */

interface TableOfContentsProps {
  headings: HeadingNode[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // 监听滚动，高亮当前可见的标题
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    )

    // 观察所有标题元素
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // 只显示 H2 和 H3 级别的标题
  const filteredHeadings = headings.filter((h) => h.level >= 2 && h.level <= 3)

  if (filteredHeadings.length === 0) {
    return null
  }

  return (
    <nav className="no-print hidden xl:block w-[280px] flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="py-8 px-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-6 text-[var(--color-text-secondary)]">
          本页导航
        </h3>
        <ul className="space-y-1">
          {filteredHeadings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
            >
              <button
                onClick={() => handleClick(heading.id)}
                className={`text-left text-sm hover:text-[var(--color-primary)] transition-colors w-full py-1.5 px-3 rounded-md border-l-2 ${
                  activeId === heading.id
                    ? 'text-[var(--color-primary)] font-medium border-[var(--color-primary)] bg-[var(--color-code-bg)]'
                    : 'text-[var(--color-text-secondary)] border-transparent hover:bg-[var(--color-code-bg)]'
                }`}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
