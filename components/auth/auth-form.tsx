'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { toast } from 'sonner'
import { AuthError } from 'firebase/auth'
import { useAuth } from '@/context/AuthContext'

function getFirebaseAuthErrorMessage(error: AuthError): string {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'El formato del correo electrónico no es válido.'
    case 'auth/user-not-found':
      return 'No se encontró ningún usuario con este correo electrónico.'
    case 'auth/wrong-password':
      return 'La contraseña es incorrecta.'
    case 'auth/email-already-in-use':
      return 'Este correo electrónico ya está en uso por otra cuenta.'
    case 'auth/weak-password':
      return 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.'
    default:
      return 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo.'
  }
}

export function AuthForm() {
  const { signUp, signIn, sendPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAuth = async (
    action: 'signIn' | 'signUp',
    e: React.FormEvent
  ) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (action === 'signIn') {
        await signIn(email, password)
        toast.success('¡Inicio de sesión exitoso!')
      } else {
        await signUp(email, password)
        toast.success('¡Registro exitoso! Redirigiendo...')
      }
    } catch (error) {
      const authError = error as AuthError
      console.error(`${action} error:`, authError)
      toast.error('Error de autenticación', {
        description: getFirebaseAuthErrorMessage(authError),
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error('Por favor, ingrese su correo electrónico para restablecer la contraseña.');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordReset(email);
      toast.success('Correo de recuperación enviado', {
        description: 'Si existe una cuenta con ese correo, recibirás un enlace para restablecer tu contraseña.',
      });
    } catch (error) {
      const authError = error as AuthError;
      console.error('Password reset error:', authError);
      toast.error('Error al enviar el correo', {
        description: getFirebaseAuthErrorMessage(authError),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
        <TabsTrigger value="register">Registrarse</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <form onSubmit={(e) => handleAuth('signIn', e)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email-login">Email</Label>
              <Input
                id="email-login"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password-login">Contraseña</Label>
              <Input
                id="password-login"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
            <div className="text-center text-sm">
                <button
                    type="button"
                    onClick={handlePasswordReset}
                    className="underline text-muted-foreground hover:text-primary disabled:opacity-50"
                    disabled={loading}
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </div>
          </div>
        </form>
      </TabsContent>
      <TabsContent value="register">
        <form onSubmit={(e) => handleAuth('signUp', e)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email-register">Email</Label>
              <Input
                id="email-register"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password-register">Contraseña</Label>
              <Input
                id="password-register"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  )
}
