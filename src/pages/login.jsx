import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import z from 'zod'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/contexts/auth'

const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: 'O e-mail é obrigatório.',
    })
    .trim()
    .min(1, {
      message: 'Precisa ser um e-mail válido.',
    }),
  password: z.string().trim().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres.',
  }),
})

const LoginPage = () => {
  const { user, login } = useContext(AuthContext)
  const form = useForm({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = (data) => login(data)

  if (user) {
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

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[420px]">
            <CardHeader className="text-center">
              <CardTitle>Entre na sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              {/* E-MAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite seu e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* SENHA */}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => console.log({ ...form })}
                className="w-full"
              >
                Fazer login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <div className="flex items-center justify-center">
        <p className="mr-1 text-center opacity-60">
          Ainda não possui uma conta?{' '}
        </p>
        <Link to="/signup" className="font-semibold text-primary-green">
          Crie agora
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
