'use client'

import { useState } from 'react'

export default function QuestionnaireForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('') // Add email state
  const [age, setAge] = useState('')
  const [hobby, setHobby] = useState('')

  async function sendEmail() {
    try {
      const body = `Name: ${name}\nEmail: ${email}\nAge: ${age}\nHobby: ${hobby}`
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `Questionnaire Response from ${email}`,
          body,
        }),
      })
      setName('')
      setEmail('')
      setAge('')
      setHobby('')
      alert('Response sent successfully!')
    } catch (e) {
      console.error(e)
      alert('Failed to send response')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">Questionnaire</h2>
        {[
          { label: 'Name', value: name, setter: setName },
          { label: 'Email', value: email, setter: setEmail },
          { label: 'Age', value: age, setter: setAge },
          { label: 'Favorite Hobby', value: hobby, setter: setHobby },
        ].map(({ label, value, setter }) => (
          <div key={label} className="mt-4">
            <label className="block text-sm font-medium text-gray-400">{label}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
            />
          </div>
        ))}
        <button
          onClick={sendEmail}
          className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Responses
        </button>
      </div>
    </div>
  )
}
