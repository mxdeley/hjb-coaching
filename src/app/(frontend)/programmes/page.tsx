import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import ProgrammesList from './_components/programmes-list'

export default async function Programmes() {
  const payload = await getPayloadHMR({
    config,
  })

  const workouts = await payload.find({
    collection: 'workouts',
  })

  const workoutsByCategory = workouts.docs.reduce((acc, workout) => {
    const category = workout.category || 'Uncategorized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(workout)
    return acc
  }, {})

  return <ProgrammesList initialWorkouts={workoutsByCategory} />
}
