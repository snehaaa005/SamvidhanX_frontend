import { NextResponse } from 'next/server'

const BACKEND_URL = 'https://samvidhanx-backend.onrender.com'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: Request) {
  let question: string | undefined

  try {
    const body = await request.json()
    question = typeof body?.question === 'string' ? body.question : undefined
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  if (!question || !question.trim()) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  try {
    const upstream = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      // The Render backend can be slow to cold-start; give it room.
      signal: AbortSignal.timeout(55000),
    })

    if (!upstream.ok) {
      // Bubble the upstream status up so the client can show the right message.
      return NextResponse.json(
        { error: 'upstream', status: upstream.status },
        { status: upstream.status },
      )
    }

    const data = await upstream.json()
    return NextResponse.json({
      question: data?.question ?? question,
      answer: typeof data?.answer === 'string' ? data.answer : '',
    })
  } catch {
    // Network failure / timeout reaching the backend.
    return NextResponse.json({ error: 'network' }, { status: 502 })
  }
}
