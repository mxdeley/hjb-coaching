'use client'

import { useState } from 'react'

export default function QuestionnaireForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('') // Add email state
  const [age, setAge] = useState('')
  const [hobby, setHobby] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)

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

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">
          Your training begins today
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl w-full">
          <a
            href="/success-stories"
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">Success Stories</h3>
            <p className="text-sm">Get inspired by others</p>
          </a>
          <a
            href="/programmes"
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">Programmes</h3>
            <p className="text-sm">Find your perfect fit</p>
          </a>
          <a
            href="/nutrition"
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">Nutrition</h3>
            <p className="text-sm">Fuel your progress</p>
          </a>
          <a
            href="/blog"
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">Blog</h3>
            <p className="text-sm">Stay informed</p>
          </a>
        </div>
      </div>
    )
  }
  if (!showQuestionnaire) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row overflow-hidden relative">
        <div className="w-full md:w-[55%] bg-gray-900 transform -skew-y-[15deg] md:skew-y-0 md:-skew-x-[15deg] origin-top-left md:origin-top-right overflow-hidden absolute inset-0 z-50 h-[55%] md:h-full">
          <div className="transform skew-y-[15deg] md:skew-y-0 md:skew-x-[15deg] h-full flex flex-col items-center justify-center p-4 md:p-0">
            <div className="absolute top-4 left-4">
              <a
                href="./"
                className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Home
              </a>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center max-w-2xl mt-12 md:mt-0">
              Fill out a short survey to find out the best workout plan for you
            </h2>
            <button
              onClick={() => setShowQuestionnaire(true)}
              className="mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started
            </button>
          </div>
        </div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/questionaire-2.jpg')" }}
        ></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden relative">
      {/* Top/Left side - Question */}
      <div className="w-full md:w-[55%] bg-gray-900 transform -skew-y-[15deg] md:skew-y-0 md:-skew-x-[15deg] origin-top-left md:origin-top-right overflow-hidden absolute inset-0 z-50 h-[55%] md:h-full">
        <div className="transform skew-y-[15deg] md:skew-y-0 md:skew-x-[15deg] h-full flex items-center justify-center">
          <div className="w-full max-w-md px-4 md:px-0">
            {currentQuestion === 0 && (
              <div className="mb-4">
                <a
                  href="./"
                  className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back to Home
                </a>
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-8">
              Questionnaire
            </h2>
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
            <div className="flex justify-between mt-6 w-full gap-4">
              <button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed w-full"
              >
                Back
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={sendEmail}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom/Right side - Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/questionaire-2.jpg')" }}
      ></div>
    </div>
  )
}
