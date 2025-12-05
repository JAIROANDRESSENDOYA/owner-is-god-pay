'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { doc } from 'firebase/firestore'
import { useFirestore, useDoc } from '@/firebase'
import { useAuth } from '@/context/AuthContext'

export function ProfileGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const firestore = useFirestore()
  const router = useRouter()

  // Create a stable document reference
  const userDocRef = user && firestore ? doc(firestore, 'users', user.uid) : null

  // Fetch the user profile document
  const { data: userProfile, loading: profileLoading } = useDoc(userDocRef)

  useEffect(() => {
    const isLoading = authLoading || profileLoading
    if (isLoading) return

    // If authentication is done and there's no user, they should be redirected by AuthListener.
    // This guard is specifically for authenticated users.
    if (!user) {
        router.replace('/')
        return
    }

    // If user is authenticated but the profile document doesn't exist (or is empty),
    // redirect to complete the profile.
    if (!userProfile) {
      router.replace('/complete-profile')
    }
  }, [user, userProfile, authLoading, profileLoading, router])

  // While loading, show a placeholder or nothing
  if (authLoading || profileLoading || !userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando...</p>
      </div>
    )
  }

  // If profile exists, render the protected children
  return <>{children}</>
}
