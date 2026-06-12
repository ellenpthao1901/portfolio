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
