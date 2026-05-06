import { streamText, convertToModelMessages } from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: 'openai/gpt-5.5',
      system:
        'You are Koryx AI, a helpful assistant for a premium web development studio. Be concise, clear, professional, and helpful.',
      messages: await convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)

    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
