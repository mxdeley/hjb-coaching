'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { z } from 'zod'
import IntroView from './_components/intro-view'
import QuestionnaireForm from './_components/questionaire-form'
import { SubmittedView } from './_components/submitted-view'

export type Question = {
  label: string
  name: keyof FormInputs | string
  type?: 'text' | 'email' | 'select' | 'button' | 'social' | 'date' | 'radio-with-other'
  options?: string[]
}

const questions: Question[] = [
  {
    label: 'Which body type are you?',
    name: 'bodyType',
    type: 'button',
    options: ['Ectomorph', 'Endomorph', 'Mesomorph'],
  },
  { label: 'What is your name?', name: 'name' },
  { label: 'What is your email for contact?', name: 'email' },
  {
    label: 'What are your social media handles?',
    name: 'socialMedia',
    type: 'social',
  },
  { label: 'What is your age?', name: 'age' },
  {
    label: 'What are your fitness goals?',
    name: 'fitnessGoals',
    type: 'radio-with-other',
    options: [
      'Build More Muscle',
      'Lose Body Fat',
      'Improve General Fitness',
      'Want to compete in a Physique contest',
      'Other',
    ],
  },
  {
    label: 'What is your ideal start date?',
    name: 'startDate',
    type: 'date',
  },
  { label: 'What is your phone number? (so I can contact you on WhatsApp)', name: 'phone' },
]

// Define schema
export const questionSchemas = {
  bodyType: z.enum(['Ectomorph', 'Endomorph', 'Mesomorph']),
  name: z.string().min(2),
  email: z.string().email(),
  socialMedia: z.object({
    instagram: z.string().optional(),
    x: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),
  }),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 16 && Number(val) <= 120),
  fitnessGoals: z.union([
    z.enum([
      'Build More Muscle',
      'Lose Body Fat',
      'Improve General Fitness',
      'Want to compete in a Physique contest',
    ]),
    z.object({
      other: z.string().min(1),
    }),
  ]),
  startDate: z.date(),
  phone: z.string().min(10),
}

export const formSchema = z.object({
  ...questionSchemas,
  currentQuestion: z
    .number()
    .min(0)
    .max(questions.length - 1),
})

export type FormInputs = z.infer<typeof formSchema>

export default function GetStartedPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)

  const onSubmit = async (data: FormInputs) => {
    try {
      const fitnessGoal =
        typeof data.fitnessGoals === 'string'
          ? data.fitnessGoals
          : `Other: ${data.fitnessGoals.other}`

      const body = `Name: ${data.name}
Email: ${data.email}
Age: ${data.age}
Start Date: ${format(data.startDate, 'PPP')}
Fitness Goals: ${fitnessGoal}
Social Media:
  Instagram: ${data.socialMedia.instagram || 'N/A'}
  X: ${data.socialMedia.x || 'N/A'}
  Facebook: ${data.socialMedia.facebook || 'N/A'}
  TikTok: ${data.socialMedia.tiktok || 'N/A'}`
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

  return <QuestionnaireForm onSubmit={onSubmit} questions={questions} />
}
