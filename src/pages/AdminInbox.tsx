import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AdminNav from '../components/AdminNav'

type Message = {
  id: string
  sent_at: string
  name: string | null
  email: string | null
  message: string | null
  page: string | null
  read: boolean
}

const AUTH_KEY = 'admin_authed'

export default function AdminInbox() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(authed)

  useEffect(() => {
    if (!authed) return
    supabase
      .from('inbox')
      .select('*')
      .order('sent_at', { ascending: false })
      .then(({ data }) => {
        setMessages(data ?? [])
        setLoading(false)
      })
  }, [authed])

  async function markRead(id: string) {
    await supabase.from('inbox').update({ read: true }).eq('id', id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }

  async function markUnread(id: string) {
    await supabase.from('inbox').update({ read: false }).eq('id', id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: false } : m))
  }


    await supabase.from('inbox').delete().eq('id', id)
    setMessages(prev => prev.filter(m => m.id !== id))
  }

  if (!authed) return <Navigate to="/admin" replace />

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111]">
        <p className="text-[#4e4e4e] text-sm tracking-widest uppercase">Loading</p>
      </div>
    )
  }

  const unread = messages.filter(m => !m.read).length

  return (
    <div className="min-h-screen bg-[#111] text-[#d8d8d8] font-sans">
      <AdminNav onLogout={() => {
        sessionStorage.removeItem(AUTH_KEY)
        setAuthed(false)
      }} />
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-lg font-medium mb-1 tracking-tight">Inbox</h1>
          <p className="text-sm text-[#4e4e4e] mb-6">
            {messages.length} messages
            {unread > 0 && <span className="ml-2 text-[#d8d8d8]">· {unread} unread</span>}
          </p>
          {messages.length === 0 ? (
            <p className="text-sm text-[#4e4e4e]">No messages yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-[#4e4e4e] text-left border-b border-[#252525]">
                    <th className="pb-2 pr-6 font-normal">Date / Time</th>
                    <th className="pb-2 pr-6 font-normal">Name</th>
                    <th className="pb-2 pr-6 font-normal">Email</th>
                    <th className="pb-2 pr-6 font-normal">Message</th>
                    <th className="pb-2 pr-6 font-normal">Page</th>
                    <th className="pb-2 font-normal"></th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(m => (
                    <tr
                      key={m.id}
                      onClick={() => { if (!m.read) markRead(m.id) }}
                      className={`border-b border-[#1d1d1d] cursor-pointer transition-colors ${
                        m.read ? 'hover:bg-white/[0.02]' : 'bg-white/[0.03] hover:bg-white/[0.05]'
                      }`}
                    >
                      <td className="py-3 pr-6 whitespace-nowrap">
                        <span className={m.read ? 'text-[#4e4e4e]' : 'text-[#d8d8d8]'}>
                          {new Date(m.sent_at).toLocaleString()}
                        </span>
                      </td>
                      <td className={`py-3 pr-6 ${m.read ? 'text-[#4e4e4e]' : 'text-[#d8d8d8] font-medium'}`}>
                        {m.name ?? '—'}
                      </td>
                      <td className={`py-3 pr-6 ${m.read ? 'text-[#4e4e4e]' : 'text-[#d8d8d8]'}`}>
                        {m.email ?? '—'}
                      </td>
                      <td className={`py-3 pr-6 max-w-xs ${m.read ? 'text-[#4e4e4e]' : 'text-[#d8d8d8]'}`}>
                        {m.message ?? '—'}
                      </td>
                      <td className="py-3 pr-6 text-[#4e4e4e]">{m.page ?? '—'}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          {m.read && (
                            <button
                              onClick={e => { e.stopPropagation(); markUnread(m.id) }}
                              className="text-[11px] text-[#4e4e4e] hover:text-[#7b7b7b] transition-colors px-2 py-1 border border-[#252525] rounded"
                            >
                              Unread
                            </button>
                          )}
                          <button
                            onClick={e => { e.stopPropagation(); deleteMessage(m.id) }}
                            className="text-[#4e4e4e] hover:text-red-400 transition-colors p-1"
                            aria-label="Delete message"
                          >
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
