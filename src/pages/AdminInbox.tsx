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

  if (!authed) return <Navigate to="/admin" replace />

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111]">
        <p className="text-[#4e4e4e] text-sm tracking-widest uppercase">Loading</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111] text-[#d8d8d8] font-sans">
      <AdminNav onLogout={() => {
        sessionStorage.removeItem(AUTH_KEY)
        setAuthed(false)
      }} />
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-lg font-medium mb-1 tracking-tight">Inbox</h1>
          <p className="text-sm text-[#4e4e4e] mb-6">{messages.length} messages</p>
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
                    <th className="pb-2 font-normal">Page</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(m => (
                    <tr key={m.id} className="border-b border-[#1d1d1d] hover:bg-white/[0.02]">
                      <td className="py-3 pr-6 text-[#4e4e4e] whitespace-nowrap">
                        {new Date(m.sent_at).toLocaleString()}
                      </td>
                      <td className="py-3 pr-6">{m.name ?? '—'}</td>
                      <td className="py-3 pr-6">{m.email ?? '—'}</td>
                      <td className="py-3 pr-6 max-w-xs">{m.message ?? '—'}</td>
                      <td className="py-3 text-[#4e4e4e]">{m.page ?? '—'}</td>
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
