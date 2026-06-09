// Built from Figma design (file S4wa2P3oA7OANLvxjcglAy, node 1:2)
// All images live in /public/assets/sap/

import TableOfContents from '../../components/TableOfContents'

const TOC = [
  { id: 'section-mission', label: 'Mission' },
  { id: 'section-projects', label: 'Projects' },
  { id: 'section-confidential', label: 'Confidential' },
  { id: 'section-testimonial', label: 'Testimonial' },
  { id: 'section-photos', label: 'Memories' },
]

const META = [
  { label: 'Timeline', value: 'September, 2025 — June, 2026' },
  { label: 'Role', value: 'UX Specialist Intern' },
  { label: 'Org', value: 'Digital Platform' },
  { label: 'With', value: 'Product Manager\nSoftware Engineer\nUX Researcher' },
]

const PROJECTS = [
  {
    eyebrow: 'PROJECT 01',
    title: '✨ AI Product Health Scoring & Content Optimization',
    body:
      'Designed an AI-powered workflow that scores product health, identifies content gaps, and recommends actions to improve product quality and commerce readiness.',
    tags: ['Commerce', 'B2B SaaS', 'AI Workflow'],
    image: '/assets/sap/project-01.png',
    blurred: true,
    imageOnRight: true,
  },
  {
    eyebrow: 'PROJECT 02',
    title: '📈 AI Chatbot for User Inquiries',
    body:
      'Designed an AI chatbot that helps users navigate product content issues and answer workflow questions.',
    tags: ['AI Chatbot', 'User Support'],
    image: null, // 3 phone mockups
    blurred: true,
    imageOnRight: true,
    isPhones: true,
  },
  {
    eyebrow: 'PROJECT 03',
    title: '📈 Search Engine Optimization & AI Bots',
    body:
      'Improved AI bot handling and search engine optimization across SAP.com by analyzing bot traffic, site speed, and performance data to enhance crawl visibility and accelerate the detection of issues over all user experience.',
    tags: ['SEO', 'Site Speed Performance'],
    image: '/assets/sap/project-03.png',
    blurred: true,
    imageOnRight: true,
  },
  {
    eyebrow: 'PROJECT 04',
    title: '📰 SharePoint Redesign for Team News & Updates',
    body:
      'Redesigned content structure, information hierarchy, and communication flow to centralize team news and key accomplishments across SAP.com Digital Platforms.',
    tags: ['Internal Tools', 'Content Strategy', 'Information Architecture'],
    image: '/assets/sap/project-04.png',
    blurred: true,
    imageOnRight: true,
  },
]

const HALLOWEEN_PHOTOS = [
  { src: '/assets/sap/halloween-1.png', rotate: '4.58deg', top: 0, left: '0%' },
  { src: '/assets/sap/halloween-2.png', rotate: '-10.11deg', top: 24, left: '14%' },
  { src: '/assets/sap/halloween-3.png', rotate: '7.99deg', top: 8, left: '30%' },
  { src: '/assets/sap/halloween-4.png', rotate: '-2.67deg', top: 16, left: '48%' },
  { src: '/assets/sap/halloween-5.png', rotate: '4.47deg', top: 56, left: '60%' },
  { src: '/assets/sap/halloween-6.png', rotate: '11.41deg', top: 48, left: '76%' },
]

// Team avatars positioned roughly like the Figma cluster
const TEAM_AVATARS = [
  '/assets/sap/team-1.png',
  '/assets/sap/team-2.png',
  '/assets/sap/team-3.png',
  '/assets/sap/team-4.png',
  '/assets/sap/team-5.png',
  '/assets/sap/team-6.png',
  '/assets/sap/team-7.png',
  '/assets/sap/team-8.png',
  '/assets/sap/team-9.png',
  '/assets/sap/team-10.png',
  '/assets/sap/team-11.png',
  '/assets/sap/team-12.png',
  '/assets/sap/team-13.png',
]

export default function SAP() {
  return (
    <main className="text-[#ebebeb]">
      <TableOfContents items={TOC} />

      {/* Project header */}
      <section className="px-[10%] pt-24 pb-10 border-b border-[#252525] max-md:px-[5vw] max-md:pt-16">
        <h1 className="text-[clamp(48px,8vw,120px)] font-medium tracking-[-0.04em] leading-[0.95] text-[#ebebeb]">
          SAP
        </h1>
      </section>

      {/* Meta strip */}
      <section className="px-[10%] py-10 border-b border-[#252525] max-md:px-[5vw]">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
          {META.map(m => (
            <div key={m.label} className="flex flex-col gap-2">
              <dt className="text-[11px] tracking-[0.08em] uppercase text-[#888]">
                {m.label}
              </dt>
              <dd className="text-[14px] leading-[20px] tracking-[-0.28px] text-[#ebebeb] whitespace-pre-line">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Hero banner */}
      <section className="px-[10%] py-16 border-b border-[#252525] max-md:px-[5vw] max-md:py-12">
        <video
          src="/assets/sap-hover.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto rounded-[8px] block"
          aria-label="SAP project hero"
        />
      </section>

      {/* THE MISSION */}
      <section id="section-mission" className="px-[10%] py-20 border-b border-[#252525] max-md:px-[5vw] max-md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-[clamp(40px,6vw,96px)]">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#888] pt-1">
            THE MISSION
          </p>
          <div className="flex flex-col gap-6 max-w-[720px]">
            <p className="text-[20.6px] leading-[1.6] tracking-[-0.44px] text-[#ebebeb]">
              Over my 9-month internship, I worked on 4 separate, fast-paced
              projects across AI workflows, product health scoring, chatbot
              support, and site speed performance.
            </p>
            <p className="text-[20.6px] leading-[1.6] tracking-[-0.44px] text-[#888]">
              Each project tackled a different challenge, but all shared a
              common focus:{' '}
              <span className="text-[#ebebeb]">
                Helping users know what actions to take, and move through
                technical AI workflows with more confidence.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS 01–04 */}
      <section id="section-projects" aria-label="Projects worked on">
        {PROJECTS.map((p, idx) => (
          <article
            key={p.eyebrow}
            className="px-[10%] py-20 border-b border-[#252525] grid grid-cols-1 md:grid-cols-2 gap-[clamp(40px,6vw,96px)] items-center max-md:px-[5vw] max-md:py-12"
          >
            {/* Info side */}
            <div className={`flex flex-col gap-6 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#888]">
                {p.eyebrow}
              </p>
              <h3 className="text-[28px] md:text-[32px] font-medium leading-[1.2] tracking-[-0.5px] text-[#ebebeb]">
                {p.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-[#888] max-w-[440px]">
                {p.body}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full bg-[rgba(40,40,40,0.4)] text-[12px] text-[#ebebeb] shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Preview side */}
            <div className={`relative ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
              {p.isPhones ? (
                <div className="relative aspect-[16/9] rounded-[10px] overflow-hidden bg-gradient-to-br from-[#5d36ff] via-[#6431fa] to-[#a100c2] flex items-center justify-center gap-3 px-6 backdrop-blur-md">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-1/4 aspect-[3/5] rounded-md bg-white/95 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                    />
                  ))}
                  <div className="absolute inset-0 backdrop-blur-[3px] bg-[rgba(20,20,20,0.5)]" />
                </div>
              ) : (
                <div className="relative rounded-[10px] overflow-hidden">
                  <img
                    src={p.image!}
                    alt={`${p.eyebrow} preview`}
                    className="w-full h-auto block"
                  />
                  {p.blurred && (
                    <div className="absolute inset-0 backdrop-blur-[6px] bg-[rgba(20,20,20,0.5)]" />
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Confidential card */}
      <section id="section-confidential" className="px-[10%] py-20 border-b border-[#252525] flex justify-center max-md:px-[5vw] max-md:py-16">
        <div className="w-full max-w-[560px] bg-[#1e1e1e] border border-[#2a2a2b] rounded-[20px] p-10 flex flex-col gap-5 items-start">
          <div className="w-[44px] h-[44px] rounded-full bg-[#2a2a2a] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <p className="text-[15px] leading-[1.6] text-[#ebebeb]">
            This work is confidential.
            <br />
            Please{' '}
            <a
              href="mailto:ellenpthao19012004@gmail.com"
              className="underline underline-offset-[3px] hover:opacity-70 transition-opacity"
            >
              email me
            </a>{' '}
            or drop me a message below if you'd like to chat!
          </p>
          <form
            onSubmit={e => e.preventDefault()}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(40,40,40,0.4)]"
          >
            <input
              type="text"
              placeholder="Enter…"
              aria-label="Message"
              className="flex-1 bg-transparent border-0 outline-none text-[14px] text-[#ebebeb] placeholder:text-[#888]"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 8 12 16" />
                <polyline points="8 12 12 8 16 12" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* Manager quote */}
      <section id="section-testimonial" className="px-[10%] py-20 border-b border-[#252525] max-md:px-[5vw] max-md:py-16">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[#888] mb-10">
          KIND WORDS FROM MY MANAGER
        </p>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-[clamp(40px,6vw,80px)] items-start">
          <div className="flex flex-col items-center md:items-start gap-3">
            <img
              src="/assets/sap/team-1.png"
              alt="Christopher Siwinski"
              className="w-[140px] h-[140px] rounded-full object-cover bg-[#2a2a2a]"
            />
            <div className="text-center md:text-left">
              <p className="text-[15px] text-[#ebebeb]">Christopher Siwinski</p>
              <p className="text-[13px] text-[#888]">Senior IT Product Owner @ SAP</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-[680px]">
            <span className="font-serif text-[48px] leading-none text-[#888]">"</span>
            <blockquote className="text-[20.6px] italic leading-[1.55] tracking-[-0.44px] text-[#ebebeb] m-0">
              Thao brings curiosity and rigor into every challenge she takes on.
              She turns every complex technical concepts into clear, actionable
              solutions. Her work not only supported SAP.com's monitoring and
              optimization efforts, but also helped the team better understand
              AI bot behavior and the broader business impact of digital
              performance.
            </blockquote>
            <a
              href="https://www.linkedin.com/in/thaongx/details/recommendations/?detailScreenTabIndex=2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#888] italic hover:text-[#ebebeb] transition-colors w-fit"
            >
              Read more →
            </a>
          </div>
        </div>
      </section>

      {/* Halloween photos collage */}
      <section id="section-photos" className="px-[10%] py-24 border-b border-[#252525] max-md:px-[5vw] max-md:py-16">
        <div className="relative h-[280px] max-w-[720px] mx-auto">
          {HALLOWEEN_PHOTOS.map((p, i) => (
            <div
              key={i}
              className="absolute w-[120px] h-[160px] bg-white rounded-[4px] p-2 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              style={{
                top: `${p.top}px`,
                left: p.left,
                transform: `rotate(${p.rotate})`,
              }}
            >
              <img
                src={p.src}
                alt=""
                className="w-full h-full object-cover rounded-[2px]"
              />
            </div>
          ))}
        </div>
        <p className="text-center text-[12px] text-[#888] mt-8">
          Halloween'25 at the office
        </p>
      </section>

      {/* Workspace + team */}
      <section className="px-[10%] py-20 border-b border-[#252525] max-md:px-[5vw] max-md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(40px,6vw,80px)] items-start">
          {/* Workspace photo */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-full max-w-[320px] aspect-[3/4] bg-white border-2 border-white rounded-[6px] p-2 shadow-[0_4px_24px_rgba(119,119,119,0.2)]"
              style={{ transform: 'rotate(-6.46deg)' }}
            >
              <img
                src="/assets/sap/workspace.png"
                alt="My favorite working spot"
                className="w-full h-full object-cover rounded-[4px]"
              />
            </div>
            <p className="text-[12px] text-[#888] mt-6">My favorite working spots &lt;3</p>
          </div>

          {/* Team avatars + thank you */}
          <div className="min-h-[280px]">
            <div className="flex flex-wrap gap-2">
              <img
                src="assets/sap/teamn.png"
                alt=""
                className="w-[800px] h-[400px] object-contain object-center"
              />
            </div>
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-full rounded-bl-[20px] bg-[#1e1e1e] border border-[#2a2a2b]">
              <span aria-hidden="true">🥹</span>
              <p className="text-[13px] text-[#ebebeb]">
                Thank you my amazing team for a wonderful internship!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
