import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'
import { OpenPanelComponent } from '@openpanel/nextjs'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

type LayoutProps = {
  children: ReactNode
}

import './globals.css'
import { FathomAnalytics } from '../fathom'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const Layout = ({ children }: LayoutProps) => {
  return (
    <ClerkProvider signInFallbackRedirectUrl="/dashboard" signUpFallbackRedirectUrl="/onboarding">
      <html>
        <body className={cn('min-h-screen  font-sans antialiased', fontSans.variable)}>
          <FathomAnalytics />
          <OpenPanelComponent
            clientId="fc0b7341-c9e3-49bb-a867-763f4c2d7112"
            trackScreenViews={true}
            trackAttributes={true}
            trackOutgoingLinks={true}
            // If you have a user id, you can pass it here to identify the user
            // profileId={'123'}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

export default Layout
