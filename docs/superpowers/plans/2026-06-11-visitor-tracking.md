# Visitor Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Track unique visitors (city, region, country, device) in Supabase with a 24h dedup session, a password-gated `/admin` dashboard, and a footer "last visitor" indicator.

**Architecture:** A `useVisitorTracking` hook fires on app mount, checks `localStorage` for a 24h session gate, calls `ip-api.com` for geo, detects device from `navigator.userAgent`, and inserts into Supabase. The footer fetches the single most recent row (independent of the current user) and displays it with a pulsing dot. The `/admin` route is gated by an env-var password checked against `sessionStorage`.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Supabase JS client (`@supabase/supabase-js`), `ip-api.com` (free, no key), `react-router-dom` v7

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/lib/supabase.ts` | Supabase client singleton |
| Create | `src/hooks/useVisitorTracking.ts` | 24h gate + geo fetch + insert |
| Create | `src/pages/Admin.tsx` | Password gate + visitor table |
| Modify | `src/components/Footer.tsx` | Add last-visitor display |
| Modify | `src/App.tsx` | Call hook, add `/admin` route |

---

## Task 1: Install Supabase and create the client singleton

**Files:**
- Modify: `package.json` (via npm install)
- Create: `src/lib/supabase.ts`

- [ ] **Step 1: Install the Supabase JS client**

```bash
npm install @supabase/supabase-js
```

Expected: `@supabase/supabase-js` appears in `package.json` dependencies.

- [ ] **Step 2: Create the `.env` file**

Create `.env` in the project root (this file is gitignored — never commit it):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=your-chosen-password
```

Replace the placeholder values with your actual Supabase project URL and anon key (found in Supabase dashboard → Settings → API).

- [ ] **Step 3: Create the Supabase client singleton**

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase.ts package.json package-lock.json
git commit -m "feat: add supabase client singleton"
```

---

## Task 2: Create the Supabase `visitors` table and RLS policies

**This task is done in the Supabase dashboard (SQL editor), not in code.**

- [ ] **Step 1: Create the table**

In Supabase → SQL Editor, run:

```sql
create table visitors (
  id uuid primary key default gen_random_uuid(),
  visited_at timestamptz not null default now(),
  city text,
  region text,
  country text,
  device text
);
```

- [ ] **Step 2: Enable Row Level Security**

```sql
alter table visitors enable row level security;
```

- [ ] **Step 3: Add anon INSERT policy (for the tracking hook)**

```sql
create policy "anon can insert"
on visitors
for insert
to anon
with check (true);
```

- [ ] **Step 4: Add anon SELECT policy (for the footer's latest-visitor fetch)**

```sql
create policy "anon can select"
on visitors
for select
to anon
using (true);
```

Note: The anon key is public, but this table contains no personal data — only city-level geo and device type, which is acceptable.

- [ ] **Step 5: Verify in Supabase Table Editor**

Open the `visitors` table in Supabase Table Editor. It should be empty and show the correct columns: `id`, `visited_at`, `city`, `region`, `country`, `device`.

---

## Task 3: Build the `useVisitorTracking` hook

**Files:**
- Create: `src/hooks/useVisitorTracking.ts`

- [ ] **Step 1: Create the hook**

Create `src/hooks/useVisitorTracking.ts`:

```typescript
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

const SESSION_KEY = 'visitor_tracked_at'
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000

function getDevice(): 'mobile' | 'tablet' | 'desktop' {
  const ua = navigator.userAgent
  if (/Mobi|Android|iPhone|iPod/.test(ua)) return 'mobile'
  if (/iPad|Tablet/.test(ua)) return 'tablet'
  return 'desktop'
}

async function trackVisitor() {
  const lastTracked = localStorage.getItem(SESSION_KEY)
  if (lastTracked && Date.now() - Number(lastTracked) < SESSION_DURATION_MS) return

  try {
    const res = await fetch('http://ip-api.com/json/')
    if (!res.ok) return
    const data = await res.json()
    if (data.status !== 'success') return

    const { error } = await supabase.from('visitors').insert({
      city: data.city ?? null,
      region: data.regionName ?? null,
      country: data.country ?? null,
      device: getDevice(),
    })

    if (!error) {
      localStorage.setItem(SESSION_KEY, String(Date.now()))
    }
  } catch {
    // silently fail — tracking should never break the app
  }
}

export function useVisitorTracking() {
  useEffect(() => {
    trackVisitor()
  }, [])
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useVisitorTracking.ts
git commit -m "feat: add useVisitorTracking hook"
```

---

## Task 4: Wire the hook into `App.tsx` and add the `/admin` route placeholder

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update `App.tsx`**

Replace the contents of `src/App.tsx` with:

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
      </Routes>
    </BrowserRouter>
  )
}
```

Note: `/admin` is outside the `<Layout />` wrapper intentionally — it has its own full-page layout.

- [ ] **Step 2: Create a temporary `Admin` stub so TypeScript doesn't error**

Create `src/pages/Admin.tsx` with just:

```typescript
export default function Admin() {
  return <div>Admin</div>
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Smoke test in browser**

```bash
npm run dev
```

Open `http://localhost:5173`. Check the browser network tab — you should see a request to `ip-api.com/json/` fire once. Check `localStorage` in DevTools → Application → Local Storage for `visitor_tracked_at`. Check Supabase Table Editor — a row should appear in `visitors`.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/pages/Admin.tsx
git commit -m "feat: wire visitor tracking into app, add admin route stub"
```

---

## Task 5: Build the Admin page (password gate + dashboard)

**Files:**
- Modify: `src/pages/Admin.tsx`

- [ ] **Step 1: Implement the full Admin page**

Replace `src/pages/Admin.tsx` with:

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Test the password gate in browser**

```bash
npm run dev
```

Navigate to `http://localhost:5173/admin`. You should see the password form. Enter a wrong password → "Incorrect password" error. Enter the correct password (from `.env` `VITE_ADMIN_PASSWORD`) → dashboard loads with visitor rows.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Admin.tsx
git commit -m "feat: add admin dashboard with password gate"
```

---

## Task 6: Add the last-visitor indicator to the Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update `Footer.tsx`**

Replace the contents of `src/components/Footer.tsx` with:

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Test in browser**

```bash
npm run dev
```

Open `http://localhost:5173`. The footer should show `last visited in seattle, washington, united states •` (or whatever the latest row in your DB shows) with a pulsing green dot. If the DB is empty, the badge should be invisible.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add last visitor badge to footer"
```

---

## Task 7: Final verification and PR prep

- [ ] **Step 1: Full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Lint check**

```bash
npm run lint
```

Expected: No errors.

- [ ] **Step 3: Build check**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Manual end-to-end test**

1. Clear `localStorage` in DevTools (Application → Local Storage → clear all)
2. Hard refresh `http://localhost:5173`
3. Check network tab → `ip-api.com/json/` request fires
4. Check Supabase Table Editor → new row inserted
5. Check footer → last-visitor badge shows the row before yours
6. Hard refresh again without clearing localStorage → no second `ip-api.com` request fires (24h gate works)
7. Navigate to `/admin` → password gate shows → correct password → table loads

- [ ] **Step 5: Add `.env` to `.gitignore` if not already present**

```bash
grep -q "^\.env$" .gitignore || echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: ensure .env is gitignored"
```

- [ ] **Step 6: Final commit and push**

```bash
git push -u origin worktree-visitor
```

Then open a PR from `worktree-visitor` → `main`.
