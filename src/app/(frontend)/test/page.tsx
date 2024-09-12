'use client'
import { useState } from 'react'

export default function TestPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')

  const sendEmail = async () => {
    if (!username.trim()) {
      setErrorMessage('Please enter a username')
      return
    }

    setStatus('loading')
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
      } else {
        throw new Error(data.error || 'Failed to send email')
      }
    } catch (error) {
      console.error('Error in sendEmail function:', error)
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : String(error))
    }
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={sendEmail} disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Email'}
      </button>
      {status === 'success' && <p>Email sent successfully!</p>}
      {status === 'error' && <p>Error sending email: {errorMessage}</p>}
    </div>
  )
}
