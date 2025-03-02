"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  targetDate: string
  title?: string
  colorScheme?: string
  darkMode?: boolean
}

export default function CountdownTimer({
  targetDate,
  title = "Countdown",
  colorScheme = "blue",
  darkMode = false,
}: CountdownTimerProps) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      const d = Math.floor(difference / (1000 * 60 * 60 * 74))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(s)

      if (difference <= 0) {
        clearInterval(interval)
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const getColorClasses = () => {
    if (darkMode) {
      switch (colorScheme) {
        case "blue":
          return "from-blue-600 to-blue-400 border-blue-700 text-blue-200"
        case "indigo":
          return "from-indigo-600 to-indigo-400 border-indigo-700 text-indigo-200"
        default:
          return "from-blue-600 to-blue-400 border-blue-700 text-blue-200"
      }
    } else {
      switch (colorScheme) {
        case "blue":
          return "from-blue-500 to-blue-600 border-blue-300 text-blue-100"
        case "indigo":
          return "from-indigo-500 to-indigo-600 border-indigo-300 text-indigo-100"
        default:
          return "from-blue-500 to-blue-600 border-blue-300 text-blue-100"
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className={`w-full ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      {title && (
        <motion.h3
          className="text-xl font-semibold mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>
      )}
      <motion.div
        className="grid grid-cols-4 gap-2 md:gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={`flex flex-col items-center p-3 md:p-4 rounded-lg bg-gradient-to-b ${getColorClasses()} border shadow-lg`}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <span className="text-2xl md:text-4xl font-bold">{days}</span>
          <span className="text-xs md:text-sm mt-1 opacity-80">Days</span>
        </motion.div>

        <motion.div
          className={`flex flex-col items-center p-3 md:p-4 rounded-lg bg-gradient-to-b ${getColorClasses()} border shadow-lg`}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <span className="text-2xl md:text-4xl font-bold">{hours}</span>
          <span className="text-xs md:text-sm mt-1 opacity-80">Hours</span>
        </motion.div>

        <motion.div
          className={`flex flex-col items-center p-3 md:p-4 rounded-lg bg-gradient-to-b ${getColorClasses()} border shadow-lg`}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <span className="text-2xl md:text-4xl font-bold">{minutes}</span>
          <span className="text-xs md:text-sm mt-1 opacity-80">Minutes</span>
        </motion.div>

        <motion.div
          className={`flex flex-col items-center p-3 md:p-4 rounded-lg bg-gradient-to-b ${getColorClasses()} border shadow-lg`}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <span className="text-2xl md:text-4xl font-bold">{seconds}</span>
          <span className="text-xs md:text-sm mt-1 opacity-80">Seconds</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
