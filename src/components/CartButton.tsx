'use client'

import { motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'

interface CartButtonProps {
  onClick: () => void
}

export default function CartButton({ onClick }: CartButtonProps) {
  const { totalItems } = useCart()

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center"
    >
      <div className="text-2xl">🛒</div>
      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
        >
          {totalItems}
        </motion.div>
      )}
    </motion.button>
  )
}
