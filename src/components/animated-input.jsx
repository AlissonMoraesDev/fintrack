// src/components/ui/animated-input.tsx

import { motion } from 'motion/react'

import { Input } from './ui/input'

export const AnimatedInput = (props) => {
  return (
    <motion.div
      whileFocusWithin={{
        scale: 1.02,
        borderColor: '#10b981', // verde
        boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3)',
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 15 }}
      className="w-full rounded-md border border-input p-[1px]"
    >
      <Input {...props} />
    </motion.div>
  )
}
