import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

type Visitor = {
  id: string
  visited_at: string
  city: string | null
  region: string | null
  country: string | null
  device: string | null
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string
const AUTH_KEY = 'admin_authed'

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true')
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    supabase
      .from('visitors')
      .select('*')
      .order('visited_at', { ascending: false })
      .then(({ data }) => {
        setVisitors(data ?? [])
        setLoading(false)
      })
  }, [authed])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
          <p className="text-white text-sm tracking-tight">Admin access</p>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Password"
            className="bg-[#1a1a1a] text-white text-sm px-3 py-2 rounded border border-white/10 outline-none focus:border-white/30"
            autoFocus
          />
          {error && <p className="text-red-400 text-xs">Incorrect password</p>}
          <button
            type="submit"
            className="text-sm text-white bg-white/10 hover:bg-white/20 py-2 rounded transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-8 text-white">
      <h1 className="text-lg font-medium mb-1 tracking-tight">Visitors</h1>
      <p className="text-sm text-white/40 mb-6">{visitors.length} total</p>
      {loading ? (
        <p className="text-sm text-white/40">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-white/40 text-left border-b border-white/10">
                <th className="pb-2 pr-6 font-normal">Date / Time</th>
                <th className="pb-2 pr-6 font-normal">City</th>
                <th className="pb-2 pr-6 font-normal">Region</th>
                <th className="pb-2 pr-6 font-normal">Country</th>
                <th className="pb-2 font-normal">Device</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map(v => (
                <tr key={v.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-2 pr-6 text-white/60">
                    {new Date(v.visited_at).toLocaleString()}
                  </td>
                  <td className="py-2 pr-6">{v.city ?? '—'}</td>
                  <td className="py-2 pr-6">{v.region ?? '—'}</td>
                  <td className="py-2 pr-6">{v.country ?? '—'}</td>
                  <td className="py-2">{v.device ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
