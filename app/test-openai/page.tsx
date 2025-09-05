'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

type GenerateResult = {
  success: boolean
  summary: string
  audioBase64: string
  audioSize: number
} | {
  error: string
}

export default function TestOpenAI() {
  const [title, setTitle] = useState('')
  const [abstract, setAbstract] = useState('')
  const [result, setResult] = useState<GenerateResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperTitle: title,
          paperAbstract: abstract
        })
      })
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test OpenAI Integration</h1>
        
        <div className="space-y-4 mb-8">
          <Input
            placeholder="Paper title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-800 text-white"
          />
          
          <Textarea
            placeholder="Paper abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            className="bg-slate-800 text-white h-32"
          />
          
          <Button 
            onClick={handleGenerate}
            disabled={loading || !title || !abstract}
            className="bg-violet-600 hover:bg-violet-700"
          >
            {loading ? 'Generating...' : 'Generate Summary & Audio'}
          </Button>
        </div>

        {result && 'success' in result && result.success && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Generated Summary:</h2>
              <div className="bg-slate-800 p-4 rounded-lg">
                {result.summary}
              </div>
            </div>
            
            {result.audioBase64 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Generated Audio:</h2>
                <audio 
                  controls 
                  src={`data:audio/mp3;base64,${result.audioBase64}`}
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}

        {result && 'error' in result && (
          <div className="bg-red-900 p-4 rounded-lg">
            <p className="text-red-200">Error: {result.error}</p>
          </div>
        )}
      </div>
    </div>
  )
}