'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { SearchIndex, SearchResult } from '@/lib/search'

/**
 * 搜索栏组件 - Simple Modern 风格
 * 实现全文搜索功能
 */

interface SearchBarProps {
  searchIndex: SearchIndex
}

export default function SearchBar({ searchIndex }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // 执行搜索
  useEffect(() => {
    if (query.trim().length > 1) {
      const searchResults = searchIndex.search(query, 8)
      setResults(searchResults)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, searchIndex])

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 跳转到搜索结果
  const handleResultClick = (headingId?: string) => {
    if (headingId) {
      const element = document.getElementById(headingId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsOpen(false)
        setQuery('')
      }
    }
  }

  return (
    <div ref={searchRef} className="no-print relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索文档..."
          className="w-full h-10 pl-11 pr-11 bg-[var(--color-bg)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all text-sm"
          aria-label="搜索文档"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="清除搜索"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 搜索结果下拉 */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-lg max-h-[480px] overflow-y-auto z-50">
          <div className="p-2">
            {results.map((result, index) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result.headingId)}
                className={`w-full text-left p-3 hover:bg-[var(--color-code-bg)] rounded-md transition-colors ${
                  index > 0 ? 'mt-1' : ''
                }`}
              >
                <div className="font-medium text-sm mb-1 text-[var(--color-text-primary)]">
                  {result.title}
                </div>
                <div className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                  {result.content}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 无搜索结果 */}
      {isOpen && query.trim().length > 1 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-lg p-8 z-50">
          <p className="text-[var(--color-text-secondary)] text-sm text-center">
            未找到相关结果
          </p>
        </div>
      )}
    </div>
  )
}
