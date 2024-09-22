'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/react-tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle2, Circle, Dumbbell } from 'lucide-react'

type Exercise = {
  id: number
  name: string
  date: Date
  completed: boolean
}

export default function WorkoutTracker() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [newExercise, setNewExercise] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const addExercise = () => {
    if (newExercise.trim() !== '' && selectedDate) {
      setExercises([
        ...exercises,
        {
          id: Date.now(),
          name: newExercise,
          date: selectedDate,
          completed: false,
        },
      ])
      setNewExercise('')
    }
  }

  const toggleExercise = (id: number) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise,
      ),
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const plannedExercises = exercises.filter((exercise) => !exercise.completed)
  const completedExercises = exercises.filter((exercise) => exercise.completed)

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Workout Planner & Tracker</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Plan Your Workout</h3>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="exercise">Exercise Name</Label>
              <Input
                id="exercise"
                value={newExercise}
                onChange={(e) => setNewExercise(e.target.value)}
                placeholder="Enter exercise name"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
            <Button onClick={addExercise} className="w-full">
              Add Exercise
            </Button>
          </div>
        </div>
        <div>
          <Tabs defaultValue="planned" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="planned">Planned</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="planned">
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                {plannedExercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(exercise.date)}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleExercise(exercise.id)}>
                      <Circle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="completed">
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                {completedExercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(exercise.date)}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleExercise(exercise.id)}>
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
