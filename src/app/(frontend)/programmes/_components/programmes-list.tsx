'use client'

import React, { useState } from 'react'

interface Workout {
  id: string
  title: string
  description: string
  // Add other workout properties as needed
}

interface ProgrammesListProps {
  initialWorkouts: WorkoutsByCategory
  cardStyle?: string
  categoryStyle?: string
}

type WorkoutsByCategory = Record<string, Workout[]>

const ProgrammesList: React.FC<ProgrammesListProps> = ({
  initialWorkouts,
  cardStyle,
  categoryStyle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [workoutsByCategory] = useState(initialWorkouts)

  const categories = ['All', ...Object.keys(workoutsByCategory)]

  const filteredWorkouts =
    selectedCategory === 'All'
      ? workoutsByCategory
      : { [selectedCategory]: workoutsByCategory[selectedCategory] || [] }

  return (
    <div className="w-full pt-20">
      <div className="mb-8">
        <label htmlFor="category-select" className="text-white mr-2">
          Filter by category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {Object.entries(filteredWorkouts).map(([category, workouts]) => (
        <div key={category} className="mb-12">
          <h2 className="text-white text-3xl font-bold mb-6 border-b pb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-white text-xl font-semibold mb-3">{workout.title}</h3>
                <p className="text-gray-300">{workout.description}</p>
                {/* Add more workout details as needed */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProgrammesList
