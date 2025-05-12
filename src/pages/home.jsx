import { Navigate } from 'react-router'

import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
  const { user, isInitializing } = useAuthContext()

  if (isInitializing) return null

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="flex h-screen w-screen items-start justify-between p-6">
      <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>
      <div>
        <h2 className="text-sm text-white">
          Usuário:{' '}
          <span className="text-sm text-primary-blue">{user.email}</span>
        </h2>
        <p className="text-xs text-muted-foreground opacity-90">
          Controle financeiro detalhado.
        </p>
      </div>
    </div>
  )
}

export default HomePage
