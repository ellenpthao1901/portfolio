import CaseStudyLayout from './CaseStudyLayout'

const META = [
  { label: 'Timeline', value: '2026' },
  { label: 'Role', value: 'UX Researcher' },
  { label: 'Type', value: 'Capstone' },
  { label: 'Client', value: 'Kitsap Transit' },
]

export default function Kitsap() {
  return (
    <CaseStudyLayout title="Kitsap Transit | Mix-method Research" meta={META}>
      <section className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Overview</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Mixed-method research to understand transit barriers for Kitsap county residents.
        </p>
      </section>

      <section className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Discovery</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Stakeholder interviews and survey distribution findings.
        </p>
      </section>

      <section className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Define</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Key barriers, personas, and ethical considerations.
        </p>
      </section>

      <section className="px-6 py-16" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Next Steps</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          How Might We questions and recommended next steps.
        </p>
      </section>
    </CaseStudyLayout>
  )
}
