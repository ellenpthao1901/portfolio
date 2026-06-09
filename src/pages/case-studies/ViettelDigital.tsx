import CaseStudyLayout from './CaseStudyLayout'

const META = [
  { label: 'Timeline', value: '2024' },
  { label: 'Role', value: 'UX Design Intern' },
  { label: 'Org', value: 'Viettel Digital' },
  { label: 'Type', value: 'B2C Mobile App' },
]

const TOC = [
  { id: 'discovery', label: 'Discovery' },
  { id: 'define', label: 'Define' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'testing', label: 'Testing' },
  { id: 'final', label: 'Final Design' },
]

export default function ViettelDigital() {
  return (
    <CaseStudyLayout title="Viettel Digital | B2C Car Renting Mobile App" meta={META} toc={TOC}>
      <section id="discovery" className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Discovery</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Research phase content goes here — stakeholder quotes, market analysis, competitive review.
        </p>
      </section>

      <section id="define" className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Define</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Pain points, user needs, and problem framing.
        </p>
      </section>

      <section id="prototype" className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Prototype</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          User flows and wireframes.
        </p>
      </section>

      <section id="testing" className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Testing</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Usability testing tasks and findings.
        </p>
      </section>

      <section id="final" className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Final Design</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Final screens and key takeaways.
        </p>
      </section>
    </CaseStudyLayout>
  )
}
