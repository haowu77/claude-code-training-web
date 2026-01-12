import { Index } from 'flexsearch'

/**
 * 搜索引擎 - 使用 FlexSearch 实现全文搜索
 */

export interface SearchResult {
  id: string
  title: string
  content: string
  headingId?: string
}

export class SearchIndex {
  private index: Index
  private documents: Map<string, SearchResult>

  constructor() {
    this.index = new Index()
    this.documents = new Map()
  }

  /**
   * 添加文档到索引
   * @param doc 搜索结果文档
   */
  addDocument(doc: SearchResult): void {
    this.index.add(doc.id, `${doc.title} ${doc.content}`)
    this.documents.set(doc.id, doc)
  }

  /**
   * 搜索
   * @param query 搜索关键词
   * @param limit 返回结果数量限制
   * @returns 搜索结果数组
   */
  search(query: string, limit = 10): SearchResult[] {
    const results = this.index.search(query, { limit })

    return results
      .map(id => this.documents.get(String(id)))
      .filter((doc): doc is SearchResult => doc !== undefined)
  }

  /**
   * 清空索引
   */
  clear(): void {
    this.index.clear()
    this.documents.clear()
  }
}

/**
 * 从内容构建搜索索引
 * @param content Markdown 内容
 * @returns SearchIndex 实例
 */
export function buildSearchIndex(content: string): SearchIndex {
  const searchIndex = new SearchIndex()

  // 简化版本：按换行符分段，每 10 行作为一个可搜索单元
  const lines = content.split('\n')
  let docIdCounter = 0

  for (let i = 0; i < lines.length; i += 10) {
    const chunk = lines.slice(i, i + 10).join('\n').trim()
    if (chunk.length > 20) { // 只索引有意义的内容
      // 尝试提取这个块的标题
      const headingMatch = chunk.match(/^(#{1,3}) (.+)$/m)
      const title = headingMatch ? headingMatch[2].trim() : `Section ${docIdCounter + 1}`
      const headingId = headingMatch
        ? `heading-${headingMatch[2].toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '')}`
        : undefined

      searchIndex.addDocument({
        id: `doc-${docIdCounter++}`,
        title,
        content: chunk.substring(0, 200), // 只索引前 200 个字符
        headingId,
      })
    }
  }

  return searchIndex
}
