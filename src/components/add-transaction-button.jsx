import { motion } from 'framer-motion'
import { PlusIcon } from 'lucide-react'

import { Button } from './ui/button'

const AddTransactionButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Button className="group transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary/90 hover:shadow-lg active:scale-95">
        <PlusIcon className="mr-2 transition-transform duration-300 ease-in-out group-hover:rotate-90" />
        Nova Transação
      </Button>
    </motion.div>
  )
}

export default AddTransactionButton
