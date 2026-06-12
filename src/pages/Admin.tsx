import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import { supabase } from '../lib/supabase'

type Visitor = {
  id: string
  visited_at: string
  city: string | null
  region: string | null
  country: string | null
  device: string | null
}

type Message = {
  id: string
  sent_at: string
  name: string | null
  email: string | null
  message: string | null
  page: string | null
}

type Range = 'all' | '1y' | '6m' | '3m' | '1m' | '1w'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string
const AUTH_KEY = 'admin_authed'

const RANGES: { label: string; value: Range }[] = [
  { label: 'All', value: 'all' },
  { label: '1 Year', value: '1y' },
  { label: '6 Months', value: '6m' },
  { label: '3 Months', value: '3m' },
  { label: '1 Month', value: '1m' },
  { label: 'Last Week', value: '1w' },
]

function cutoff(range: Range): Date | null {
  const d = new Date()
  if (range === 'all') return null
  if (range === '1w') { d.setDate(d.getDate() - 7); return d }
  if (range === '1m') { d.setMonth(d.getMonth() - 1); return d }
  if (range === '3m') { d.setMonth(d.getMonth() - 3); return d }
  if (range === '6m') { d.setMonth(d.getMonth() - 6); return d }
  if (range === '1y') { d.setFullYear(d.getFullYear() - 1); return d }
  return null
}

function filterByRange(visitors: Visitor[], range: Range): Visitor[] {
  const c = cutoff(range)
  if (!c) return visitors
  return visitors.filter(v => new Date(v.visited_at) >= c!)
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex-1 border border-[#252525] rounded-xl p-6 min-w-0">
      <p className="text-[32px] font-semibold tracking-tight text-[#e6e6e6]">
        {value.toLocaleString()}
      </p>
      <p className="text-[11px] tracking-[0.1em] uppercase text-[#4e4e4e] mt-1">{label}</p>
    </div>
  )
}

function ActivityChart({ visitors }: { visitors: Visitor[] }) {
  const [range, setRange] = useState<Range>('1m')
  const filtered = filterByRange(visitors, range)

  const c = cutoff(range)
  const start = filtered.length > 0
    ? (c ?? new Date(filtered[filtered.length - 1].visited_at))
    : new Date()
  const end = new Date()
  const diffMs = end.getTime() - start.getTime()
  const diffDays = Math.ceil(diffMs / 86400000)
  const bucketCount = Math.min(Math.max(diffDays, 1), 60)
  const bucketMs = diffMs / bucketCount

  const counts = Array(bucketCount).fill(0)
  filtered.forEach(v => {
    const idx = Math.min(
      Math.floor((new Date(v.visited_at).getTime() - start.getTime()) / bucketMs),
      bucketCount - 1
    )
    if (idx >= 0) counts[idx]++
  })

  const max = Math.max(...counts, 1)
  const startLabel = start.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
  const endLabel = end.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })

  return (
    <div className="border border-[#252525] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] tracking-[0.1em] uppercase text-[#4e4e4e]">Activity</p>
        <div className="flex items-center gap-1">
          {RANGES.map(r => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1 rounded text-[12px] tracking-tight transition-colors ${
                range === r.value
                  ? 'bg-[#d8d8d8] text-[#111]'
                  : 'text-[#4e4e4e] hover:text-[#7b7b7b]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-[2px] h-36">
        {counts.map((c, i) => (
          <div
            key={i}
            className="flex-1 bg-[#d8d8d8] rounded-[1px] transition-all"
            style={{ height: `${Math.max((c / max) * 100, c > 0 ? 3 : 0)}%`, opacity: c === 0 ? 0.1 : 0.9 }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[11px] text-[#4e4e4e]">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  )
}

function TopList({ title, items }: { title: string; items: { label: string; count: number }[] }) {
  const max = items[0]?.count ?? 1
  return (
    <div className="flex-1 border border-[#252525] rounded-xl p-6 min-w-0">
      <p className="text-[11px] tracking-[0.1em] uppercase text-[#4e4e4e] mb-5">{title}</p>
      <div className="flex flex-col gap-4">
        {items.slice(0, 6).map(item => (
          <div key={item.label}>
            <div className="flex justify-between text-[13px] mb-1">
              <span className="text-[#7b7b7b] lowercase truncate pr-4">{item.label}</span>
              <span className="text-[#d8d8d8] shrink-0">{item.count}</span>
            </div>
            <div className="h-[1px] bg-[#252525] w-full">
              <div
                className="h-full bg-[#d8d8d8]"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true')
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState(authed)
  const [recentMessages, setRecentMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!authed) return
    supabase
      .from('visitors')
      .select('*')
      .order('visited_at', { ascending: false })
      .then(({ data }) => {
        setVisitors(data ?? [])
        setLoading(false)
      })
  }, [authed])

  useEffect(() => {
    if (!authed) return
    supabase
      .from('inbox')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(5)
      .then(({ data }) => setRecentMessages(data ?? []))
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
      <div className="flex min-h-screen items-center justify-center bg-[#111]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-72">
          <p className="text-[#d8d8d8] text-sm tracking-tight">Admin access</p>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Password"
            className="bg-[#1a1a1a] text-[#d8d8d8] text-sm px-3 py-2 rounded border border-[#252525] outline-none focus:border-[#4e4e4e]"
            autoFocus
          />
          {error && <p className="text-red-400 text-xs">Incorrect password</p>}
          <button
            type="submit"
            className="text-sm text-[#d8d8d8] bg-[#1a1a1a] hover:bg-[#222] border border-[#252525] py-2 rounded transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111]">
        <p className="text-[#4e4e4e] text-sm tracking-widest uppercase">Loading</p>
      </div>
    )
  }

  // Derived stats
  const uniqueLocations = new Set(
    visitors.map(v => [v.city, v.region, v.country].filter(Boolean).join(','))
  ).size

  const topLocations = Object.entries(
    visitors.reduce<Record<string, number>>((acc, v) => {
      const key = [v.city, v.region, v.country].filter(Boolean).join(', ')
      if (key) acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }))

  const byCountry = Object.entries(
    visitors.reduce<Record<string, number>>((acc, v) => {
      const key = v.country ?? 'unknown'
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }))

  const byDevice = Object.entries(
    visitors.reduce<Record<string, number>>((acc, v) => {
      const key = v.device ?? 'unknown'
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count }))

  return (
    <div className="min-h-screen bg-[#111] text-[#d8d8d8] font-sans">

      <AdminNav onLogout={() => {
        sessionStorage.removeItem('admin_authed')
        setAuthed(false)
      }} />

      <div className="p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-5">

        {/* Stat cards */}
        <div className="flex gap-4">
          <StatCard label="Total Visits" value={visitors.length} />
          <StatCard label="Unique Locations" value={uniqueLocations} />
          <StatCard label="Countries" value={byCountry.length} />
        </div>

        {/* Activity chart */}
        <ActivityChart visitors={visitors} />

        {/* Bottom panels */}
        <div className="flex gap-4">
          <TopList title="Top Locations" items={topLocations} />
          <TopList title="By Country" items={byCountry} />
        </div>

        <TopList title="By Device" items={byDevice} />

        {recentMessages.length > 0 && (
          <div className="border border-[#252525] rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[11px] tracking-[0.1em] uppercase text-[#4e4e4e]">Recent Messages</p>
              <Link to="/admin/inbox" className="text-[12px] text-[#4e4e4e] hover:text-[#7b7b7b] transition-colors">
                View all →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {recentMessages.map(m => (
                <div key={m.id} className="flex items-baseline justify-between gap-4 border-b border-[#1d1d1d] pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0">
                    <span className="text-[13px] text-[#7b7b7b] truncate block">{m.email ?? '—'}</span>
                    <span className="text-[12px] text-[#4e4e4e] truncate block">
                      {m.message ? m.message.slice(0, 60) + (m.message.length > 60 ? '…' : '') : '—'}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4e4e4e] shrink-0">{timeAgo(m.sent_at)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      </div>
    </div>
  )
}
