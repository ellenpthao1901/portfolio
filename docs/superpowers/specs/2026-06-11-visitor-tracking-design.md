# Visitor Tracking — Design Spec
Date: 2026-06-11

## Overview

Track unique visitors to the portfolio site — their location (city, region, country) and device type — and store each visit in Supabase. A session lasts 24 hours; repeat visitors within that window are skipped. A password-protected `/admin` page displays the collected data.

---

## Data Model

**Table:** `visitors` (Supabase / Postgres)

| Column | Type | Default | Notes |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | Primary key |
| `visited_at` | `timestamptz` | `now()` | When the visit was recorded |
| `city` | `text` | — | e.g. `"Seattle"` |
| `region` | `text` | — | State/province, e.g. `"Washington"` |
| `country` | `text` | — | e.g. `"United States"` |
| `device` | `text` | — | One of `"mobile"`, `"tablet"`, `"desktop"` |

**RLS Policies:**
- Anon role: `INSERT` only (used by the tracking hook)
- Authenticated role: `SELECT` only (used by the admin dashboard)

---

## Tracking Hook

**File:** `src/hooks/useVisitorTracking.ts`  
**Called from:** `App.tsx` (once on mount)

**Flow:**
1. Check `localStorage` for `visitor_tracked_at` timestamp
2. If stored timestamp is within the last 24 hours → exit, do nothing
3. Call `http://ip-api.com/json/` — returns `city`, `regionName`, `country`
4. Parse `navigator.userAgent` to classify device as `mobile`, `tablet`, or `desktop`
5. Insert one row into the `visitors` table via Supabase JS client
6. On success, write `visitor_tracked_at = Date.now()` to `localStorage`

**Supabase client:** `src/lib/supabase.ts`  
Initialized with env vars `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

---

## Admin Dashboard

**Route:** `/admin`  
**File:** `src/pages/Admin.tsx`

### Password Gate
1. On load, check `sessionStorage` for `admin_authed`
2. If absent, render a centered password input form
3. On submit, compare input against `VITE_ADMIN_PASSWORD` env var
4. Match → set `sessionStorage.admin_authed = "true"`, show dashboard
5. No match → show inline error, stay on gate

### Dashboard View (authenticated)
- Fetch all rows from `visitors` ordered by `visited_at` desc
- Summary line at top: total visit count
- Table columns: Date/Time · City · Region · Country · Device

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `VITE_ADMIN_PASSWORD` | Password for the `/admin` gate |

---

## New Files

- `src/lib/supabase.ts` — Supabase client singleton
- `src/hooks/useVisitorTracking.ts` — tracking hook
- `src/pages/Admin.tsx` — admin dashboard page

## Modified Files

- `src/App.tsx` — call `useVisitorTracking()`, add `/admin` route
