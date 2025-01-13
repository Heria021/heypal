'use client'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs'
import { AuthLoading, Authenticated, ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { Loader } from 'lucide-react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || ''
const convex = new ConvexReactClient(CONVEX_URL)

const ConvexClientProvider = ({ children }: Props) => {
  return (
    <ClerkProvider>
      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AuthLoading>
            <Loader className="animate-spin duration-500"/>
        </AuthLoading>
        <Authenticated>{children}</Authenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexClientProvider