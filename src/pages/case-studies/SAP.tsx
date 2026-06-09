import CaseStudyLayout from './CaseStudyLayout'

const META = [
  { label: 'Timeline', value: 'Summer 2025' },
  { label: 'Role', value: 'Product Design Intern' },
  { label: 'Org', value: 'SAP' },
  { label: 'Team', value: 'Analytics Cloud' },
]

export default function SAP() {
  return (
    <CaseStudyLayout title="SAP | SaaS Analytics Dashboard" meta={META}>
      {/* Mission */}
      <section
        className="px-6 py-16 border-b"
        style={{ borderColor: 'var(--color-line)' }}
      >
        <p
          className="max-w-2xl text-lg leading-relaxed"
          style={{ color: 'var(--color-text)' }}
        >
          Redesigning the analytics dashboard experience to help business users make faster,
          more confident decisions with their data.
        </p>
      </section>

      {/* Confidential notice */}
      <section
        className="px-6 py-16 border-b"
        style={{ borderColor: 'var(--color-line)' }}
      >
        <div
          className="max-w-xl rounded-xl p-8 border flex flex-col gap-4"
          style={{ borderColor: 'var(--color-line)', background: 'var(--color-line-soft)' }}
        >
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-quiet)' }}>
            Confidential Work
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
            This project is under NDA. Reach out directly to learn more about the work.
          </p>
          <a
            href="mailto:ellenpthao19012004@gmail.com"
            className="text-sm font-medium hover:opacity-60 transition-opacity"
            style={{ color: 'var(--color-white)' }}
          >
            Send a message →
          </a>
        </div>
      </section>
    </CaseStudyLayout>
  )
}
