'use client'

import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { useTheme } from 'next-themes'
import { Copy, Check } from 'lucide-react'

/**
 * 增强的代码块组件 - 支持复制按钮和语言标签
 * 使用 Shiki 进行语法高亮
 */

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  filename?: string // 可选的文件名（从 markdown 中提取）
}

export default function CodeBlock({
  code,
  language = 'text',
  className = '',
  filename
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: theme === 'dark' ? 'github-dark' : 'github-light',
        })
        setHtml(highlighted)
      } catch (error) {
        console.error('Failed to highlight code:', error)
        // 如果高亮失败，直接显示原始代码
        setHtml(`<pre><code>${code}</code></pre>`)
      } finally {
        setLoading(false)
      }
    }

    highlightCode()
  }, [code, language, theme])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  if (loading) {
    return (
      <div className={`bg-[var(--color-code-bg)] rounded-lg p-6 animate-pulse ${className}`}>
        <div className="h-24 bg-[var(--color-border)] rounded" />
      </div>
    )
  }

  return (
    <div className={`code-block-wrapper relative group my-6 ${className}`}>
      {/* 代码块头部：语言标签 + 文件名 + 复制按钮 */}
      <div className="flex items-center justify-between bg-[var(--color-code-bg)] border border-[var(--color-border)] border-b-0 rounded-t-lg px-4 py-2">
        <div className="flex items-center gap-3">
          {/* 语言标签徽章 */}
          <span className="text-[0.6875rem] font-mono font-bold uppercase px-2 py-1 rounded bg-[var(--color-primary)] text-white tracking-wider">
            {language}
          </span>

          {/* 可选的文件名 */}
          {filename && (
            <span className="text-xs text-[var(--color-text-secondary)] font-mono">
              {filename}
            </span>
          )}
        </div>

        {/* 复制按钮 - 悬停时显示 */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-[var(--color-card)] border border-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="复制代码"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>

      {/* 代码内容 */}
      <div
        className="code-block overflow-x-auto border border-[var(--color-border)] rounded-b-lg [&>pre]:!my-0 [&>pre]:!rounded-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
