import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import ProgrammesList from './_components/programmes-list'

interface Workout {
  id: string
  title: string
  description: string
}

type WorkoutsByCategory = Record<string, Workout[]>

export default async function Programmes() {
  const payload = await getPayloadHMR({
    config,
  })

  const workouts = await payload.find({
    collection: 'workouts',
  })

  const workoutsByCategory = workouts.docs.reduce<Record<string, Workout[]>>((acc, workout) => {
    const category = workout.category || 'Uncategorized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(workout as any)
    return acc
  }, {}) as WorkoutsByCategory

  return (
    <ProgrammesList
      initialWorkouts={workoutsByCategory}
      cardStyle="p-4 border rounded-lg shadow-md mb-4"
      categoryStyle="font-bold text-xl mb-2"
    />
  )
}
