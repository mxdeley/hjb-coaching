import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Started',
  description: 'Start your journey with us',
}

export default function GetStartedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
