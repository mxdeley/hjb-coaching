'use client'

import { DatePickerDemo } from '@/components/ui/date-picker'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { FormInputs, Question, formSchema } from '../page'
import { SocialMediaInputs, SocialMediaPlatform } from './social-media-inputs'

type Props = {
  onSubmit: (data: FormInputs) => Promise<void>
  questions: Question[]
}

export default function QuestionnaireForm({ onSubmit, questions }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  const currentQuestion = watch('currentQuestion', 0)

  const handleNext = async () => {
    const isValid = await trigger(questions[currentQuestion].name as keyof FormInputs)
    if (isValid && currentQuestion < questions.length - 1) {
      setValue('currentQuestion', currentQuestion + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setValue('currentQuestion', currentQuestion - 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden relative">
      <div className="w-full md:w-[55%] bg-gray-900 transform -skew-y-[15deg] md:skew-y-0 md:-skew-x-[15deg] origin-top-left md:origin-top-right overflow-hidden absolute inset-0 z-50 h-[55%] md:h-full">
        <div className="transform skew-y-[15deg] md:skew-y-0 md:skew-x-[15deg] h-full flex items-center justify-center">
          <div className="w-full max-w-md px-4 md:px-0">
            {currentQuestion === 0 && (
              <div className="mb-4">
                <a
                  href="./"
                  className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back to Home
                </a>
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-8">
              Questionnaire
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-400">
                  {questions[currentQuestion].label}
                </label>
                <Controller
                  name={questions[currentQuestion].name as keyof FormInputs}
                  control={control}
                  render={({ field }) => {
                    switch (questions[currentQuestion].type) {
                      case 'radio-with-other':
                        return (
                          <div className="space-y-2">
                            {questions[currentQuestion].options?.map((option) => (
                              <div key={option} className="flex items-center">
                                <input
                                  type="radio"
                                  id={option}
                                  {...field}
                                  value={option}
                                  checked={field.value === option}
                                  className="mr-2"
                                />
                                <label htmlFor={option}>{option}</label>
                              </div>
                            ))}
                            {field.value === 'Other' && (
                              <input
                                type="text"
                                {...field}
                                value={
                                  typeof field.value === 'object' &&
                                  field.value !== null &&
                                  'other' in field.value
                                    ? (field.value as { other: string }).other
                                    : ''
                                }
                                onChange={(e) => field.onChange({ other: e.target.value })}
                                placeholder="Please specify"
                                className="mt-2 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
                              />
                            )}
                          </div>
                        )
                      case 'date':
                        return (
                          <DatePickerDemo
                            date={field.value instanceof Date ? field.value : undefined}
                            onSelect={field.onChange}
                          />
                        )
                      case 'social':
                        return (
                          <SocialMediaInputs
                            formData={
                              (field.value as Partial<Record<SocialMediaPlatform, string>>) || {}
                            }
                            onChange={(platform, value) =>
                              field.onChange({
                                ...(field.value as Partial<Record<SocialMediaPlatform, string>>),
                                [platform]: value,
                              })
                            }
                          />
                        )
                      case 'button':
                        return (
                          <div className="flex space-x-2 mt-2">
                            {questions[currentQuestion].options?.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => field.onChange(option)}
                                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                  field.value === option
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )
                      case 'select':
                        return (
                          <select
                            {...field}
                            value={String(field.value)}
                            className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
                          >
                            <option value="">Select an option</option>
                            {questions[currentQuestion].options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )
                      default:
                        return (
                          <input
                            {...field}
                            type={questions[currentQuestion].name === 'email' ? 'email' : 'text'}
                            value={String(field.value)}
                            className="mt-1 p-2 w-full rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-white"
                          />
                        )
                    }
                  }}
                />
                {errors[questions[currentQuestion].name as keyof FormInputs] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors[questions[currentQuestion].name as keyof FormInputs]?.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between mt-6 w-full gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                >
                  Back
                </button>
                {currentQuestion < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/questionaire-2.jpg')" }}
      />
    </div>
  )
}
