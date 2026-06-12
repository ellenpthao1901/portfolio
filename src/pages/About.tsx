import PhotoShuffle from '../components/PhotoShuffle'

// ── Figma image assets ────────────────────────────────────────────────────────
const IMG_HERO        = 'https://www.figma.com/api/mcp/asset/198f4c84-5755-40f5-9b63-cd6112531e9c'

// Tool icons
const TOOL_MIRO       = 'https://www.figma.com/api/mcp/asset/58cebdb8-3f44-4f67-9616-dae24923a742'
const TOOL_MSFT       = 'https://www.figma.com/api/mcp/asset/79c43af7-0829-4f04-834c-a492ea7839b5'
const TOOL_AI         = 'https://www.figma.com/api/mcp/asset/85413e92-2c12-4a6c-89a2-1159a4089562'
const TOOL_PS         = 'https://www.figma.com/api/mcp/asset/755d83f9-47ff-4225-b6f2-64d0cf63aba7'
const TOOL_GG         = 'https://www.figma.com/api/mcp/asset/55fb0d7a-717f-4d75-b705-283ed6903ffb'
const TOOL_CANVA      = 'https://www.figma.com/api/mcp/asset/628372d8-078d-44d9-b59e-c0f3181811ff'
const TOOL_MIRO2      = 'https://www.figma.com/api/mcp/asset/5c213f5f-f39b-45c1-8cf7-59e1207cd98b'
const TOOL_PROTOPIE   = 'https://www.figma.com/api/mcp/asset/b123676b-6cac-46c7-9b6c-ffa1d0ab3fe2'
const TOOL_CLAUDE     = 'https://www.figma.com/api/mcp/asset/7f9e253d-325a-417e-a370-11c26ec6268a'
const TOOL_BLENDER    = 'https://www.figma.com/api/mcp/asset/2c55b5a8-61b2-4faa-bd61-242a8120c6a1'
const TOOL_CODEX      = 'https://www.figma.com/api/mcp/asset/8f12c9ea-e823-4e31-8e7b-e79e9bbacaf1'
const TOOL_ADOBE      = 'https://www.figma.com/api/mcp/asset/aa2a1f9d-aff1-40af-8c3a-93badd0509d7'
const TOOL_GITHUB     = 'https://www.figma.com/api/mcp/asset/90716328-f420-48af-98d8-fd81421f17af'

// Web Impact photos
const WI_LOGO         = 'https://www.figma.com/api/mcp/asset/bc2f9aae-1c8c-4cad-80b9-e204ec4aec8c'
const WI_IMG1         = 'https://www.figma.com/api/mcp/asset/54721b6e-9bd5-4063-8385-feeb8b8272c4'
const WI_IMG2         = 'https://www.figma.com/api/mcp/asset/dd3110f9-7c94-4ea9-8db6-2152697e71d1'
const WI_IMG3         = 'https://www.figma.com/api/mcp/asset/9a00aad1-5e2c-4321-81fa-6c59119da433'

// ATC photos
const ATC_LOGO        = 'https://www.figma.com/api/mcp/asset/b0fdbd1f-29ee-4227-9142-fff382877240'
const ATC_IMG1        = 'https://www.figma.com/api/mcp/asset/d7ee7cdc-d3c8-4174-934f-fa9104d7b8ea'
const ATC_IMG2        = 'https://www.figma.com/api/mcp/asset/8f31153f-c8d0-4607-a576-2bb7b0cc765f'
const ATC_IMG3        = 'https://www.figma.com/api/mcp/asset/8af1bf47-a4fb-476f-adbb-485c9afef5be'

// Beyond design — hiking
const HIKE_IMG1       = 'https://www.figma.com/api/mcp/asset/c115a2f5-b5a9-4ed9-b220-53df9fd14ee6'
const HIKE_IMG2       = 'https://www.figma.com/api/mcp/asset/4171cd98-3583-42ac-9d72-6600ce7a3bc0'
const HIKE_IMG3       = 'https://www.figma.com/api/mcp/asset/68d3c775-8bba-4bfd-acc9-3645414f346a'

// Beyond design — foodie
const FOOD_IMG1       = 'https://www.figma.com/api/mcp/asset/138f855c-92e2-4f5b-a210-c75ee0870f62'
const FOOD_IMG2       = 'https://www.figma.com/api/mcp/asset/194824c9-df95-468a-81ce-e0bdad88bd22'
const FOOD_IMG3       = 'https://www.figma.com/api/mcp/asset/7161e36d-7bf0-428a-ac90-9934d98d99d2'

// Beyond design — hobbies
const HOBBY_IMG1      = 'https://www.figma.com/api/mcp/asset/603ba77a-c0f7-42dd-83b1-706e1edf30f8'
const HOBBY_IMG2      = 'https://www.figma.com/api/mcp/asset/12c93ec1-d82c-4717-8258-8b3f98946f78'
const HOBBY_IMG3      = 'https://www.figma.com/api/mcp/asset/d2c54c2c-3973-41e7-9732-11e606bc7cb0'

// ── Tool bubble data ──────────────────────────────────────────────────────────
const TOOLS = [
  { src: TOOL_CLAUDE,   label: 'Claude' },
  { src: TOOL_ADOBE,    label: 'Adobe' },
  { src: TOOL_MSFT,     label: 'Figma' },
  { src: TOOL_BLENDER,  label: 'Blender' },
  { src: TOOL_AI,       label: 'AI' },
  { src: TOOL_PROTOPIE, label: 'ProtoPie' },
  { src: TOOL_MIRO,     label: 'Miro' },
  { src: TOOL_CODEX,    label: 'Codex' },
  { src: TOOL_PS,       label: 'Photoshop' },
  { src: TOOL_GG,       label: 'Google' },
  { src: TOOL_CANVA,    label: 'Canva' },
  { src: TOOL_MIRO2,    label: 'FigJam' },
  { src: TOOL_GITHUB,   label: 'GitHub' },
]

// ── Main component ─────────────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="text-white">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-[auto_1fr] gap-16 items-start px-[10%] py-20 border-b border-[#252525]">
        <div className="shrink-0 rounded-[20px] overflow-hidden" style={{ width: 'clamp(200px,22vw,320px)', aspectRatio: '3/4' }}>
          <img src={IMG_HERO} alt="Thao Nguyen" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-5 pt-4">
          <p className="text-[clamp(28px,3vw,44px)] font-medium tracking-[-1.32px] text-white leading-[1.15]">
            Hi, I'm Thao Nguyen!
          </p>
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#888] leading-[1.6]">
            B.S in Informatics | University of Washington
          </p>
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#888] leading-[1.6]">
            in Vietnamese, "Thao" means "Aromatic grass"
          </p>
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6]">
            Traveling 7,000 miles from home to study design in one of the most inspiring tech cities in the world — Seattle — has opened my eyes to so many new perspectives. It's pushed me to design with empathy, not just to solve problems, but to tell stories that often go unheard.
          </p>
        </div>
      </section>

      {/* ── 2. STATEMENT ────────────────────────────────────────────────────── */}
      <section className="px-[10%] py-16 border-b border-[#252525]">
        <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#888] leading-[1.6]">
          I design platforms that help people make sense of complexity ✦
        </p>
      </section>

      {/* ── 3. TOOLS + WORK SPANS ───────────────────────────────────────────── */}
      <section className="flex gap-16 items-start px-[10%] py-20 border-b border-[#252525]">
        {/* Tool bubbles grid */}
        <div className="grid grid-cols-3 gap-3 shrink-0">
          {TOOLS.map(t => (
            <div
              key={t.label}
              className="w-14 h-14 rounded-full bg-[#222] flex items-center justify-center overflow-hidden"
              title={t.label}
            >
              <img src={t.src} alt={t.label} className="w-8 h-8 object-contain" />
            </div>
          ))}
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
              <li key={item} className="text-[20.6px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 4. COMMUNITIES ──────────────────────────────────────────────────── */}
      <section className="px-[10%] py-20 border-b border-[#252525] flex flex-col gap-20">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[#888]">
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
            <p className="text-[14px] font-normal tracking-[-0.28px] text-[#888] text-right leading-[1.5] max-w-[280px]">
              9-month weekly Coding & Design workshops, open to all levels
            </p>
          </div>
          <div className="relative h-[500px] overflow-visible">
            <div className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 340, height: 260, left: '30%', top: 0, transform: 'rotate(5.06deg)', zIndex: 3 }}>
              <img src={WI_IMG1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 320, height: 240, left: '0%', top: 70, transform: 'rotate(-7deg)', zIndex: 2 }}>
              <img src={WI_IMG2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 230, height: 280, left: '62%', top: 40, transform: 'rotate(-6.55deg)', zIndex: 1 }}>
              <img src={WI_IMG3} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: '2%', bottom: 8, transform: 'rotate(-6.4deg)', maxWidth: 220 }}>
              Our 9-month weekly Coding & Design workshops
            </p>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: '40%', bottom: 16, transform: 'rotate(4.64deg)' }}>
              Our amazing officers!!
            </p>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: '65%', bottom: 4, transform: 'rotate(-6.48deg)', maxWidth: 180 }}>
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
            <p className="text-[14px] font-normal tracking-[-0.28px] text-[#888] text-right leading-[1.5] max-w-[280px]">
              Husky Hold'em poker coding tournament 2025
            </p>
          </div>
          <div className="relative h-[500px] overflow-visible">
            <div className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 320, height: 240, left: '28%', top: 0, transform: 'rotate(-5.68deg)', zIndex: 3 }}>
              <img src={ATC_IMG1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 300, height: 220, left: '2%', top: 40, transform: 'rotate(7.47deg)', zIndex: 2 }}>
              <img src={ATC_IMG2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute rounded-[20px] overflow-hidden shadow-[20px_15px_50px_0px_rgba(255,255,255,0.15)]"
              style={{ width: 310, height: 200, left: '60%', top: 60, transform: 'rotate(6.38deg)', zIndex: 1 }}>
              <img src={ATC_IMG3} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: '2%', bottom: 8, transform: 'rotate(8.07deg)', maxWidth: 200 }}>
              Our social events
            </p>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: '35%', bottom: 16, transform: 'rotate(-5.28deg)', maxWidth: 200 }}>
              Announced the poker coding tournament 2025
            </p>
            <p className="absolute text-[14px] text-[#888] text-center leading-[1.4]"
              style={{ left: '62%', bottom: 4, transform: 'rotate(6.93deg)', maxWidth: 200 }}>
              Official website — Husky Hold'em
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. BEYOND DESIGN ────────────────────────────────────────────────── */}
      <section className="px-[10%] py-20 flex flex-col gap-24 border-b border-[#252525]">
        <p className="text-[11px] tracking-[0.08em] uppercase text-[#888]">
          Beyond Design, you can also find me at ✦
        </p>

        {/* Hiking */}
        <div className="flex gap-20 items-center justify-between">
          <PhotoShuffle images={[HIKE_IMG3, HIKE_IMG2, HIKE_IMG1]} />
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6] flex-1">
            I'm a typical Seattle girlie - love spending time in natural — hiking ⛰️ & kayaking 🚣‍♀️
          </p>
        </div>

        {/* Foodie */}
        <div className="flex gap-20 items-center justify-between flex-row-reverse">
          <PhotoShuffle images={[FOOD_IMG3, FOOD_IMG2, FOOD_IMG1]} />
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6] flex-1">
            I'm a huge foodie 🍕 — hunting for the best food spots on Google Maps and Beli & also love cooking 😋
          </p>
        </div>

        {/* Hobbies */}
        <div className="flex gap-20 items-center justify-between">
          <PhotoShuffle images={[HOBBY_IMG3, HOBBY_IMG2, HOBBY_IMG1]} />
          <p className="text-[20.6px] font-normal tracking-[-0.44px] text-[#ebebeb] leading-[1.6] flex-1">
            I have many random hobbies — pottery 🏺 painting 🎨 archery 🏹 flower arranging 💐
          </p>
        </div>
      </section>

    </div>
  )
}
