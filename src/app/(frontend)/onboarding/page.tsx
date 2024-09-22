// @ts-nocheck

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, Rocket, Zap, Users, BarChart } from 'lucide-react'

const steps = [
  {
    title: 'Welcome to Our App',
    description: 'Get started with the most innovative productivity tool.',
    icon: <Rocket className="w-12 h-12 text-primary" />,
  },
  {
    title: 'Boost Your Productivity',
    description: 'Our AI-powered features help you work smarter, not harder.',
    icon: <Zap className="w-12 h-12 text-primary" />,
  },
  {
    title: 'Collaborate Seamlessly',
    description: 'Work with your team in real-time, anywhere in the world.',
    icon: <Users className="w-12 h-12 text-primary" />,
  },
  {
    title: 'Track Your Progress',
    description: 'Visualize your productivity with advanced analytics.',
    icon: <BarChart className="w-12 h-12 text-primary" />,
  },
]

const backgroundImages = [
  '/placeholder.svg?height=1080&width=1920',
  '/placeholder.svg?height=1080&width=1920&text=Image+2',
  '/placeholder.svg?height=1080&width=1920&text=Image+3',
  '/placeholder.svg?height=1080&width=1920&text=Image+4',
]

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      ease: 'anticipate',
      duration: 0.3,
    },
  },
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      ease: 'anticipate',
      duration: 0.2,
    },
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
}

export default function OnboardingSequence() {
  const [currentStep, setCurrentStep] = useState(0)
  const [currentBg, setCurrentBg] = useState(backgroundImages[0])
  const [nextBg, setNextBg] = useState(backgroundImages[1])

  useEffect(() => {
    setNextBg(backgroundImages[(currentStep + 1) % backgroundImages.length])
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setCurrentBg(nextBg)
    }
  }

  const handleSkip = () => {
    setCurrentStep(steps.length - 1)
    setCurrentBg(backgroundImages[backgroundImages.length - 1])
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentBg}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${currentBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>
      <motion.div
        className="relative w-full max-w-md z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 10 }}
            >
              <Progress value={(currentStep / (steps.length - 1)) * 100} className="mb-8" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center"
              >
                <motion.div variants={iconVariants}>{steps[currentStep].icon}</motion.div>
                <motion.h2
                  className="text-2xl font-bold mt-4 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {steps[currentStep].title}
                </motion.h2>
                <motion.p
                  className="text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {steps[currentStep].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
            <motion.div
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentStep < steps.length - 1 ? (
                <>
                  <Button variant="ghost" onClick={handleSkip}>
                    Skip
                  </Button>
                  <Button onClick={handleNext}>
                    Next <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => alert('Onboarding completed!')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
