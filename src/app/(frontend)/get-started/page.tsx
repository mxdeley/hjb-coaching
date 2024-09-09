'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { z } from 'zod'
import IntroView from './_components/intro-view'
import QuestionnaireForm from './_components/questionaire-form'
import { SubmittedView } from './_components/submitted-view'
import { FormInputs, questions } from './_components/schemas'

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
