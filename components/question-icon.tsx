import {
  BookText,
  Scale,
  ScrollText,
  Landmark,
  Gavel,
  BookOpen,
  TriangleAlert,
  BookMarked,
  Vote,
  UserCheck,
  FileText,
  Building2,
  ShieldCheck,
  Layers,
  GitBranch,
  Users,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  BookText,
  Scale,
  ScrollText,
  Landmark,
  Gavel,
  BookOpen,
  TriangleAlert,
  BookMarked,
  Vote,
  UserCheck,
  FileText,
  Building2,
  ShieldCheck,
  Layers,
  GitBranch,
  Users,
}

export function QuestionIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = ICONS[name] ?? BookText
  return <Icon className={className} aria-hidden="true" />
}
