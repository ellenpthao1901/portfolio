import CaseStudyLayout from './CaseStudyLayout'

const META = [
  { label: 'Timeline', value: '2025' },
  { label: 'Role', value: 'Product Designer' },
  { label: 'Type', value: 'Project' },
  { label: 'Platform', value: 'Web App' },
]

const TOC = [
  { id: 'discovery', label: 'Discovery' },
  { id: 'define', label: 'Define' },
  { id: 'design', label: 'Design' },
  { id: 'validate', label: 'Validate' },
  { id: 'final', label: 'Final Design' },
]

export default function Pods() {
  return (
    <CaseStudyLayout title="AI to transform any documents into personalized podcasts" meta={META} toc={TOC}>
      <section id="discovery" className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Discovery</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Survey findings, feature priorities, and competitive analysis.
        </p>
      </section>

      <section id="define" className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Define</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Personas, unique selling points, and product vision.
        </p>
      </section>

      <section id="design" className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Design</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          User flows, information architecture, and core screens.
        </p>
      </section>

      <section id="validate" className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Validate</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Feedback and design iterations.
        </p>
      </section>

      <section id="final" className="px-6 py-16 border-b" style={{ borderColor: 'var(--color-line)' }}>
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--color-quiet)' }}>Final Design</p>
        <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          Final screens gallery and key takeaways.
        </p>
      </section>
    </CaseStudyLayout>
  )
}
