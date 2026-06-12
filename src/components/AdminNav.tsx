import { Link } from 'react-router-dom'

type Props = {
  onLogout: () => void
}

export default function AdminNav({ onLogout }: Props) {
  return (
    <nav className="border-b border-[#252525] px-8 h-[52px] flex items-center justify-between">
      <div className="flex items-center gap-5 text-[13px] text-[#4e4e4e]">
        <Link to="/" className="hover:text-[#7b7b7b] transition-colors">Work</Link>
        <Link to="/about" className="hover:text-[#7b7b7b] transition-colors">About</Link>
      </div>
      <button
        onClick={onLogout}
        className="text-[12px] text-[#4e4e4e] hover:text-[#d8d8d8] transition-colors"
      >
        Log out
      </button>
    </nav>
  )
}
