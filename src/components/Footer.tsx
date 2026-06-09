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
    </footer>
  )
}
