import { Scale } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  iconClassName,
}: {
  className?: string
  iconClassName?: string
}) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-sm',
        className,
      )}
    >
      <Scale className={cn('size-5', iconClassName)} aria-hidden="true" />
    </span>
  )
}
