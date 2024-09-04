'use client'

import { useState } from 'react'

export default function QuestionnaireForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('') // Add email state
  const [age, setAge] = useState('')
  const [hobby, setHobby] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const questions = [
    { label: 'Name', value: name, setter: setName },
    { label: 'Email', value: email, setter: setEmail },
    { label: 'Age', value: age, setter: setAge },
    { label: 'Favorite Hobby', value: hobby, setter: setHobby },
  ]

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
      setIsSubmitted(true)
    } catch (e) {
      console.error(e)
      alert('Failed to send response')
    }
  }

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-4xl font-extrabold text-white text-center">
          Your training begins today
        </h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">Questionnaire</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-400">
            {questions[currentQuestion].label}
          </label>
          <input
            type="text"
            value={questions[currentQuestion].value}
            onChange={(e) => questions[currentQuestion].setter(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
          />
        </div>
        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        ) : (
          <button
            onClick={sendEmail}
            className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Responses
          </button>
        )}
      </div>
    </div>
  )
}
