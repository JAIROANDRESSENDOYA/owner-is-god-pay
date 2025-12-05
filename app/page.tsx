'use client'

import { AuthForm } from '@/components/auth/auth-form'
import Logo from '@/components/logo'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="text-3xl font-bold text-center">
          Bienvenido a CrediRápido
        </h1>
        <p className="text-center text-muted-foreground">
          Su solución de crédito al instante.
        </p>
        <AuthForm />
      </div>
    </main>
  )
}