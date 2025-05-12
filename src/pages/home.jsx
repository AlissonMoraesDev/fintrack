import { Navigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, signOut, isInitializing } = useAuthContext()

  if (isInitializing) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className="flex h-screen w-screen items-start justify-between p-6">
      <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-col items-end justify-between">
        <h2 className="text-sm text-white">
          Usuário:{' '}
          <span className="text-sm text-primary-blue">{user.email}</span>
        </h2>
        <p className="mb-3 text-xs text-muted-foreground opacity-90">
          Controle financeiro detalhado.
        </p>
        <Button onClick={handleSignOut}>Sair</Button>
      </div>
    </div>
  )
}

export default HomePage
