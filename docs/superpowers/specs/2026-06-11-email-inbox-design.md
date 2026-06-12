# Email Inbox — Design Spec
Date: 2026-06-11

## Overview

Wire the existing "email me" form on the SAP case study page to a Supabase `inbox` table. Visitors submit their email and a pre-filled message; submissions are readable in a new `/admin/inbox` page and previewed (5 most recent) on the main `/admin` dashboard.

---

## Data Model

**Table:** `inbox` (Supabase / Postgres)

| Column | Type | Default | Notes |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | Primary key |
| `sent_at` | `timestamptz` | `now()` | When message was submitted |
| `name` | `text` | — | Sender name (`"Anon"` for SAP form) |
| `email` | `text` | — | Sender email |
| `message` | `text` | — | Message body |
| `page` | `text` | — | Source page slug, e.g. `"sap"` |

**RLS Policies:**
- Anon role: `INSERT` only (used by the contact form)
- Authenticated role: `SELECT` only (used by admin inbox)

---

## `useContactForm` Hook

**File:** `src/hooks/useContactForm.ts`

Manages all form state and submission logic. Keeps UI components free of Supabase calls.

**State shape:**
```typescript
{
  name: string
  email: string
  message: string
  status: 'idle' | 'sending' | 'sent' | 'error'
}
```

**Exposed API:**
- `fields` — current field values
- `status` — current submission status
- `setField(field: 'name' | 'email' | 'message', value: string): void`
- `submit(page: string): Promise<void>` — inserts into `inbox`, updates status
- `reset(): void` — resets to idle + clears fields

---

## SAP Form

**File:** `src/pages/case-studies/SAP.tsx` (modified)

The existing pill-shaped form is extended:
- **Email field** — one text input for sender's email (required)
- **Message field** — pre-filled with `"I want to learn more about your SAP work"`, read-only (locked)
- **Name** — hardcoded to `"Anon"` on submit, not shown in the UI
- **Page** — hardcoded to `"sap"` on submit

**States:**
- `idle` — form visible, submit arrow button enabled
- `sending` — button shows a spinner, inputs disabled
- `sent` — form replaced with `"Message sent!"` confirmation text
- `error` — inline error `"Something went wrong, try again"` shown below form, status resets to `idle`

---

## Admin Dashboard Preview

**File:** `src/pages/Admin.tsx` (modified)

A "Recent Messages" panel added at the bottom of the dashboard:
- Fetches the 5 most recent rows from `inbox` ordered by `sent_at` desc
- Each row shows: sender email · truncated message (max ~60 chars) · relative time (e.g. `"2h ago"`)
- A `"View all →"` link navigates to `/admin/inbox` via `<Link>`
- If no messages yet, panel renders nothing

---

## `/admin/inbox` Page

**File:** `src/pages/AdminInbox.tsx` (new)

**Password gate:** same logic as `Admin.tsx` — checks `sessionStorage.admin_authed`. If not authed, redirects to `/admin` via `<Navigate>` (avoids duplicating the password form).

**Admin navbar:** same Work · About · Log out bar as `Admin.tsx`. Extract to a shared `AdminNav` component to avoid duplication.

**Table:** all inbox rows ordered by `sent_at` desc
- Columns: Date/Time · Name · Email · Message · Page
- No pagination (YAGNI)
- Empty state: `"No messages yet"`

---

## Routing

**File:** `src/App.tsx` (modified)

```tsx
<Route path="/admin/inbox" element={<AdminInbox />} />
```

Added alongside the existing `/admin` route, outside the `<Layout />` wrapper.

---

## New Files

- `src/hooks/useContactForm.ts` — form state + Supabase insert hook
- `src/pages/AdminInbox.tsx` — full inbox page
- `src/components/AdminNav.tsx` — shared admin navbar (extracted from Admin.tsx)

## Modified Files

- `src/pages/case-studies/SAP.tsx` — wire form to `useContactForm`
- `src/pages/Admin.tsx` — add Recent Messages panel, use `AdminNav`
- `src/App.tsx` — add `/admin/inbox` route
