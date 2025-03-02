"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react"

interface EventScheduleProps {
  darkMode?: boolean
}

export default function EventSchedule({ darkMode = false }: EventScheduleProps) {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  // Single day events
  const events = [
    {
      id: 1,
      time: "09:00 AM - 10:00 AM",
      title: "Opening Ceremony",
      description: "Welcome address by the Dean and introduction to Technovation'25.",
      location: "Main Auditorium",
      speaker: "Dr. Sarah Johnson, Dean of Engineering",
    },
    {
      id: 2,
      time: "10:30 AM - 12:30 PM",
      title: "Code Odyssey",
      description: "A competitive programming contest where participants solve complex algorithmic challenges.",
      location: "Lab Complex",
      speaker: "Organized by Programming Club",
    },
    {
      id: 3,
      time: "12:30 PM - 01:30 PM",
      title: "Lunch Break",
      description: "Networking lunch with refreshments provided for all participants.",
      location: "Campus Cafeteria",
      speaker: "N/A",
    },
    {
      id: 4,
      time: "02:00 PM - 04:00 PM",
      title: "Workshop: AI & Machine Learning",
      description: "Learn about the latest advancements in AI and hands-on experience with machine learning models.",
      location: "Seminar Hall 1",
      speaker: "Dr. Maya Patel, AI Researcher",
    },
    {
      id: 5,
      time: "04:00 PM - 05:00 PM",
      title: "Tech Startup Showcase",
      description: "Innovative startups present their products and solutions to attendees and potential investors.",
      location: "Exhibition Hall",
      speaker: "Various Startup Founders",
    },
    {
      id: 6,
      time: "05:30 PM - 06:30 PM",
      title: "Panel Discussion: Future of Tech",
      description: "Industry experts discuss emerging technologies and future career opportunities.",
      location: "Conference Hall",
      speaker: "Panel of Industry Experts",
    },
    {
      id: 7,
      time: "07:00 PM - 09:00 PM",
      title: "Networking Dinner & Cultural Event",
      description: "Dinner followed by cultural performances from university students.",
      location: "Campus Grounds",
      speaker: "Cultural Committee",
    },
  ]

  const toggleEvent = (id: number) => {
    if (expandedEvent === id) {
      setExpandedEvent(null)
    } else {
      setExpandedEvent(id)
    }
  }

  const eventVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div>
      <motion.h3
        className={`text-xl font-semibold mb-6 flex items-center justify-center ${darkMode ? "text-white" : "text-gray-800"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Calendar className={`mr-2 ${darkMode ? "text-blue-400" : "text-blue-500"}`} size={18} />
        May 15, 2025
      </motion.h3>

      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className={`rounded-lg shadow-md overflow-hidden border ${
              darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
            }`}
            custom={index}
            variants={eventVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -3,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div
              className={`p-4 cursor-pointer ${
                expandedEvent === event.id ? (darkMode ? "bg-slate-700" : "bg-blue-50") : ""
              }`}
              onClick={() => toggleEvent(event.id)}
            >
              <div className="flex justify-between items-center">
                <h4 className={`font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{event.title}</h4>
                <motion.div animate={{ rotate: expandedEvent === event.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {expandedEvent === event.id ? (
                    <ChevronUp className={darkMode ? "text-gray-400" : "text-gray-500"} size={18} />
                  ) : (
                    <ChevronDown className={darkMode ? "text-gray-400" : "text-gray-500"} size={18} />
                  )}
                </motion.div>
              </div>
              <div className={`flex items-center mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                <Clock size={14} className="mr-1" />
                <span className="mr-4">{event.time}</span>
                <MapPin size={14} className="mr-1" />
                <span>{event.location}</span>
              </div>
            </div>

            <AnimatePresence>
              {expandedEvent === event.id && (
                <motion.div
                  className={`px-4 pb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  variants={detailsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="pt-2 border-t border-dashed mt-2 mb-3 border-gray-200"></div>
                  <p className="mb-2">{event.description}</p>
                  {event.speaker !== "N/A" && (
                    <p className={`text-sm font-medium ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      Speaker: {event.speaker}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

