const DESIGN_TOOLS = ['Figma', 'Sketch', 'Blender', 'Spline', 'Adobe Illustrator', 'Adobe After Effects', 'Adobe Express']
const UX_SKILLS = ['User-Centered Design', 'Product Design', 'User Research', 'Design Systems', 'Information Architecture', 'User Testing', 'Prototyping', 'Branding']

export default function About() {
  return (
    <>
      {/* Hero */}
      <section
        className="grid md:grid-cols-2 gap-8 px-6 py-16 border-b"
        style={{ borderColor: 'var(--color-line)' }}
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-quiet)' }}>About</p>
          <h2
            className="text-2xl md:text-3xl font-medium tracking-tight leading-snug"
            style={{ color: 'var(--color-white)' }}
          >
            Why can't we prioritize inclusive design instead of an exclusive one that empowers everyone?
          </h2>
        </div>
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/2e1622f2-9c2e-425f-826b-adaba6d3254f/IMG_2613.png"
            alt="Portrait of Thao Nguyen"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Story */}
      <section
        className="grid md:grid-cols-[1fr_2fr] gap-8 px-6 py-16 border-b"
        style={{ borderColor: 'var(--color-line)' }}
      >
        <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-quiet)' }}>My Story</p>
        <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
          <p>
            I'm an Informatics major at the University of Washington, focusing on Human-Computer
            Interaction. I immigrated from Vietnam to Seattle to pursue design in a tech-forward
            city — and the contrast between the two places shaped how I think about design.
          </p>
          <p>
            In Seattle, I noticed accessibility features everywhere: volume buttons, tactile paving,
            automatic doors. Back in Vietnam, many educational websites lack even basic audio
            components. That gap became my motivation.
          </p>
          <p>
            I want to become a Product Designer focused on fostering diversity and equity —
            ensuring my designs meet the needs of all users and create a world where no one is
            left behind.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section
        className="grid md:grid-cols-3 gap-10 px-6 py-16 border-b"
        style={{ borderColor: 'var(--color-line)' }}
        aria-label="Skills"
      >
        <SkillGroup label="Design Tools" items={DESIGN_TOOLS} />
        <SkillGroup label="UX Skills" items={UX_SKILLS} />
        <div className="flex flex-col gap-4">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-quiet)' }}>Contact</p>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
            <li>
              <a
                href="mailto:ellenpthao19012004@gmail.com"
                className="hover:opacity-60 transition-opacity"
                style={{ color: 'var(--color-white)' }}
              >
                ellenpthao19012004@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/thaongx/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                style={{ color: 'var(--color-white)' }}
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-quiet)' }}>{label}</p>
      <ul className="flex flex-col gap-2 text-sm" style={{ color: 'var(--color-text)' }}>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )
}
