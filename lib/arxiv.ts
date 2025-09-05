import { XMLParser } from 'fast-xml-parser'

export interface ArxivPaper {
  id: string
  title: string
  summary: string
  authors: string[]
  published: string
  updated: string
  categories: string[]
  pdfUrl: string
  arxivUrl: string
}

export class ArxivClient {
  private baseUrl = 'http://export.arxiv.org/api/query'
  private xmlParser: XMLParser

  constructor() {
    this.xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_'
    })
  }

  async searchPapers(
    categories: string[] = ['cs.AI', 'cs.LG', 'quant-ph'], 
    maxResults: number = 10,
    sortBy: 'relevance' | 'lastUpdatedDate' | 'submittedDate' = 'lastUpdatedDate'
  ): Promise<ArxivPaper[]> {
    
    const categoryQuery = categories.map(cat => `cat:${cat}`).join(' OR ')
    const searchQuery = `search_query=${encodeURIComponent(categoryQuery)}&start=0&max_results=${maxResults}&sortBy=${sortBy}&sortOrder=descending`
    
    const url = `${this.baseUrl}?${searchQuery}`
    
    try {
      const response = await fetch(url)
      const xmlText = await response.text()
      
      return this.parseXmlResponse(xmlText)
    } catch (error) {
      console.error('ArXiv API error:', error)
      throw new Error('Failed to fetch papers from arXiv')
    }
  }

  private parseXmlResponse(xmlText: string): ArxivPaper[] {
    const parsed = this.xmlParser.parse(xmlText)
    const feed = parsed.feed
    
    if (!feed || !feed.entry) {
      return []
    }
    
    // Handle both single entry and array of entries
    const entries = Array.isArray(feed.entry) ? feed.entry : [feed.entry]
    
    return entries.map((entry: any) => {
      const id = entry.id?.replace('http://arxiv.org/abs/', '') || ''
      const title = entry.title?.replace(/\s+/g, ' ').trim() || ''
      const summary = entry.summary?.replace(/\s+/g, ' ').trim() || ''
      const published = entry.published || ''
      const updated = entry.updated || ''
      
      // Extract authors
      const authors: string[] = []
      if (entry.author) {
        const authorList = Array.isArray(entry.author) ? entry.author : [entry.author]
        authorList.forEach((author: any) => {
          if (author.name) authors.push(author.name)
        })
      }
      
      // Extract categories
      const categories: string[] = []
      if (entry.category) {
        const categoryList = Array.isArray(entry.category) ? entry.category : [entry.category]
        categoryList.forEach((cat: any) => {
          if (cat['@_term']) categories.push(cat['@_term'])
        })
      }
      
      // Extract PDF URL
      let pdfUrl = ''
      if (entry.link) {
        const links = Array.isArray(entry.link) ? entry.link : [entry.link]
        const pdfLink = links.find((link: any) => link['@_type'] === 'application/pdf')
        if (pdfLink) pdfUrl = pdfLink['@_href'] || ''
      }
      
      return {
        id,
        title,
        summary,
        authors,
        published,
        updated,
        categories,
        pdfUrl,
        arxivUrl: `https://arxiv.org/abs/${id}`
      }
    })
  }
}