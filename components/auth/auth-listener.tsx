'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useAuth } from '@/context/AuthContext'
import { useFirebase } from '@/firebase'

export function AuthListener() {
  const { auth } = useFirebase()
  const { setUser } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!auth) return

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      setUser(firebaseUser)

      const isAuthPage = pathname === '/'
      
      if (firebaseUser) {
        if (isAuthPage) {
          // User is logged in and on the auth page, redirect to dashboard
          router.replace('/dashboard')
        }
      } else {
        if (!isAuthPage) {
          // User is not logged in and not on the auth page, redirect to auth page
          router.replace('/')
        }
      }
    })

    return () => unsubscribe()
  }, [auth, pathname, router, setUser])

  return null
}
