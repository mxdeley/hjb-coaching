'use client'

import React, { useState } from 'react'

const ProgrammesList = ({ initialWorkouts }) => {
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
        <div key={category} className="mb-8">
          <h2 className="text-white text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workouts.map((workout) => (
              <div key={workout.id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-white text-lg font-semibold mb-2">{workout.title}</h3>
                <p className="text-gray-300 text-sm">{workout.description}</p>
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
