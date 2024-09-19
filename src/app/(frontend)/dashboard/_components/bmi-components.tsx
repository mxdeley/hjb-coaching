'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

const BMIScale = ({ bmi }: { bmi: number | null }) => {
  const getColor = (value: number) => {
    if (value < 18.5) return 'bg-blue-500'
    if (value < 25) return 'bg-green-500'
    if (value < 30) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getPosition = (value: number) => {
    const minBMI = 10
    const maxBMI = 40
    const position = ((value - minBMI) / (maxBMI - minBMI)) * 100
    return Math.min(Math.max(position, 0), 100)
  }

  return (
    <div className="mt-4">
      <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-1/4 bg-blue-500" />
        <div className="absolute top-0 left-1/4 h-full w-1/4 bg-green-500" />
        <div className="absolute top-0 left-2/4 h-full w-1/4 bg-yellow-500" />
        <div className="absolute top-0 left-3/4 h-full w-1/4 bg-red-500" />
        {bmi !== null && (
          <div
            className={`absolute top-0 w-4 h-4 -ml-2 rounded-full ${getColor(bmi)} border-2 border-white`}
            style={{ left: `${getPosition(bmi)}%` }}
          />
        )}
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
    </div>
  )
}

export default function Component() {
  const [isMetric, setIsMetric] = useState(true)
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')
  const [recommendation, setRecommendation] = useState('')

  const calculateBMI = () => {
    let bmiValue: number

    if (isMetric) {
      const heightInMeters = parseFloat(height) / 100
      const weightInKg = parseFloat(weight)
      bmiValue = weightInKg / (heightInMeters * heightInMeters)
    } else {
      const heightInInches = parseFloat(height)
      const weightInLbs = parseFloat(weight)
      bmiValue = (weightInLbs / (heightInInches * heightInInches)) * 703
    }

    setBmi(parseFloat(bmiValue.toFixed(1)))

    if (bmiValue < 18.5) {
      setCategory('Underweight')
      setRecommendation(
        'Increase calorie intake with nutrient-dense foods. Focus on protein, healthy fats, and complex carbohydrates.',
      )
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal weight')
      setRecommendation(
        'Maintain a balanced diet with plenty of fruits, vegetables, lean proteins, and whole grains.',
      )
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight')
      setRecommendation(
        'Reduce calorie intake, increase physical activity. Focus on portion control and choosing low-calorie, nutrient-dense foods.',
      )
    } else {
      setCategory('Obese')
      setRecommendation(
        'Consult a healthcare professional. Focus on a balanced, calorie-controlled diet and regular exercise.',
      )
    }
  }

  const toggleSystem = () => {
    setIsMetric(!isMetric)
    setHeight('')
    setWeight('')
    setBmi(null)
    setCategory('')
    setRecommendation('')
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>Calculate your BMI and get diet recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="system-toggle">Measurement System</Label>
            <div className="flex items-center space-x-2">
              <span>Imperial</span>
              <Switch id="system-toggle" checked={isMetric} onCheckedChange={toggleSystem} />
              <span>Metric</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height ({isMetric ? 'cm' : 'inches'})</Label>
            <Input
              id="height"
              placeholder={`Enter your height in ${isMetric ? 'cm' : 'inches'}`}
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight ({isMetric ? 'kg' : 'lbs'})</Label>
            <Input
              id="weight"
              placeholder={`Enter your weight in ${isMetric ? 'kg' : 'lbs'}`}
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <Button onClick={calculateBMI} className="w-full">
            Calculate BMI
          </Button>
          {bmi !== null && (
            <div className="mt-4 p-4 bg-secondary rounded-md">
              <p className="font-semibold">Your BMI: {bmi}</p>
              <p className="font-semibold">Category: {category}</p>
              <BMIScale bmi={bmi} />
              <p className="mt-2">Recommendation: {recommendation}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
