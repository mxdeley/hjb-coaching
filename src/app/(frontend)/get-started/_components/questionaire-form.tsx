'use client'

import { useState, useCallback } from 'react'
import { FormInputs, Question } from '../page'

type Props = {
  onSubmit: (data: FormInputs) => Promise<void>
  questions: Question[]
}

export default function QuestionnaireForm({ onSubmit, questions }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [formData, setFormData] = useState<Partial<FormInputs>>({})
  const [errors, setErrors] = useState<Partial<Record<keyof FormInputs, string>>>({})

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }, [currentQuestion])

  const handleNext = useCallback(() => {
    const currentField = questions[currentQuestion].name as keyof FormInputs
    const currentValue = formData[currentField]

    // Simple validation - you might want to implement more robust validation
    if (!currentValue) {
      setErrors({ ...errors, [currentField]: 'This field is required' })
      return
    }

    setErrors({ ...errors, [currentField]: undefined })

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }, [currentQuestion, formData, errors, questions])

  const handleInputChange = (name: keyof FormInputs, value: string) => {
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: undefined })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // You might want to add final validation here before submitting
    onSubmit(formData as FormInputs)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden relative">
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
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-400">
                  {questions[currentQuestion].label}
                </label>
                {questions[currentQuestion].type === 'button' ? (
                  <div className="flex space-x-2 mt-2">
                    {questions[currentQuestion].options?.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          handleInputChange(
                            questions[currentQuestion].name as keyof FormInputs,
                            option,
                          )
                        }
                        className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                          formData[questions[currentQuestion].name as keyof FormInputs] === option
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : questions[currentQuestion].type === 'select' ? (
                  <select
                    value={formData[questions[currentQuestion].name as keyof FormInputs] || ''}
                    onChange={(e) =>
                      handleInputChange(
                        questions[currentQuestion].name as keyof FormInputs,
                        e.target.value,
                      )
                    }
                    className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
                  >
                    <option value="">Select an option</option>
                    {questions[currentQuestion].options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={formData[questions[currentQuestion].name as keyof FormInputs] || ''}
                    onChange={(e) =>
                      handleInputChange(
                        questions[currentQuestion].name as keyof FormInputs,
                        e.target.value,
                      )
                    }
                    type={questions[currentQuestion].name === 'email' ? 'email' : 'text'}
                    className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
                  />
                )}
                {errors[questions[currentQuestion].name as keyof FormInputs] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors[questions[currentQuestion].name as keyof FormInputs]}
                  </p>
                )}
              </div>
              <div className="flex justify-between mt-6 w-full gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                >
                  Back
                </button>
                {currentQuestion < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/questionaire-2.jpg')" }}
      />
    </div>
  )
}
