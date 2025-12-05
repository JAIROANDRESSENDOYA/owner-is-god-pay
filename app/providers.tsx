'use client'

import { FirebaseClientProvider } from '@/firebase/client-provider'
import { LanguageProvider } from '@/context/language-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </FirebaseClientProvider>
  )
}