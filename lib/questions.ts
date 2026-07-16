export interface SuggestedQuestion {
  icon: string
  text: string
}

/** Pool of constitutional prompts. A random subset is shown each new chat. */
export const QUESTION_POOL: SuggestedQuestion[] = [
  { icon: 'BookText', text: 'What is Article 21?' },
  { icon: 'Scale', text: 'Explain Fundamental Rights' },
  { icon: 'ScrollText', text: 'Explain Article 370' },
  {
    icon: 'Landmark',
    text: 'Difference between Lok Sabha and Rajya Sabha',
  },
  { icon: 'Gavel', text: 'Explain Judicial Review' },
  { icon: 'BookOpen', text: 'What are Fundamental Duties?' },
  { icon: 'TriangleAlert', text: 'Explain Emergency Provisions' },
  { icon: 'BookMarked', text: 'What are Directive Principles?' },
  { icon: 'Vote', text: 'How are elections conducted in India?' },
  { icon: 'UserCheck', text: 'What are the rules for Indian citizenship?' },
  { icon: 'FileText', text: 'What is the Preamble of the Constitution?' },
  { icon: 'Building2', text: 'What are the powers of the President?' },
  { icon: 'ShieldCheck', text: 'Explain the Right to Equality' },
  { icon: 'Layers', text: 'What are the Schedules of the Constitution?' },
  { icon: 'GitBranch', text: 'How are constitutional amendments made?' },
  { icon: 'Users', text: 'What is the role of the Supreme Court?' },
]

/** Returns `count` distinct random questions from the pool. */
export function getRandomQuestions(count = 6): SuggestedQuestion[] {
  const shuffled = [...QUESTION_POOL]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}
