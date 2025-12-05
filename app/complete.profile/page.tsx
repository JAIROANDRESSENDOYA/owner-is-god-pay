'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useUser } from '@/firebase/auth/use-user'
import { doc, setDoc, getFirestore } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useFirebase } from '@/firebase'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'
import Logo from '@/components/logo'

const profileSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  documentId: z
    .string()
    .min(5, 'El documento debe tener al menos 5 caracteres'),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  phone: z.string().min(7, 'El teléfono debe tener al menos 7 caracteres'),
  occupation: z
    .string()
    .min(3, 'La ocupación debe tener al menos 3 caracteres'),
  monthlyIncome: z.coerce
    .number()
    .min(1, 'Los ingresos deben ser mayores a 0'),
  financialHistory: z
    .string()
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function CompleteProfilePage() {
  const { user, isLoading } = useUser()
  const { firebaseApp } = useFirebase()
  const router = useRouter()
  const db = getFirestore(firebaseApp)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      documentId: '',
      address: '',
      phone: '',
      occupation: '',
      monthlyIncome: 0,
      financialHistory: '',
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    if (!user) {
      toast.error('Error', {
        description: 'Debes iniciar sesión para completar tu perfil.',
      })
      return
    }

    const userProfile = {
      ...data,
      email: user.email,
      balance: 2800000000,
    }

    const userDocRef = doc(db, 'users', user.uid)

    setDoc(userDocRef, userProfile)
      .then(() => {
        toast.success('Perfil completado', {
          description: 'Tu perfil ha sido guardado exitosamente.',
        })
        router.push('/dashboard')
      })
      .catch(error => {
        console.error('Error writing document: ', error)
        const permissionError = new FirestorePermissionError({
          path: userDocRef.path,
          operation: 'create',
          requestResourceData: userProfile,
        })
        errorEmitter.emit('permission-error', permissionError)
        toast.error('Error al guardar', {
          description:
            'No se pudo guardar tu perfil. Revisa los permisos de Firestore.',
        })
      })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Cargando...
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle>Completa tu Perfil</CardTitle>
          <CardDescription>
            Necesitamos algunos datos más para crear tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="documentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documento de Identidad</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Calle Falsa 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="3001234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ocupación</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingeniero de Software" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingresos Mensuales (COP)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="5000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="financialHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historial Financiero (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe brevemente tu experiencia con créditos, bancos, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Guardar Perfil
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}