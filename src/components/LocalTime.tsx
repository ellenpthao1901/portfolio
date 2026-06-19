import { useEffect, useState } from 'react'

function formatPacificTime() {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Los_Angeles',
  }).format(new Date())
}

export default function LocalTime() {
  const [time, setTime] = useState(formatPacificTime)

  useEffect(() => {
    const id = setInterval(() => setTime(formatPacificTime()), 30_000)
    return () => clearInterval(id)
  }, [])

  return <time>{time}</time>
}
