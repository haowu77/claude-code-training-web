import { marked } from 'marked'
import { generateHeadingId } from '@/lib/utils/markdown'

/**
 * Markdown 内容渲染器
 * 使用 marked 将 Markdown 转换为 HTML
 * 这是一个服务端组件
 */

interface MarkdownContentProps {
  content: string
}

// 配置 marked 以添加 ID 到标题
marked.use({
  renderer: {
    heading({ text, depth }: { text: string; depth: number }) {
      const id = generateHeadingId(text)
      return `<h${depth} id="${id}">${text}</h${depth}>`
    },
  },
})

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const html = marked(content) as string

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
