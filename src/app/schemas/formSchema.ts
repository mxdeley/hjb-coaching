import { z } from 'zod'

export const questionSchemas = {
  bodyType: z.enum(['Ectomorph', 'Endomorph', 'Mesomorph']),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  socialMedia: z.object({
    instagram: z.string().optional(),
    x: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),
  }),
  age: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 16 && Number(val) <= 120,
      'Age must be between 16 and 120',
    ),
  fitnessGoals: z.union([
    z.enum([
      'Build More Muscle',
      'Lose Body Fat',
      'Improve General Fitness',
      'Want to compete in a Physique contest',
    ]),
    z.object({
      other: z.string().min(1, 'Please specify your fitness goal'),
    }),
  ]),
  startDate: z.date(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
}

export const formSchema = z.object(questionSchemas)

export type FormInputs = z.infer<typeof formSchema>
