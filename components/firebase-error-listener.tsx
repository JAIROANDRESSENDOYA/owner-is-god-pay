'use client'

import { useEffect } from 'react'
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'

export function FirebaseErrorListener() {
  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      // NOTE: We are not using the user from useUser() here to avoid a circular dependency
      // that can occur if useUser itself triggers an error that this listener catches.
      const detailedError = new Error(
        `Firestore Permission Denied. Details: ${JSON.stringify({
          ...error.context,
        }, null, 2)}`
      )
      console.error(detailedError)
      // Throwing the error will display it in the Next.js error overlay during development
      throw detailedError
    }

    errorEmitter.on('permission-error', handlePermissionError)

    return () => {
      errorEmitter.off('permission-error', handlePermissionError)
    }
  }, [])

  return null
}
