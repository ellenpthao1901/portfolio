const DESIGN_TOOLS = [
  'Figma',
  'Sketch',
  'Blender',
  'Spline',
  'Adobe Illustrator',
  'Adobe After Effects',
  'Adobe Express',
]
const UX_SKILLS = [
  'User-Centered Design',
  'Product Design',
  'User Research',
  'Design Systems',
  'Information Architecture',
  'User Testing',
  'Prototyping',
  'Branding',
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section
        className="
          grid grid-cols-1 md:grid-cols-2 items-center
          gap-[clamp(40px,6vw,96px)]
          py-24 px-[10%] border-b border-line
          max-md:py-16 max-md:px-[5vw]
        "
      >
        <div>
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6">
            ABOUT
          </p>
          <h2 className="text-[clamp(28px,3.5vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-[#ebebeb]">
            Why can't we prioritize inclusive design instead of an exclusive one
            that empowers everyone?
          </h2>
        </div>
        <div className="rounded-3xl overflow-hidden bg-line-soft aspect-[4/5]">
          <img
            src="https://images.squarespace-cdn.com/content/v1/6721561e2010432092388353/2e1622f2-9c2e-425f-826b-adaba6d3254f/IMG_2613.png"
            alt="Portrait of Thao Nguyen"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* My Story */}
      <section
        className="
          grid grid-cols-1 md:grid-cols-[minmax(200px,30%)_1fr]
          gap-[clamp(40px,6vw,96px)]
          py-24 px-[10%] border-b border-line
          max-md:py-16 max-md:px-[5vw]
        "
      >
        <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] pt-1.5">
          MY STORY
        </p>
        <div className="flex flex-col gap-6 text-quiet text-[20.6px] leading-[1.6] tracking-[-0.44px]">
          <p>
            I'm an Informatics major at the University of Washington, focusing on
            Human-Computer Interaction. I immigrated from Vietnam to Seattle to
            pursue design in a tech-forward city — and the contrast between the
            two places shaped how I think about design.
          </p>
          <p>
            In Seattle, I noticed accessibility features everywhere: volume
            buttons, tactile paving, automatic doors. Back in Vietnam, many
            educational websites lack even basic audio components. That gap
            became my motivation.
          </p>
          <p>
            I want to become a Product Designer focused on fostering diversity
            and equity — ensuring my designs meet the needs of all users and
            create a world where no one is left behind.
          </p>
        </div>
      </section>

      {/* Skills + Contact */}
      <section
        className="
          grid grid-cols-1 md:grid-cols-3
          gap-[clamp(32px,5vw,72px)]
          py-24 px-[10%] border-b border-line
          max-md:py-16 max-md:px-[5vw]
        "
        aria-label="Skills and contact"
      >
        <SkillGroup label="DESIGN TOOLS" items={DESIGN_TOOLS} />
        <SkillGroup label="UX SKILLS" items={UX_SKILLS} />
        <div>
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6">
            CONTACT
          </p>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            <li>
              <a
                href="mailto:ellenpthao19012004@gmail.com"
                className="text-quiet text-base leading-normal tracking-[-0.28px] transition-colors duration-150 hover:text-[#ebebeb]"
              >
                ellenpthao19012004@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/thaongx/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-quiet text-base leading-normal tracking-[-0.28px] transition-colors duration-150 hover:text-[#ebebeb]"
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
    <div>
      <p className="text-[11px] tracking-[0.08em] uppercase text-[#999] mb-6">
        {label}
      </p>
      <ul className="flex flex-col gap-3 list-none p-0 m-0">
        {items.map(item => (
          <li
            key={item}
            className="text-[#ebebeb] text-base leading-normal tracking-[-0.28px]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
