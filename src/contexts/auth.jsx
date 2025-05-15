import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'
import { UserService } from '@/services/user'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  signOut: () => {},
  isInitializing: true,
})

export const useAuthContext = () => useContext(AuthContext)

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isInitializing, setIsInitializing] = useState(true)

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => UserService.signup(variables),
  })

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => UserService.login(variables),
  })

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )

        if (!accessToken && !refreshToken) return

        const response = await toast.promise(UserService.me(), {
          loading: 'Verificando sessão...',
          success: 'Sessão restaurada!',
          error: 'Sessão expirada. Faça login novamente.',
        })

        setUser(response)
      } catch (error) {
        setUser(null)
        removeTokens()
        console.error(error)
      } finally {
        setIsInitializing(false)
      }
    }

    init()
  }, [])

  const login = (data) => {
    toast.promise(loginMutation.mutateAsync(data), {
      loading: 'Entrando...',
      success: (loginUser) => {
        setTokens(loginUser.tokens)
        setUser(loginUser)
        return {
          description: `Bem-vindo(a), ${loginUser.firstName}!`,
          title: 'Login realizado com sucesso',
        }
      },
      error: (error) => {
        console.error(error)
        return {
          title: 'Erro ao logar',
          description: 'Verifique seus dados e tente novamente.',
        }
      },
    })
  }

  const signup = (data) => {
    toast.promise(signupMutation.mutateAsync(data), {
      loading: 'Criando conta...',
      success: (createdUser) => {
        setUser(createdUser)
        setTokens(createdUser.tokens)
        return {
          title: 'Conta criada!',
          description: `Bem-vindo(a), ${createdUser.firstName}`,
        }
      },
      error: () => ({
        title: 'Erro ao criar conta',
        description: 'Tente novamente mais tarde.',
      }),
    })
  }

  const signOut = () => {
    setUser(null)
    removeTokens()
    toast.info('Você saiu da sua conta.')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        signOut,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
