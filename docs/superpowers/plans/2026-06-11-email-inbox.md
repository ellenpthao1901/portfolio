# Email Inbox Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the SAP page contact form to a Supabase `inbox` table, add a `/admin/inbox` page, and preview the 5 most recent messages on the main admin dashboard.

**Architecture:** A `useContactForm` hook manages form state and Supabase inserts. The SAP form uses it with a hardcoded name (`"Anon"`) and pre-filled read-only message. A shared `AdminNav` component is extracted from `Admin.tsx` for reuse. `AdminInbox.tsx` redirects to `/admin` if not authed, then shows all messages. The admin dashboard gets a "Recent Messages" panel fetching the latest 5 inbox rows.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Supabase JS client, react-router-dom v7

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/hooks/useContactForm.ts` | Form state + Supabase insert |
| Create | `src/components/AdminNav.tsx` | Shared admin navbar |
| Create | `src/pages/AdminInbox.tsx` | Full inbox page |
| Modify | `src/pages/case-studies/SAP.tsx` | Wire form to hook |
| Modify | `src/pages/Admin.tsx` | Use AdminNav, add Recent Messages panel |
| Modify | `src/App.tsx` | Add `/admin/inbox` route |

---

## Task 1: Create the `inbox` table in Supabase

**This task is done in the Supabase dashboard (SQL editor), not in code.**

- [ ] **Step 1: Create the table**

In Supabase → SQL Editor, run:

```sql
create table inbox (
  id uuid primary key default gen_random_uuid(),
  sent_at timestamptz not null default now(),
  name text,
  email text,
  message text,
  page text
);
```

- [ ] **Step 2: Enable Row Level Security**

```sql
alter table inbox enable row level security;
```

- [ ] **Step 3: Add anon INSERT policy**

```sql
create policy "anon can insert inbox"
on inbox
for insert
to anon
with check (true);
```

- [ ] **Step 4: Add anon SELECT policy**

```sql
create policy "anon can select inbox"
on inbox
for select
to anon
using (true);
```

- [ ] **Step 5: Verify in Supabase Table Editor**

Open the `inbox` table. It should be empty with columns: `id`, `sent_at`, `name`, `email`, `message`, `page`.

---

## Task 2: Build `useContactForm` hook

**Files:**
- Create: `src/hooks/useContactForm.ts`

- [ ] **Step 1: Create the hook**

Create `src/hooks/useContactForm.ts`:

```typescript
import { useState } from 'react'
import { supabase } from '../lib/supabase'

type Status = 'idle' | 'sending' | 'sent' | 'error'

type Fields = {
  name: string
  email: string
  message: string
}

export function useContactForm(initial: Partial<Fields> = {}) {
  const [fields, setFields] = useState<Fields>({
    name: initial.name ?? '',
    email: initial.email ?? '',
    message: initial.message ?? '',
  })
  const [status, setStatus] = useState<Status>('idle')

  function setField(field: keyof Fields, value: string) {
    setFields(prev => ({ ...prev, [field]: value }))
  }

  async function submit(page: string) {
    setStatus('sending')
    const { error } = await supabase.from('inbox').insert({
      name: fields.name || null,
      email: fields.email || null,
      message: fields.message || null,
      page,
    })
    if (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('sent')
    }
  }

  function reset() {
    setFields({ name: '', email: '', message: '' })
    setStatus('idle')
  }

  return { fields, status, setField, submit, reset }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/I769741/Library/CloudStorage/OneDrive-SAPSE/Desktop/portfolio/.claude/worktrees/email-inbox && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useContactForm.ts
git commit -m "feat: add useContactForm hook"
```

---

## Task 3: Extract `AdminNav` shared component

**Files:**
- Create: `src/components/AdminNav.tsx`
- Modify: `src/pages/Admin.tsx`

- [ ] **Step 1: Create `src/components/AdminNav.tsx`**

```typescript
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
```

- [ ] **Step 2: Replace the inline navbar in `src/pages/Admin.tsx`**

At the top of `Admin.tsx`, add the import:

```typescript
import AdminNav from '../components/AdminNav'
```

Then replace the inline `<nav>` block (lines ~247–261) with:

```tsx
<AdminNav onLogout={() => {
  sessionStorage.removeItem('admin_authed')
  setAuthed(false)
}} />
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/I769741/Library/CloudStorage/OneDrive-SAPSE/Desktop/portfolio/.claude/worktrees/email-inbox && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/AdminNav.tsx src/pages/Admin.tsx
git commit -m "refactor: extract AdminNav shared component from Admin.tsx"
```

---

## Task 4: Wire the SAP form to `useContactForm`

**Files:**
- Modify: `src/pages/case-studies/SAP.tsx`

- [ ] **Step 1: Add import at the top of `SAP.tsx`**

Add this import alongside the existing imports:

```typescript
import { useContactForm } from '../../hooks/useContactForm'
```

- [ ] **Step 2: Initialize the hook inside the `SAP` component**

Add this line inside `export default function SAP()`, after the existing `useState` calls:

```typescript
const { fields, status, setField, submit } = useContactForm({
  message: 'I want to learn more about your SAP work',
})
```

- [ ] **Step 3: Replace the existing form block**

Find the existing `{/* Enter pill input */}` form block (starting at the `<form onSubmit={e => e.preventDefault()}>` line) and replace it entirely with:

```tsx
{/* Contact form */}
{status === 'sent' ? (
  <p className="text-[15px] text-[#ebebeb] mt-7">Message sent! I'll get back to you soon.</p>
) : (
  <div className="flex flex-col gap-3 mt-7">
    <form
      onSubmit={e => { e.preventDefault(); submit('sap') }}
      className="flex items-center gap-2 pl-6 pr-2 py-2 w-full"
      style={{
        borderRadius: '9999px',
        background:
          'linear-gradient(180deg, #1c1c1c 0%, #161616 90%, rgba(255,255,255,0.08) 99%, #1c1c1c 100%) padding-box, linear-gradient(190deg, rgba(255,255,255,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4) 60%, rgba(255,255,255,0.40) 100%) border-box',
        border: '1.5px solid transparent',
        boxShadow: '0 12px 32px 0 rgba(0, 0, 0, 0.35)',
      }}
    >
      <input
        type="email"
        placeholder="Your email…"
        aria-label="Email"
        required
        disabled={status === 'sending'}
        value={fields.email}
        onChange={e => setField('email', e.target.value)}
        className="flex-1 bg-transparent border-0 outline-none text-[15px] text-[#ebebeb] placeholder:text-[#888] py-1"
      />
      <button
        type="submit"
        aria-label="Send message"
        disabled={status === 'sending'}
        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors disabled:opacity-50"
        style={{ border: '1.2px solid rgba(255, 255, 255, 0.55)' }}
      >
        {status === 'sending' ? (
          <svg className="w-4 h-4 animate-spin text-[#ebebeb]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#ebebeb]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="13 6 19 12 13 18" />
          </svg>
        )}
      </button>
    </form>
    <p className="text-[13px] text-[#555] pl-6 italic">
      "{fields.message}"
    </p>
    {status === 'error' && (
      <p className="text-red-400 text-[13px] pl-6">Something went wrong, try again.</p>
    )}
  </div>
)}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/I769741/Library/CloudStorage/OneDrive-SAPSE/Desktop/portfolio/.claude/worktrees/email-inbox && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Smoke test in browser**

```bash
npm run dev
```

Navigate to `http://localhost:5173/sap`, scroll to the confidential section. You should see:
- Email input field
- Italic pre-filled message below the form pill
- Submit arrow button
- On submit with a valid email → spinner → "Message sent!" text
- Check Supabase Table Editor → `inbox` table has a new row with `name: "Anon"`, `page: "sap"`

- [ ] **Step 6: Commit**

```bash
git add src/pages/case-studies/SAP.tsx
git commit -m "feat: wire SAP contact form to useContactForm hook"
```

---

## Task 5: Build `AdminInbox` page

**Files:**
- Create: `src/pages/AdminInbox.tsx`

- [ ] **Step 1: Create `src/pages/AdminInbox.tsx`**

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/I769741/Library/CloudStorage/OneDrive-SAPSE/Desktop/portfolio/.claude/worktrees/email-inbox && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/AdminInbox.tsx
git commit -m "feat: add AdminInbox page"
```

---

## Task 6: Add `/admin/inbox` route to `App.tsx`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add import and route to `src/App.tsx`**

Add the import at the top alongside the existing Admin import:

```typescript
import AdminInbox from './pages/AdminInbox'
```

Add the route after the existing `/admin` route:

```tsx
<Route path="/admin" element={<Admin />} />
<Route path="/admin/inbox" element={<AdminInbox />} />
```

The full updated `App.tsx`:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import PageTransition from './components/PageTransition'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import SAP from './pages/case-studies/SAP'
import ViettelDigital from './pages/case-studies/ViettelDigital'
import Pods from './pages/case-studies/Pods'
import Kitsap from './pages/case-studies/Kitsap'
import Admin from './pages/Admin'
import AdminInbox from './pages/AdminInbox'
import { useVisitorTracking } from './hooks/useVisitorTracking'

export default function App() {
  useVisitorTracking()

  return (
    <BrowserRouter>
      <Cursor />
      <PageTransition />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sap" element={<SAP />} />
          <Route path="/viettel-digital" element={<ViettelDigital />} />
          <Route path="/pods" element={<Pods />} />
          <Route path="/kitsap" element={<Kitsap />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/inbox" element={<AdminInbox />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/I769741/Library/CloudStorage/OneDrive-SAPSE/Desktop/portfolio/.claude/worktrees/email-inbox && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add /admin/inbox route"
```

---

## Task 7: Add Recent Messages panel to Admin dashboard

**Files:**
- Modify: `src/pages/Admin.tsx`

- [ ] **Step 1: Add `Message` type and inbox fetch to `Admin.tsx`**

Add the type after the existing `Visitor` type:

```typescript
type Message = {
  id: string
  sent_at: string
  name: string | null
  email: string | null
  message: string | null
  page: string | null
}
```

Add a new state variable inside the `Admin` component after the existing state declarations:

```typescript
const [recentMessages, setRecentMessages] = useState<Message[]>([])
```

Add a second `useEffect` after the existing visitors fetch:

```typescript
useEffect(() => {
  if (!authed) return
  supabase
    .from('inbox')
    .select('*')
    .order('sent_at', { ascending: false })
    .limit(5)
    .then(({ data }) => setRecentMessages(data ?? []))
}, [authed])
```

- [ ] **Step 2: Add a `timeAgo` helper function**

Add this function above the `Admin` component (after the other helper functions):

```typescript
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}
```

- [ ] **Step 3: Add the Recent Messages panel to the dashboard JSX**

Add this block after the `<TopList title="By Device" ... />` line in the return JSX:

```tsx
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
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/I769741/Library/CloudStorage/OneDrive-SAPSE/Desktop/portfolio/.claude/worktrees/email-inbox && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Admin.tsx
git commit -m "feat: add recent messages panel to admin dashboard"
```

---

## Task 8: Final verification and push

- [ ] **Step 1: Full TypeScript check**

```bash
cd /Users/I769741/Library/CloudStorage/OneDrive-SAPSE/Desktop/portfolio/.claude/worktrees/email-inbox && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Build check**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Manual end-to-end test**

1. Navigate to `http://localhost:5173/sap`, scroll to confidential section
2. Enter an email and submit → spinner → "Message sent!" appears
3. Check Supabase `inbox` table → row with `name: "Anon"`, `email`, `message`, `page: "sap"`
4. Navigate to `http://localhost:5173/admin` → login → scroll to bottom → "Recent Messages" panel shows the message
5. Click "View all →" → navigates to `/admin/inbox` → full table shows all messages
6. Navigate to `/admin/inbox` directly without being logged in → redirects to `/admin`

- [ ] **Step 4: Push branch**

```bash
git push -u origin worktree-email-inbox
```
