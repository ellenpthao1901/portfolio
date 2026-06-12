import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type LastVisitor = {
  city: string | null
  region: string | null
  country: string | null
}

function LastVisitorBadge() {
  const [visitor, setVisitor] = useState<LastVisitor | null>(null)

  useEffect(() => {
    supabase
      .from('visitors')
      .select('city, region, country')
      .order('visited_at', { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) setVisitor(data)
      })
  }, [])

  if (!visitor) return null

  const parts = [visitor.city, visitor.region, visitor.country].filter(Boolean)
  if (parts.length === 0) return null

  return (
    <span className="flex items-center gap-2 text-quiet text-[14px] tracking-[-0.28px]">
      last visited in {parts.join(', ').toLowerCase()}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
    </span>
  )
}

export default function Footer() {
  return (
    <footer
      className="
        mt-auto flex h-[60px] items-center justify-between
        border-t border-line px-[17px] text-quiet
        text-[14px] tracking-[-0.28px]
        max-md:gap-[18px]
        max-[560px]:h-auto max-[560px]:min-h-[60px] max-[560px]:flex-col
        max-[560px]:items-start max-[560px]:justify-center max-[560px]:p-4
      "
    >
      <p>Let's write up the next story through designs!</p>
      <div className="flex items-center gap-[15px]">
        <LastVisitorBadge />
        <nav className="flex items-center gap-[15px]" aria-label="Contact links">
          <a
            href="mailto:ellenpthao19012004@gmail.com"
            className="transition-colors duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#dfdfdf]"
          >
            Gmail
          </a>
          <span>·</span>
          <a
            href="https://www.linkedin.com/in/thaongx/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#dfdfdf]"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  )
}
