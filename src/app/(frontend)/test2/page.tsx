'use client'

import { useState } from 'react'

export default function BasicEmail() {
  const [subject, setSubject] = useState()
  const [body, setBody] = useState()

  async function sendEmail() {
    try {
      await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, body }),
      })
      setSubject('')
      setBody('')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">Send an Email</h2>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-400">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-400">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 p-2 w-full h-32 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
          ></textarea>
        </div>
        <div className="mt-4">
          <button
            onClick={sendEmail}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  )
}
