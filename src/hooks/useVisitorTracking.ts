import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

const SESSION_KEY = 'visitor_tracked_at'
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000

let tracking = false

function getDevice(): 'mobile' | 'tablet' | 'desktop' {
  const ua = navigator.userAgent
  if (/Mobi|Android|iPhone|iPod/.test(ua)) return 'mobile'
  if (/iPad|Tablet/.test(ua)) return 'tablet'
  return 'desktop'
}

async function trackVisitor() {
  if (tracking) return
  const lastTracked = localStorage.getItem(SESSION_KEY)
  if (lastTracked && Date.now() - Number(lastTracked) < SESSION_DURATION_MS) return

  tracking = true
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
  } finally {
    tracking = false
  }
}

export function useVisitorTracking() {
  useEffect(() => {
    trackVisitor()
  }, [])
}
