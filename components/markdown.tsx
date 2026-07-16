import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function Markdown({ content }: { content: string }) {
  return (
    <div className="text-[0.95rem] leading-relaxed text-card-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-5 mb-3 text-xl font-semibold tracking-tight text-foreground first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-5 mb-2.5 text-lg font-semibold tracking-tight text-foreground first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 text-base font-semibold text-foreground first:mt-0">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 leading-relaxed last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-3 ml-1 list-disc space-y-1.5 pl-4 marker:text-accent">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 ml-1 list-decimal space-y-1.5 pl-4 marker:text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-4 border-accent/60 bg-muted/60 py-1 pl-4 text-muted-foreground italic">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = /language-/.test(className ?? '')
            if (isBlock) {
              return (
                <code className="block font-mono text-[0.85rem] leading-relaxed">
                  {children}
                </code>
              )
            }
            return (
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85rem] text-foreground">
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="my-3 overflow-x-auto rounded-xl border border-border bg-muted/70 p-4 text-foreground scrollbar-thin">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-border scrollbar-thin">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/70">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-border px-3 py-2 text-left font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border px-3 py-2 align-top">
              {children}
            </td>
          ),
          hr: () => <hr className="my-4 border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
