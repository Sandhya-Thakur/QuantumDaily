import { NextRequest } from 'next/server'
import { ArxivClient } from '@/lib/arxiv'
import { db } from '@/lib/db'
import { papersTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    console.log('Fetching papers from arXiv...')
    
    const { maxResults = 5 } = await req.json()
    
    const arxiv = new ArxivClient()
    const papers = await arxiv.searchPapers(['cs.AI', 'cs.LG', 'quant-ph'], maxResults)
    
    console.log(`Found ${papers.length} papers`)
    
    const storedPapers = []
    
    for (const paper of papers) {
      // Check if paper already exists
      const existing = await db.select().from(papersTable).where(eq(papersTable.arxivId, paper.id))
      
      if (existing.length === 0) {
        // Store new paper
        const result = await db.insert(papersTable).values({
          arxivId: paper.id,
          title: paper.title,
          summary: paper.summary,
          authors: JSON.stringify(paper.authors),
          categories: JSON.stringify(paper.categories),
          publishedDate: new Date(paper.published),
          pdfUrl: paper.pdfUrl,
          arxivUrl: paper.arxivUrl,
        }).returning()
        
        storedPapers.push(result[0])
        console.log('Stored new paper:', paper.title.substring(0, 50) + '...')
      }
    }
    
    return Response.json({
      success: true,
      totalFetched: papers.length,
      newPapers: storedPapers.length,
      papers: storedPapers
    })
    
  } catch (error) {
    console.error('Error fetching papers:', error)
    return Response.json({ error: 'Failed to fetch papers' }, { status: 500 })
  }
}