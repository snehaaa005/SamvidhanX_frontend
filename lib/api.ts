export type ApiErrorCode = 'quota' | 'server' | 'network' | 'unknown'

export class ApiError extends Error {
  code: ApiErrorCode
  constructor(code: ApiErrorCode, message: string) {
    super(message)
    this.code = code
    this.name = 'ApiError'
  }
}

const MESSAGES: Record<ApiErrorCode, string> = {
  quota: 'Daily AI quota exceeded. Please try again later.',
  server: 'Something went wrong while retrieving constitutional information.',
  network: 'Unable to connect to SamvidhanX server.',
  unknown: 'Something went wrong while retrieving constitutional information.',
}

/**
 * Sends a constitutional question to the SamvidhanX backend (via the local
 * proxy route) and returns only the `answer` string.
 */
export async function askQuestion(
  question: string,
  signal?: AbortSignal,
): Promise<string> {
  let res: Response
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal,
    })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err
    throw new ApiError('network', MESSAGES.network)
  }

  if (res.status === 429) throw new ApiError('quota', MESSAGES.quota)
  if (res.status === 502 || res.status === 504) {
    throw new ApiError('network', MESSAGES.network)
  }
  if (res.status >= 500) throw new ApiError('server', MESSAGES.server)
  if (!res.ok) throw new ApiError('unknown', MESSAGES.unknown)

  let data: { answer?: string }
  try {
    data = await res.json()
  } catch {
    throw new ApiError('server', MESSAGES.server)
  }

  return data.answer ?? ''
}
