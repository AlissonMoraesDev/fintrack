import { motion } from 'framer-motion'
import { ChevronDownIcon, LogOutIcon } from 'lucide-react'

import Logo from '@/assets/images/Logo.svg'
import { useAuthContext } from '@/contexts/auth'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Header = () => {
  const { user, signOut } = useAuthContext()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card>
        <CardContent className="flex items-center justify-between px-8 py-4">
          {/* Logo com animação leve no hover */}
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            src={Logo}
            alt="FinTrack"
            className="h-6"
          />

          {/* Avatar com Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  className="space-x-1 transition-all duration-200 hover:scale-[1.02] hover:shadow"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      {user?.firstName?.[0] ?? ''}
                      {user?.lastName?.[0] ?? ''}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <ChevronDownIcon />
                </Button>
              </motion.div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="animate-in fade-in zoom-in-95">
              <DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  size="small"
                  className="w-full justify-start gap-2 transition-colors duration-200 hover:bg-muted"
                  onClick={signOut}
                >
                  <LogOutIcon className="h-4 w-4" />
                  Sair
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Header
