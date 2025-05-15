import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'
import { UserService } from '@/services/user'

import BalanceItem from './balance-item'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const { data } = useQuery({
    queryKey: ['balance', user.id],
    queryFn: () => {
      const from = searchParams.get('from')
      const to = searchParams.get('to')
      return UserService.getBalance({ from, to })
    },
  })

  const items = [
    {
      label: 'Saldo',
      amount: data?.balance,
      icon: <WalletIcon size={16} />,
    },
    {
      label: 'Ganhos',
      amount: data?.earnings,
      icon: <TrendingUpIcon className="text-primary-green" size={16} />,
    },
    {
      label: 'Gastos',
      amount: data?.expenses,
      icon: <TrendingDownIcon className="text-primary-red" size={16} />,
    },
    {
      label: 'Investimentos',
      amount: data?.investments,
      icon: <PiggyBankIcon className="text-primary-blue" size={16} />,
    },
  ]

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1 * index,
            duration: 0.4,
            ease: 'easeOut',
          }}
        >
          <BalanceItem {...item} />
        </motion.div>
      ))}
    </div>
  )
}

export default Balance
