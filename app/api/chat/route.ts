import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: 'openai/gpt-5.5',
    system:
      'You are Koryx AI, a helpful assistant for a premium web development studio. Be concise, clear, professional, and helpful.',
    messages,
  })

  return result.toUIMessageStreamResponse()
}
