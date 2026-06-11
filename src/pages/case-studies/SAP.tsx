// Built from Figma design (file S4wa2P3oA7OANLvxjcglAy, node 1:2)
// All images live in /public/assets/sap/

import { useState } from 'react'
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
    image: '/assets/sap/project-02.png',
    blurred: false,
    imageOnRight: true,
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

// 5 portrait photos + 1 landscape (#4) for variety. Varied positions and z-index
// for a real scattered-collage feel.
const HALLOWEEN_PHOTOS = [
  { src: '/assets/sap/halloween-4.png', rotate: '4.58deg',   top: 0,   left: '4%',  width: 250, height: 350, z: 3 },
  { src: '/assets/sap/halloween-2.png', rotate: '-10.11deg', top: 130, left: '20%', width: 230, height: 350, z: 2 },
  { src: '/assets/sap/halloween-3.png', rotate: '7.99deg',   top: 30,  left: '36%', width: 250, height: 330, z: 1 },
  // 4: landscape — wider than tall
  { src: '/assets/sap/halloween-6.png', rotate: '-2.67deg',  top: 250, left: '51%', width: 260, height: 200, z: 5 },
  { src: '/assets/sap/halloween-5.png', rotate: '4.47deg',   top: 50,  left: '68%', width: 195, height: 300, z: 3 },
  { src: '/assets/sap/halloween-1.png', rotate: '11.41deg',  top: 130, left: '83%', width: 255, height: 335, z: 2 },
]

export default function SAP() {
  const [tweak, setTweak] = useState(false)

  const playTweak = () => {
    if (tweak) return
    setTweak(true)
    setTimeout(() => setTweak(false), 900)
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <p className="text-[11px] tracking-[0.08em] uppercase text-[#888] pt-1">
            THE MISSION
          </p>
          <div className="flex flex-col gap-6">
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
              <p className="text-[20.6px] leading-[1.6] tracking-[-0.44px] text-[#888] max-w-[440px]">
                {p.body}
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="px-7 py-2 text-[15px] text-[#ebebeb]"
                    style={{
                      borderRadius: '9999px',
                      // padding-box: subtle dark surface; border-box: bright top/bottom, dark sides
                      background:
                        'linear-gradient(180deg, #1c1c1c 0%, #161616 90%, rgba(255,255,255,0.10) 100%, #1c1c1c 100%) padding-box, linear-gradient(190deg, rgba(255,255,255,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4) 60%, rgba(255,255,255,0.40) 100%) border-box',
                      border: '1.5px solid transparent',
                      boxShadow:
                        '0 20.716px 51.791px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    }}
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
        <div
          className="w-full max-w-[760px] p-12 max-md:p-8 bg-[#1a1a1a] rounded-[32px] border border-[#2A2A2B]"
        >
          {/* Lock icon circle */}
          <div
            className="w-[64px] h-[64px] flex items-center justify-center mb-10"
            style={{
              borderRadius: '9999px',
              background:
                'linear-gradient(180deg, #1c1c1c 0%, #161616 90%, rgba(255,255,255,0.10) 99%, #1c1c1c 100%) padding-box, linear-gradient(190deg, rgba(255,255,255,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4) 60%, rgba(255,255,255,0.40) 100%) border-box',
              border: '1.5px solid transparent',
              boxShadow: '0 12px 32px 0 rgba(0, 0, 0, 0.45)',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-[#ebebeb]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 1 1 6 0v3H9Z" />
            </svg>
          </div>

          {/* Body text */}
          <p className="text-[18px] leading-[1.55] text-[#ebebeb] mb-16">
            This work is confidential.
            <br />
            Please{' '}
            <a
              href="mailto:ellenpthao19012004@gmail.com"
              className="underline underline-offset-[4px] hover:opacity-70 transition-opacity"
            >
              email me
            </a>{' '}
            or drop me a message below if you'd like to chat!
          </p>

          {/* Enter pill input */}
          <form
            onSubmit={e => e.preventDefault()}
            className="flex items-center gap-2 pl-6 pr-2 mt-7 py-2 w-full"
            style={{
              borderRadius: '9999px',
              background:
                'linear-gradient(180deg, #1c1c1c 0%, #161616 90%, rgba(255,255,255,0.08) 99%, #1c1c1c 100%) padding-box, linear-gradient(190deg, rgba(255,255,255,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4) 60%, rgba(255,255,255,0.40) 100%) border-box',
              border: '1.5px solid transparent',
              boxShadow: '0 12px 32px 0 rgba(0, 0, 0, 0.35)',
            }}
          >
            <input
              type="text"
              placeholder="Enter…"
              aria-label="Message"
              className="flex-1 bg-transparent border-0 outline-none text-[15px] text-[#ebebeb] placeholder:text-[#888] py-1"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
              style={{
                border: '1.2px solid rgba(255, 255, 255, 0.55)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-[#ebebeb]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* Manager quote */}
      <section id="section-testimonial" className="px-[10%] py-20 border-t-2 border-[#252525] max-md:px-[5vw] max-md:py-16">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[#888] mb-10">
          KIND WORDS FROM MY MANAGER
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(40px,6vw,96px)] items-center">
          {/* Left — manager photo + name + title (composed image) */}
          <div className="flex justify-center mt-12">
            <img
              src="/assets/sap/manager-info.png"
              alt="Christopher Siwinski — Senior IT Product Owner @ SAP"
              className="w-[350px] h-auto block"
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-serif text-[48px] leading-none text-[#888]">"</span>
            <blockquote className="text-[20.6px] w-full italic leading-[1.55] tracking-[-0.44px] text-[#ebebeb] m-0">
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
      <section id="section-photos" className="px-[10%] py-24 max-md:px-[5vw] max-md:py-16">
        <div className="relative h-[480px] max-w-[1300px] mx-auto">
          {HALLOWEEN_PHOTOS.map((p, i) => (
            <img
              key={i}
              src={p.src}
              alt=""
              className="absolute object-cover rounded-[4px]"
              style={{
                top: `${p.top}px`,
                left: p.left,
                width: `${p.width}px`,
                height: `${p.height}px`,
                transform: `rotate(${p.rotate})`,
                zIndex: p.z,
              }}
            />
          ))}
        </div>
        <p className="text-center text-[18px] text-[#888] mt-8 pt-8">
          Halloween'25 at the office
        </p>
      </section>

      {/* Workspace + team */}
      <section className="px-[10%] py-20 border-b border-[#252525] max-md:px-[5vw] max-md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(40px,6vw,80px)] items-start">
          {/* Workspace photo */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={playTweak}
              aria-label="Tweak the photo"
              className={`w-full max-w-[320px] aspect-[3/4] bg-white border-2 border-white rounded-[6px] p-2 shadow-[0_4px_24px_rgba(119,119,119,0.2)] cursor-pointer focus:outline-none ${tweak ? 'workspace-tweak' : ''}`}
              style={
                {
                  transform: 'rotate(-6.46deg)',
                  ['--base-rotate' as string]: '-6.46deg',
                } as React.CSSProperties
              }
            >
              <img
                src="/assets/sap/workspace.png"
                alt="My favorite working spot"
                className="w-full h-full object-cover rounded-[4px] pointer-events-none"
              />
            </button>
            <p className="text-[18px] text-[#888] mt-3 pt-5">My favorite working spots &lt;3</p>
          </div>

          {/* Team avatars + thank you */}
          <div className="min-h-[280px] -ml-8">
            <div className="flex flex-wrap gap-2">
              <img
                src="/assets/sap/team.png"
                alt=""
                className="w-full h-auto object-contain"
              />
            </div>
            <img
              src="/assets/sap/thank-you-chat.png"
              alt="Thank you my amazing team for a wonderful internship!"
              className="mt-8 ml-auto w-4/5 max-w-[680px] h-auto block"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
