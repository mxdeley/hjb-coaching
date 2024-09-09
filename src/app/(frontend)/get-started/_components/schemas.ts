import { z } from 'zod'

export type Question = {
  label: string
  name: keyof FormInputs | string
  type?: 'text' | 'email' | 'select' | 'button' | 'social' | 'date' | 'radio-with-other'
  options?: string[]
}

export type FormInputs = z.infer<typeof formSchema>

export const questions: Question[] = [
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
