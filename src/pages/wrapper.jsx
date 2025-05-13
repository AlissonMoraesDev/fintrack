import { motion } from 'motion/react'

const PageWrapper = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, scale: { type: 'spring', bounce: 0.3 } }}
      className={`flex h-screen w-screen flex-col items-center justify-center gap-3 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper
