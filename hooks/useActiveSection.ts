'use client'

import { useEffect, useState } from 'react'
import { ContentSection } from '@/lib/content'
import { flattenSections } from '@/lib/navigation'

/**
 * Hook 追踪当前可见的活跃章节（基于滚动位置）
 */
export function useActiveSection(sections: ContentSection[]): string {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // 使用 IntersectionObserver 追踪可见的章节
    const observer = new IntersectionObserver(
      (entries) => {
        // 找到交叉比例最高的可见元素
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        // 视口上方 100px 到下方 80% 之间的区域
        rootMargin: '-100px 0px -80% 0px',
        // 多个阈值，更精确地追踪
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    // 观察所有章节标题
    const flat = flattenSections(sections)
    flat.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    // 清理函数
    return () => observer.disconnect()
  }, [sections])

  return activeId
}
