import type { CollectionConfig } from 'payload'

export const Workouts: CollectionConfig = {
  slug: 'workouts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['Strength', 'Endurance', 'Cardio', 'Flexibility'],
    },
    {
      name: 'warmup',
      type: 'text',
      required: true,
    },
    {
      name: 'programme',
      type: 'textarea',
      required: true,
    },
    {
      name: 'cooldown',
      type: 'text',
      required: true,
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
