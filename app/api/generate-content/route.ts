import { NextRequest } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { paperTitle, paperAbstract } = await req.json()
    
    console.log('Generating summary for:', paperTitle)
    
    // Generate plain English summary
    const summaryResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are an expert science communicator. Convert complex academic research into engaging, plain English explanations that anyone can understand. Focus on practical implications and why this research matters."
      }, {
        role: "user",
        content: `Please explain this research paper in plain English:
        
Title: ${paperTitle}
Abstract: ${paperAbstract}

Make it engaging and accessible, focusing on:
1. What problem does this solve?
2. How does it work in simple terms?
3. Why should people care?
4. What are the real-world implications?

Keep it conversational and under 500 words.`
      }],
      max_tokens: 800,
      temperature: 0.7,
    })

    const summary = summaryResponse.choices[0].message.content

    // Generate audio from summary
    console.log('Generating audio...')
    const audioResponse = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: summary || '',
      speed: 1.0,
    })

    // Convert audio to base64 for storage
    const audioBuffer = Buffer.from(await audioResponse.arrayBuffer())
    const audioBase64 = audioBuffer.toString('base64')

    return Response.json({
      success: true,
      summary,
      audioBase64,
      audioSize: audioBuffer.length
    })

  } catch (error) {
    console.error('OpenAI API error:', error)
    return Response.json({ error: 'Failed to generate content' }, { status: 500 })
  }
}