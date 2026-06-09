'use client'

import { motion } from 'framer-motion'

export function OrderHistorySkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {[1, 2, 3, 4, 5].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6"
        >
          {/* Header skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="h-6 w-32 bg-gray-200 rounded-lg mb-2 animate-pulse" />
              <div className="h-4 w-48 bg-gray-100 rounded-lg animate-pulse" />
            </div>
            <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Customer info skeleton */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="h-5 w-40 bg-gray-200 rounded-lg mb-2 animate-pulse" />
            <div className="h-4 w-32 bg-gray-100 rounded-lg animate-pulse" />
          </div>

          {/* Items skeleton */}
          <div className="mb-4">
            <div className="h-5 w-32 bg-gray-200 rounded-lg mb-2 animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 w-full bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Footer skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
            <div className="h-6 w-40 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
