import { useEffect, useState } from 'react'

export default function LocalTime() {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Los_Angeles',
      }).format(new Date())

    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 30_000)
    return () => clearInterval(id)
  }, [])

  return <time>{time}</time>
}
