// src/components/ui/animated-button.tsx

import { Loader2 } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from './ui/button'

export const AnimatedButton = ({
  isLoading,
  loadingText = 'Enviando...',
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className="w-full"
    >
      <Button {...props} className="w-full">
        {isLoading ? (
          <motion.span
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 1,
            }}
            className="mr-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.span>
        ) : null}
        {isLoading ? (
          <motion.span
            key="loadingText"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {loadingText}
          </motion.span>
        ) : (
          <motion.span
            key="defaultText"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
        )}
      </Button>
    </motion.div>
  )
}
