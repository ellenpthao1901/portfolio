import { useEffect, useState, type CSSProperties } from 'react'
import PhotoShuffle from '../components/PhotoShuffle'
import ToolBubbles from '../components/ToolBubbles'

// ── Figma image assets ────────────────────────────────────────────────────────
const IMG_HERO        = '/assets/about/hero.jpg'

// Tool icons

// Web Impact photos
const WI_LOGO         = '/assets/about/wi-logo.png'
const WI_IMG1         = '/assets/about/wi-img1.jpg'
const WI_IMG2         = '/assets/about/wi-img2.jpg'
const WI_IMG3         = '/assets/about/wi-img3.jpg'

// ATC photos
const ATC_LOGO        = '/assets/about/atc-logo.png'
const ATC_IMG1        = '/assets/about/atc-img1.jpg'
const ATC_IMG3        = '/assets/about/atc-img3.jpg'
const ATC_IMG2        = '/assets/about/atc-img2.jpg'

// Beyond design — hiking
const HIKE_IMG1       = '/assets/about/hike1.jpg'
const HIKE_IMG2       = '/assets/about/hike2.jpg'
const HIKE_IMG3       = '/assets/about/hike3.jpg'

// Beyond design — foodie
const FOOD_IMG1       = '/assets/about/food1.jpg'
const FOOD_IMG2       = '/assets/about/food2.jpg'
const FOOD_IMG3       = '/assets/about/food3.jpg'

// Beyond design — hobbies
const HOBBY_IMG1      = '/assets/about/hobby1.jpg'
const HOBBY_IMG2      = '/assets/about/hobby2.jpg'
const HOBBY_IMG3      = '/assets/about/hobby3.jpg'

// ── Tool bubble data ──────────────────────────────────────────────────────────
function TweakPhoto({
  src,
  alt,
  className,
  style,
  imageClassName = '',
  growOnHover = false,
}: {
  src: string
  alt: string
  className: string
  style: CSSProperties
  imageClassName?: string
  growOnHover?: boolean
}) {
  const [tweak, setTweak] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const playTweak = () => {
    if (tweak) return
    setTweak(true)
    setTimeout(() => setTweak(false), 900)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  const baseRotate = typeof style.transform === 'string'
    ? style.transform.match(/rotate\(([^)]+)\)/)?.[1] ?? '0deg'
    : '0deg'

  const restingTransform = typeof style.transform === 'string' ? style.transform : ''
  const hoverTransform = growOnHover && !prefersReducedMotion && isHovered
    ? `${restingTransform} scale(1.08)`.trim()
    : restingTransform

  return (
    <button
      type="button"
      onClick={playTweak}
      onMouseEnter={() => growOnHover && setIsHovered(true)}
      onMouseLeave={() => growOnHover && setIsHovered(false)}
      aria-label="Tweak the photo"
      className={`${className} group cursor-pointer focus:outline-none ${tweak ? 'workspace-tweak' : ''}`}
      style={
        {
          ...style,
          transform: hoverTransform || undefined,
          transformOrigin: 'center center',
          transition: growOnHover && !tweak
            ? 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)'
            : undefined,
          willChange: growOnHover ? 'transform' : undefined,
          ['--base-rotate' as string]: baseRotate,
        } as CSSProperties
      }
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover pointer-events-none ${imageClassName}`}
      />
    </button>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="text-white">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-16 items-start px-[10%] py-20 border-b border-[#252525]">
        <div className="flex justify-center">
          <TweakPhoto
            src={IMG_HERO}
            alt="Thao Nguyen"
            className="rounded-[20px] overflow-hidden"
            style={{ width: 360, aspectRatio: '3/4' }}
            growOnHover
          />
        </div>
        <div className="flex flex-col gap-5 pt-4 justify-center h-full">
          <p className="text-[clamp(28px,3vw,44px)] font-medium tracking-[-1.32px] text-white leading-[1.15]">
            Hi, I'm <span className="italic">Thao Nguyen</span> !
          </p>
          <div className="flex flex-col gap-0.5">
            <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#888] leading-[1.6]">
              B.S in Informatics | University of Washington
            </p>
            <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#888] leading-[1.6]">
              in Vietnamese, "Thao" means "Aromatic grass"
            </p>
          </div>
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6]">
            Traveling 7,000 miles from home to study design in one of the most inspiring tech cities in the world — Seattle — has opened my eyes to so many new perspectives. It's pushed me to design with empathy, not just to solve problems, but to tell stories that often go unheard.
          </p>
        </div>
      </section>

      {/* ── 2. STATEMENT ────────────────────────────────────────────────────── */}
      <section className="px-[10%] py-16 border-[#252525]">
        <p className="text-[14px] font-normal tracking-[-0.44px] text-[#888] leading-[1.6]">
          I DESIGN PLATFORMS THAT HELP PEOPLE MAKE SENSE OF COMPLEXITY ✦
        </p>
      </section>

      {/* ── 3. TOOLS + WORK SPANS ───────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-16 items-center px-[10%] py-10 border-b border-[#252525]">
        {/* Tool bubbles — Figma-positioned with mouse repulsion */}
        <div className="flex justify-center">
          <ToolBubbles />
        </div>

        {/* Work spans */}
        <div className="flex flex-col gap-3">
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6]">
            My work spans from:
          </p>
          <ul className="list-disc ml-6 flex flex-col gap-1">
            {[
              'AI (GenAI, Enterprise, AI Agents, Recommendation, Conversational)',
              'B2B SaaS',
              'FinTech',
              'Commerce',
              'Internal Platform',
              'EdTech',
              '3D Design',
              'Interaction Design',
            ].map(item => (
              <li key={item} className="text-[18px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 4. COMMUNITIES ──────────────────────────────────────────────────── */}
      <section className="px-[10%] py-20 border-b border-[#252525] flex flex-col gap-20">
        <p className="text-[14px] tracking-[0.08em] uppercase text-[#888]">
          Building amazing communities at UW ✦
        </p>

        {/* Web Impact UW */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={WI_LOGO} alt="Web Impact UW" className="w-12 h-12 object-contain" />
              <div>
                <p className="text-[20.6px] font-normal tracking-[-0.44px] text-white leading-[1.3]">Web Impact UW</p>
                <p className="text-[14px] font-normal tracking-[-0.28px] text-[#888] leading-[1.5]">Design Officer</p>
              </div>
            </div>
            <div>

            <p className="text-[16px] font-normal tracking-[-0.28px] text-[#888] text-right leading-[1.5] w-[40vw]">
              As one of 3 Design Officers, we host weekly workshops for 9 months to foster communication about UX Design, AR, AI, and accessibility principles. We mentor 30+ designers to successfully deliver their client-sponsored projects. <a className="text-[#FFF] group inline-flex items-center gap-0 overflow-hidden" href="https://webimpactuw.org/about" target="_blank" rel="noopener noreferrer">View more<span className="inline-block max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2em] group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap"> →</span></a>
            </p>
            </div>
          </div>
          <div className="relative overflow-visible mx-auto" style={{ width: 900, height: 500 }}>
            <TweakPhoto
              src={WI_IMG1}
              alt="Web Impact workshop group photo"
              className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 400, height: 300, left: 260, top: 0, transform: 'rotate(5.06deg)', zIndex: 3 }}>
            </TweakPhoto>
            <TweakPhoto
              src={WI_IMG2}
              alt="Web Impact officers together"
              className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 370, height: 290, left: -30, top: 70, transform: 'rotate(-7deg)', zIndex: 4 }}>
            </TweakPhoto>
            <TweakPhoto
              src={WI_IMG3}
              alt="Web Impact Figma collaboration workshop"
              className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 300, height: 320, left: 650, top: 40, transform: 'rotate(-6.55deg)', zIndex: 5 }}>
            </TweakPhoto>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: 50, bottom: 60, transform: 'rotate(-6.4deg)', maxWidth: 220 }}>
              Our 9-month weekly Coding & Design workshops
            </p>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: 400, bottom: 150, transform: 'rotate(4.64deg)' }}>
              Our amazing officers!!
            </p>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: 750, bottom: 69, transform: 'rotate(-6.48deg)', maxWidth: 180 }}>
              Collaborated with Figma & UX@UW
            </p>
          </div>
        </div>

        {/* Algorithm Trading Club */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={ATC_LOGO} alt="Algorithm Trading Club" className="w-12 h-12 object-contain" />
              <div>
                <p className="text-[20.6px] font-normal tracking-[-0.44px] text-white leading-[1.3]">Algorithm Trading Club UW</p>
                <p className="text-[14px] font-normal tracking-[-0.28px] text-[#888] leading-[1.5]">Director of Design</p>
              </div>
            </div>
            <p className="text-[16px] font-normal tracking-[-0.28px] text-[#888] text-right leading-[1.5] w-[40vw]">
              I led the arcade-style website design and marketing campaign for a competitive coding tournament where students code their own AI bots to play poker against one another. <a className="text-[#FFF] group inline-flex items-center gap-0 overflow-hidden" href="https://huskyholdem.atcuw.org/" target="_blank" rel="noopener noreferrer">View more<span className="inline-block max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2em] group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap"> →</span></a>
            </p>
          </div>
          <div className="relative overflow-visible mx-auto" style={{ width: 900, height: 500 }}>
            <TweakPhoto
              src={ATC_IMG2}
              alt="Algorithm Trading Club meeting"
              className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 400, height: 300, left: 260, top: 0, transform: 'rotate(-5.68deg)', zIndex: 3 }}>
            </TweakPhoto>
            <TweakPhoto
              src={ATC_IMG3}
              alt="Algorithm Trading Club social event"
              className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 370, height: 290, left: -30, top: 70, transform: 'rotate(7.47deg)', zIndex: 4 }}>
            </TweakPhoto>
            <TweakPhoto
              src={ATC_IMG1}
              alt="Husky Hold'em website visual"
              className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 400, height: 280, left: 650, top: 40, transform: 'rotate(6.38deg)', zIndex: 1 }}>
            </TweakPhoto>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: 50, bottom: 100, transform: 'rotate(8.07deg)', maxWidth: 220 }}>
              Our social events
            </p>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: 400, bottom: 150, transform: 'rotate(-5.28deg)', maxWidth: 200 }}>
              Announced the poker coding tournament 2025
            </p>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: 750, bottom: 120, transform: 'rotate(6.93deg)', maxWidth: 180 }}>
              Official website — Husky Hold'em
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. BEYOND DESIGN ────────────────────────────────────────────────── */}
      <section className="px-[10%] py-20 flex flex-col gap-24 border-b border-[#252525]">
        <p className="text-[14px] tracking-[0.08em] uppercase text-[#888]">
          Beyond Design, you can also find me at ✦
        </p>

        {/* Hiking */}
        <div className="grid grid-cols-2 gap-16 items-center">
          <div className="flex justify-center"><PhotoShuffle images={[HIKE_IMG3, HIKE_IMG2, HIKE_IMG1]} /></div>
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6]">
            I'm a typical Seattle girlie - love spending time in natural — hiking ⛰️ & kayaking 🚣‍♀️
          </p>
        </div>

        {/* Foodie — text left, photo right */}
        <div className="grid grid-cols-2 gap-16 items-center">
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6]">
            I'm a huge foodie 🍕 — hunting for the best food spots on Google Maps and Beli & also love cooking 😋
          </p>
          <div className="flex justify-center"><PhotoShuffle images={[FOOD_IMG3, FOOD_IMG2, FOOD_IMG1]} /></div>
        </div>

        {/* Hobbies */}
        <div className="grid grid-cols-2 gap-16 items-center">
          <div className="flex justify-center"><PhotoShuffle images={[HOBBY_IMG3, HOBBY_IMG2, HOBBY_IMG1]} /></div>
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6]">
            I have many random hobbies — pottery 🏺 painting 🎨 archery 🏹 flower arranging 💐
          </p>
        </div>
      </section>

    </div>
  )
}
