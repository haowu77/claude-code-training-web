'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { ContentSection } from '@/lib/content'
import { useActiveSection } from '@/hooks/useActiveSection'
import { getAncestorIds } from '@/lib/navigation'

/**
 * 侧边栏组件（左侧目录导航）- 支持 4 级导航
 * 显示文档的整体结构，支持折叠/展开，自动高亮当前章节
 */

interface SidebarProps {
  sections: ContentSection[]
}

interface NavItemProps {
  section: ContentSection
  level: number
  activeId: string
  expandedSections: Set<string>
  onToggle: (id: string) => void
  onNavigate: (id: string) => void
}

/**
 * 递归导航项组件 - 支持无限层级嵌套
 */
function NavItem({ section, level, activeId, expandedSections, onToggle, onNavigate }: NavItemProps) {
  const hasChildren = section.children && section.children.length > 0
  const isExpanded = expandedSections.has(section.id)
  const isActive = activeId === section.id

  // 根据层级计算样式（使用内联样式，避免 Tailwind 动态类名问题）
  const indentPx = level * 12 // 每层 12px 缩进
  const fontSizes = ['0.875rem', '0.8125rem', '0.75rem', '0.6875rem'] // 14px, 13px, 12px, 11px
  const fontSize = fontSizes[level] || '0.75rem'

  return (
    <li>
      <div className="flex items-start">
        {hasChildren && (
          <button
            onClick={() => onToggle(section.id)}
            className="mt-2 p-0.5 hover:bg-[var(--color-code-bg)] rounded transition-colors flex-shrink-0"
            aria-label={isExpanded ? '折叠' : '展开'}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" />
            ) : (
              <ChevronRight className="w-4 h-4 text-[var(--color-text-secondary)]" />
            )}
          </button>
        )}
        <button
          onClick={() => onNavigate(section.id)}
          style={{
            marginLeft: hasChildren ? `${indentPx}px` : `${indentPx + 20}px`,
            fontSize: fontSize
          }}
          className={`flex-1 text-left py-2 px-3 rounded-md transition-all ${
            isActive
              ? 'bg-[var(--color-primary)] text-white font-semibold shadow-sm'
              : 'text-[var(--color-text-primary)] hover:bg-[var(--color-code-bg)] hover:text-[var(--color-primary)]'
          }`}
        >
          {section.title}
        </button>
      </div>

      {/* 递归渲染子章节 */}
      {hasChildren && isExpanded && (
        <ul className="ml-3 mt-1 space-y-0.5 border-l-2 border-[var(--color-divider)] pl-3">
          {section.children!.map((child) => (
            <NavItem
              key={child.id}
              section={child}
              level={level + 1}
              activeId={activeId}
              expandedSections={expandedSections}
              onToggle={onToggle}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function Sidebar({ sections }: SidebarProps) {
  // 追踪当前活跃章节
  const activeId = useActiveSection(sections)

  // 默认展开所有 H1 和 H2，折叠 H3/H4
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const expanded = new Set<string>()
    sections.forEach((h1) => {
      expanded.add(h1.id)
      if (h1.children) {
        h1.children.forEach((h2) => {
          expanded.add(h2.id)
          // H3/H4 默认折叠
        })
      }
    })
    return expanded
  })

  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // 当活跃章节改变时，自动展开其所有祖先
  useEffect(() => {
    if (activeId) {
      const ancestors = getAncestorIds(sections, activeId)
      setExpandedSections((prev) => {
        const next = new Set(prev)
        ancestors.forEach((id) => next.add(id))
        return next
      })
    }
  }, [activeId, sections])

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleNavigation = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileOpen(false)
    }
  }

  const SidebarContent = () => (
    <div className="h-full overflow-y-auto py-8 px-6">
      <h2 className="text-xs font-semibold uppercase tracking-wider mb-6 text-[var(--color-text-secondary)]">
        目录
      </h2>
      <nav>
        <ul className="space-y-1">
          {sections.map((section) => (
            <NavItem
              key={section.id}
              section={section}
              level={0}
              activeId={activeId}
              expandedSections={expandedSections}
              onToggle={toggleSection}
              onNavigate={handleNavigation}
            />
          ))}
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="no-print lg:hidden fixed bottom-6 left-6 z-50 bg-[var(--color-primary)] text-white p-4 rounded-full shadow-lg hover:bg-[var(--color-primary-hover)] transition-colors"
        aria-label="打开菜单"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* 桌面端侧边栏 - 固定宽度 320px（增加宽度避免截断） */}
      <aside className="no-print hidden lg:block w-[320px] flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden bg-[var(--color-bg)] border-r border-[var(--color-border)]">
        <SidebarContent />
      </aside>

      {/* 移动端侧边栏 */}
      {isMobileOpen && (
        <>
          {/* 遮罩层 */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* 侧边栏 */}
          <aside className="lg:hidden fixed inset-y-0 left-0 w-80 z-50 bg-[var(--color-card)] overflow-hidden shadow-2xl">
            <div className="h-full">
              <SidebarContent />
            </div>
          </aside>
        </>
      )}
    </>
  )
}
