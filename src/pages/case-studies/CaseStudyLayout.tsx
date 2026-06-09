import { type ReactNode } from 'react'
import TableOfContents from '../../components/TableOfContents'

interface Meta {
  label: string
  value: string
}

interface TocItem {
  id: string
  label: string
}

interface CaseStudyLayoutProps {
  title: string
  meta: Meta[]
  toc?: TocItem[]
  children: ReactNode
}

export default function CaseStudyLayout({ title, meta, toc, children }: CaseStudyLayoutProps) {
  return (
    <>
      {toc && <TableOfContents items={toc} />}

      <header
        className="px-6 pt-10 pb-10 border-b"
        style={{ borderColor: 'var(--color-line)' }}
      >
        <h1
          className="text-3xl md:text-5xl font-medium tracking-tight mb-8"
          style={{ color: 'var(--color-white)' }}
        >
          {title}
        </h1>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm"
          style={{ color: 'var(--color-quiet)' }}
        >
          {meta.map(m => (
            <div key={m.label} className="flex flex-col gap-1">
              <span className="text-xs tracking-widest uppercase">{m.label}</span>
              <span style={{ color: 'var(--color-text)' }}>{m.value}</span>
            </div>
          ))}
        </div>
      </header>

      <main>{children}</main>
    </>
  )
}
