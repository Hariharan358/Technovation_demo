"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Clock, Users, Sparkles, Lightbulb, Rocket, CheckCircle2, X, Code, Cpu, Globe, Moon, Sun, Award, Zap } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import CountdownTimer from "../components/CountdownTimer"
import RegistrationForm from "../components/RegistrationForm"
import EventSchedule from "../components/EventSchedule"

function App() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [userName, setUserName] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState("about")
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure hydration is complete before rendering theme-dependent UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRegistrationSuccess = (name: string) => {
    setUserName(name)
    setShowSuccess(true)
    setShowModal(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Letter animation for title
  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  // Theme transition
  const themeTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
  }

  if (!mounted) return null

  return (
    <motion.div 
      className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-gradient-to-b from-slate-900 to-slate-800 text-white' : 'bg-gradient-to-b from-blue-50 to-indigo-50 text-gray-800'}`}
      initial={false}
      animate={{ 
        backgroundColor: darkMode ? "#0f172a" : "#eff6ff" 
      }}
      transition={themeTransition}
    >
      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`p-8 rounded-2xl shadow-2xl max-w-md w-full relative border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button onClick={closeModal} className={`absolute top-4 right-4 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
                <X size={24} />
              </button>
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                >
                  <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
                </motion.div>
                <motion.h3
                  className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Registration Successful!
                </motion.h3>
                <motion.p
                  className={`text-center mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Thank you, {userName}! Your registration for Technovation'25 has been confirmed. We've sent the details
                  to your email.
                </motion.p>
                <motion.button
                  onClick={closeModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Toggle Button */}
      <motion.div 
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={toggleTheme}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
            darkMode
              ? 'bg-slate-700 text-yellow-300 hover:bg-slate-600'
              : 'bg-white text-slate-700 hover:bg-gray-100'
          }`}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={darkMode ? 'dark' : 'light'}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <header className={`relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-slate-800 to-slate-900' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
        <motion.div 
          className="absolute inset-0 z-0 opacity-20"
          animate={{ 
            opacity: darkMode ? 0.1 : 0.2,
          }}
          transition={{ duration: 1 }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path 
                  d="M 8 0 L 0 0 0 8" 
                  fill="none" 
                  stroke={darkMode ? "rgba(219, 234, 254, 0.2)" : "rgba(79, 70, 229, 0.2)"} 
                  strokeWidth="0.5" 
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div 
                className="flex items-center justify-center mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Cpu className={`${darkMode ? 'text-cyan-400' : 'text-cyan-500'} mr-2`} size={28} />
                <span className={`text-xl font-medium ${darkMode ? 'text-cyan-400' : 'text-cyan-500'}`}>Department of Computer Science and Business Systems</span>
              </motion.div>
              
              <motion.h1 
                className={`text-5xl md:text-7xl font-extrabold mb-4 ${
                  darkMode 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400' 
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600'
                }`}
              >
                {/* Animated title with letter-by-letter animation */}
                <motion.span className="inline-block overflow-hidden">
                  {Array.from("TECHNOVATION'25").map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterAnimation}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className={`text-xl md:text-2xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Innovate. Collaborate. Transform.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} variants={fadeInUp}>
                <Calendar className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <span>May 15-17, 2025</span>
              </motion.div>
              <motion.div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} variants={fadeInUp}>
                <MapPin className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <span>Main campus, REC</span>
              </motion.div>
              <motion.div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} variants={fadeInUp}>
                <Clock className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <span>9:00 AM - 3:00 PM</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto max-w-3xl"
            >
              <CountdownTimer
                targetDate="2025-05-15T09:00:00"
                title="Countdown to Technovation'25"
                colorScheme={darkMode ? "indigo" : "blue"}
                darkMode={darkMode}
              />
            </motion.div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.a
                href="#register"
                className={`px-8 py-4 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600' 
                    : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700'
                } rounded-full text-lg font-semibold text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: darkMode 
                    ? "0 10px 25px -5px rgba(96, 165, 250, 0.5)" 
                    : "0 10px 25px -5px rgba(37, 99, 235, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                Register Now
              </motion.a>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} sticky top-0 z-30 shadow-md border-b`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-1 md:space-x-4 overflow-x-auto py-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                activeTab === "about" 
                  ? darkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white" 
                  : darkMode ? "text-gray-300 hover:text-blue-400 hover:bg-slate-700" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                activeTab === "events" 
                  ? darkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white" 
                  : darkMode ? "text-gray-300 hover:text-blue-400 hover:bg-slate-700" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                activeTab === "schedule" 
                  ? darkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white" 
                  : darkMode ? "text-gray-300 hover:text-blue-400 hover:bg-slate-700" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setActiveTab("schedule")}
            >
              Schedule
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
                activeTab === "register" 
                  ? darkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white" 
                  : darkMode ? "text-gray-300 hover:text-blue-400 hover:bg-slate-700" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => {
                setActiveTab("register")
                setTimeout(() => {
                  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })
                }, 100)
              }}
            >
              Register
            </motion.button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <AnimatePresence mode="wait">
        {activeTab === "about" && (
          <motion.section
            id="about"
            className={`py-20 ${darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-800' : 'bg-gradient-to-b from-white to-blue-50'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.h2
                  className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  About Technovation'25
                </motion.h2>

                <motion.p
                  className={`text-lg mb-8 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Technovation'25 is the premier technical symposium organized by the Department of Computer Science & business systems
                  . This three-day extravaganza brings together brilliant minds, industry experts, and tech
                  enthusiasts to explore cutting-edge technologies and innovations that are shaping our future.
                </motion.p>

                <motion.p
                  className={`text-lg mb-12 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Whether you're a coding wizard, a design guru, or simply curious about the latest tech trends,
                  Technovation'25 offers something for everyone. Join us for workshops, hackathons, technical
                  competitions, and inspiring talks from industry leaders.
                </motion.p>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-lg border`}
                    variants={fadeInUp}
                    whileHover={{ y: -10, boxShadow: darkMode ? "0 10px 25px -5px rgba(59, 130, 246, 0.2)" : "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-center mb-4">
                      <motion.div
                        className={`p-3 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <Lightbulb size={32} />
                      </motion.div>
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Innovative Workshops</h3>
                    <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Hands-on sessions on AI, blockchain, IoT, and more cutting-edge technologies.
                    </p>
                  </motion.div>

                  <motion.div
                    className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-lg border`}
                    variants={fadeInUp}
                    whileHover={{ y: -10, boxShadow: darkMode ? "0 10px 25px -5px rgba(59, 130, 246, 0.2)" : "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-center mb-4">
                      <motion.div
                        className={`p-3 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <Rocket size={32} />
                      </motion.div>
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Hackathon</h3>
                    <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      48-hour coding marathon to build innovative solutions for real-world problems.
                    </p>
                  </motion.div>

                  <motion.div
                    className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-lg border`}
                    variants={fadeInUp}
                    whileHover={{ y: -10, boxShadow: darkMode ? "0 10px 25px -5px rgba(59, 130, 246, 0.2)" : "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-center mb-4">
                      <motion.div
                        className={`p-3 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <Users size={32} />
                      </motion.div>
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>Networking</h3>
                    <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Connect with industry professionals, recruiters, and fellow tech enthusiasts.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Events Section */}
        {activeTab === "events" && (
          <motion.section
            id="events"
            className={`py-20 ${darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-800' : 'bg-gradient-to-b from-white to-blue-50'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.h2
                  className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Featured Events
                </motion.h2>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-lg border`}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.03, boxShadow: darkMode ? "0 10px 25px -5px rgba(59, 130, 246, 0.15)" : "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full mr-4`}>
                        <Code size={24} />
                      </div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Code Odyssey</h3>
                    </div>
                    <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      A competitive programming contest where participants solve complex algorithmic challenges against
                      the clock.
                    </p>
                    <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" /> Day 1, 10:00 AM
                      </span>
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" /> Lab Complex
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-lg border`}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.03, boxShadow: darkMode ? "0 10px 25px -5px rgba(59, 130, 246, 0.15)" : "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full mr-4`}>
                        <Cpu size={24} />
                      </div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>AI Summit</h3>
                    </div>
                    <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Explore the frontiers of artificial intelligence with talks from industry experts and hands-on
                      workshops.
                    </p>
                    <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" /> Day 2, 9:30 AM
                      </span>
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" /> Main Auditorium
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-lg border`}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.03, boxShadow: darkMode ? "0 10px 25px -5px rgba(59, 130, 246, 0.15)" : "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full mr-4`}>
                        <Globe size={24} />
                      </div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Web3 Workshop</h3>
                    </div>
                    <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Dive into blockchain technology, smart contracts, and decentralized applications with our expert-led
                      workshop.
                    </p>
                    <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" /> Day 2, 2:00 PM
                      </span>
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" /> Seminar Hall
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} p-6 rounded-xl shadow-lg border`}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.03, boxShadow: darkMode ? "0 10px 25px -5px rgba(59, 130, 246, 0.15)" : "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full mr-4`}>
                        <Award size={24} />
                      </div>
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Startup Pitch</h3>
                    </div>
                    <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Showcase your innovative ideas to a panel of investors and industry experts. Cash prizes for the top
                      three pitches!
                    </p>
                    <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" /> Day 3, 11:00 AM
                      </span>
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" /> Conference Hall
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.a
                    href="#register"
                    className={`inline-flex items-center px-6 py-3 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} rounded-full text-white font-medium transition-colors shadow-md`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Zap size={18} className="mr-2" />
                    Register for Events
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Schedule Section */}
        {activeTab === "schedule" && (
          <motion.section
            id="schedule"
            className={`py-20 ${darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-800' : 'bg-gradient-to-b from-white to-blue-50'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.h2
                  className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Event Schedule
                </motion.h2>

                <EventSchedule darkMode={darkMode} />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Registration Section */}
      <motion.section
        id="register"
        className={`py-20 ${darkMode ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-blue-50 to-indigo-50'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Register for Technovation'25
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} p-8 rounded-xl shadow-lg border`}
              >
                <h3 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <Sparkles className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                  Event Highlights
                </h3>

                <ul className="space-y-4">
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} p-1 rounded-full mr-3 mt-1`}>
                      <CheckCircle2 size={16} className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Technical Workshops</span>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Learn from industry experts in AI, blockchain, cloud computing, and more.
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} p-1 rounded-full mr-3 mt-1`}>
                      <CheckCircle2 size={16} className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>48-Hour Hackathon</span>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Build innovative solutions with a chance to win exciting prizes worth ₹1,00,000.
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} p-1 rounded-full mr-3 mt-1`}>
                      <CheckCircle2 size={16} className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Keynote Speakers</span>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Hear from tech leaders from Google, Microsoft, and leading startups.
                      </p>
                    </div>
                  </motion.li>

                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} p-1 rounded-full mr-3 mt-1`}>
                      <CheckCircle2 size={16} className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Networking Opportunities</span>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Connect with recruiters, mentors, and fellow tech enthusiasts.
                      </p>
                    </div>
                  </motion.li>
                </ul>

                <motion.div 
                  className={`mt-8 p-4 rounded-lg border ${darkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-blue-50 border-blue-100'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className={`font-semibold mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    <Zap size={18} className="mr-2 text-amber-500" />
                    Registration Fee
                  </h4>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Students: ₹500 | Professionals: ₹1,000</p>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Includes access to all events, workshops, lunch, and event kit.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} p-8 rounded-xl shadow-lg border`}
              >
                <RegistrationForm onSuccess={handleRegistrationSuccess} darkMode={darkMode} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className={`py-10 border-t ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="mb-6 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className={`text-2xl font-bold flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`} 
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                Technovation'25
              </motion.h2>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Department of Computer Science & Business systems</p>
            </motion.div>

            <motion.div 
              className="flex space-x-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.a
                href="#"
                className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                whileHover={{ scale: 1.1 }}
                variants={fadeInUp}
              >
              
              </motion.a>
              <motion.a
                href="#"
                className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                whileHover={{ scale: 1.1 }}
                variants={fadeInUp}
              >
              
              </motion.a>
              <motion.a
                href="#"
                className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                whileHover={{ scale: 1.1 }}
                variants={fadeInUp}
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>

          <motion.div 
            className={`mt-8 text-center ${darkMode ? 'text-gray-500' : 'text-gray-500'} text-sm`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  )
}

export default App
