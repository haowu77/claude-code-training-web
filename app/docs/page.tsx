import ClientPage from './ClientPage'
import MarkdownContent from '@/components/MarkdownContent'
import { getAllContent, extractTableOfContents } from '@/lib/content'
import { extractHeadings } from '@/lib/markdown'

/**
 * 文档页面 - 单页滚动布局
 * 显示所有培训内容
 *
 * 这是服务端组件，负责读取内容并传递给客户端组件
 */
export default function DocsPage() {
  // 获取所有 Markdown 内容
  const allContent = getAllContent()

  // 提取目录结构（H1, H2）
  const sections = extractTableOfContents(allContent)

  // 提取标题列表（H2, H3）用于右侧 TOC
  const headings = extractHeadings(allContent)

  return (
    <ClientPage
      allContent={allContent}
      sections={sections}
      headings={headings}
    >
      <MarkdownContent content={allContent} />
    </ClientPage>
  )
}
