import { ProfileGuard } from '@/components/dashboard/profile-guard'

export default function DashboardPage() {
  return (
    <ProfileGuard>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido. Esta es su página principal.
          </p>
        </div>
      </main>
    </ProfileGuard>
  )
}
