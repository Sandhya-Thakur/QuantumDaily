'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Paper = {
  id: number
  arxivId: string
  title: string
  summary: string
  authors: string
  categories: string
  publishedDate: string
  pdfUrl: string | null
  arxivUrl: string | null
  processed: boolean
  createdAt: string
}

type FetchResult = {
  success: boolean
  totalFetched: number
  newPapers: number
  papers: Paper[]
} | {
  error: string
}

export default function TestArxiv() {
  const [papers, setPapers] = useState<FetchResult | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchPapers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/fetch-papers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxResults: 5 })
      })
      
      const data = await response.json()
      setPapers(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test arXiv Integration</h1>
        
        <Button 
          onClick={fetchPapers}
          disabled={loading}
          className="bg-violet-600 hover:bg-violet-700 mb-8"
        >
          {loading ? 'Fetching Papers...' : 'Fetch Latest AI/Quantum Papers'}
        </Button>

        {papers && 'success' in papers && papers.success && (
          <div className="space-y-6">
            <div className="bg-slate-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Results:</h2>
              <p>Total papers fetched: {papers.totalFetched}</p>
              <p>New papers stored: {papers.newPapers}</p>
            </div>
            
          {papers.papers?.map((paper: Paper, index: number) => (
  <div key={index} className="bg-slate-800 p-6 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">{paper.title}</h3>
    <div className="flex items-center gap-4 mb-2 text-sm text-slate-300">
      <span>ArXiv ID: {paper.arxivId}</span>
      <span>Published: {new Date(paper.publishedDate).toLocaleDateString()}</span>
    </div>
    <p className="text-slate-400 text-sm line-clamp-3 mb-3">{paper.summary}</p>
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {JSON.parse(paper.categories).slice(0, 3).map((cat: string, i: number) => (
          <span key={i} className="text-xs bg-violet-600 px-2 py-1 rounded">
            {cat}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <a 
          href={paper.arxivUrl || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300"
        >
          View on arXiv
        </a>
        {paper.pdfUrl && (
          <a 
            href={paper.pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-green-400 hover:text-green-300"
          >
            Download PDF
          </a>
        )}
      </div>
    </div>
  </div>
))}
          </div>
        )}

        {papers && 'error' in papers && (
          <div className="bg-red-900 p-4 rounded-lg">
            <p className="text-red-200">Error: {papers.error}</p>
          </div>
        )}
      </div>
    </div>
  )
}