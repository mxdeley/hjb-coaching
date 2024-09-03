'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const questions = [
  'What is your name?',
  'What is your age?',
  'What is your email?',
  'What is your favorite color?',
  'What is your hobby?',
]

const GetStarted = () => {
  const { register, handleSubmit, watch } = useForm()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const answers = watch()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const handleNext = () => {
    if (answers[`question${currentQuestion}`]) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((question, index) => (
          <div key={index} style={{ display: currentQuestion === index ? 'block' : 'none' }}>
            <label>{question}</label>
            <input {...register(`question${index}`, { required: true })} />
            {currentQuestion === index && (
              <button type="button" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        ))}
        {currentQuestion === questions.length && <button type="submit">Submit</button>}
      </form>
    </div>
  )
}

export default GetStarted
