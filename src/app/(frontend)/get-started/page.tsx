'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import QuestionnaireForm from './_components/questionaire-form'
import SubmittedView from './_components/submitted-view'
import IntroView from './_components/intro-view'

// Define schema
const formSchema = z.object({
  bodyType: z.enum(['Ectomorph', 'Endomorph', 'Mesomorph'], {
    errorMap: () => ({ message: 'Please select a valid body type' }),
  }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 16 && Number(val) <= 120, {
    message: 'Age must be a number between 16 and 120',
  }),
  hobby: z.string().min(2, { message: 'Hobby must be at least 2 characters long' }),
})

export type FormInputs = z.infer<typeof formSchema>

export type Question = {
  label: string
  name: keyof FormInputs
  type?: 'text' | 'email' | 'select' | 'button'
  options?: string[]
}

const questions: Question[] = [
  {
    label: 'Which body type are you?',
    name: 'bodyType',
    type: 'button',
    options: ['Ectomorph', 'Endomorph', 'Mesomorph'],
  },
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  { label: 'Age', name: 'age' },
  { label: 'Favorite Hobby', name: 'hobby' },
]

export default function GetStartedPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormInputs) => {
    try {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nAge: ${data.age}\nHobby: ${data.hobby}`
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `Questionnaire Response from ${data.email}`,
          body,
        }),
      })
      setIsSubmitted(true)
    } catch (e) {
      console.error(e)
      alert('Failed to send response')
    }
  }

  if (isSubmitted) {
    return <SubmittedView />
  }

  if (!showQuestionnaire) {
    return <IntroView onStart={() => setShowQuestionnaire(true)} />
  }

  return <QuestionnaireForm form={form} onSubmit={onSubmit} questions={questions} />
}
