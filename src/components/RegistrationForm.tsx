"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, Briefcase, School, Calendar } from "lucide-react"

interface RegistrationFormProps {
  onSuccess: (name: string) => void
  darkMode?: boolean
}

export default function RegistrationForm({ onSuccess, darkMode = false }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "student",
    institution: "",
    events: [] as string[],
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
    events: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData((prev) => ({ ...prev, events: [...prev.events, value] }))
    } else {
      setFormData((prev) => ({ ...prev, events: prev.events.filter((event) => event !== value) }))
    }
    // Clear error when user selects an event
    if (errors.events) {
      setErrors((prev) => ({ ...prev, events: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      valid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
      valid = false
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number should be 10 digits"
      valid = false
    }

    if (!formData.institution.trim()) {
      newErrors.institution = "Institution/Company is required"
      valid = false
    }

    if (formData.events.length === 0) {
      newErrors.events = "Please select at least one event"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        onSuccess(formData.name)
      }, 1000)
    }
  }

  const inputClasses = `w-full px-4 py-2 rounded-lg border ${
    darkMode
      ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500"
      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500"
  } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors`

  const labelClasses = `block mb-1 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`
  const errorClasses = "text-red-500 text-sm mt-1"

  const checkboxClasses = `h-5 w-5 rounded border ${
    darkMode ? "border-slate-600 bg-slate-700" : "border-gray-300 bg-white"
  } text-blue-600 focus:ring-blue-500`

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h3 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? "text-white" : "text-gray-800"}`}>
        <User className={`mr-2 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
        Registration Form
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <label htmlFor="name" className={labelClasses}>
              Full Name
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} size={16} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${inputClasses} pl-10`}
                placeholder="hari"
              />
            </div>
            {errors.name && <p className={errorClasses}>{errors.name}</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label htmlFor="email" className={labelClasses}>
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} size={16} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClasses} pl-10`}
                placeholder="example@gmail.com"
              />
            </div>
            {errors.email && <p className={errorClasses}>{errors.email}</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number
            </label>
            <div className="relative">
              <Phone className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} size={16} />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputClasses} pl-10`}
                placeholder="1234567890"
              />
            </div>
            {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <label htmlFor="type" className={labelClasses}>
              Registration Type
            </label>
            <div className="relative">
              <div className="flex space-x-4">
                <label className={`flex items-center cursor-pointer ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <input
                    type="radio"
                    name="type"
                    value="student"
                    checked={formData.type === "student"}
                    onChange={handleChange}
                    className={`mr-2 ${darkMode ? "border-slate-600 bg-slate-700" : "border-gray-300"}`}
                  />
                  <School size={16} className="mr-1" /> Student
                </label>
                <label className={`flex items-center cursor-pointer ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  
                </label>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <label htmlFor="institution" className={labelClasses}>
              {formData.type === "student" ? "Institution" : "Company"}
            </label>
            <div className="relative">
              {formData.type === "student" ? (
                <School className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} size={16} />
              ) : (
                <Briefcase
                  className={`absolute left-3 top-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  size={16}
                />
              )}
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className={`${inputClasses} pl-10`}
                placeholder={formData.type === "student" ? "University/College Name" : "Company Name"}
              />
            </div>
            {errors.institution && <p className={errorClasses}>{errors.institution}</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <label className={labelClasses}>Events Interested In</label>
            <div className="space-y-2 mt-2">
              <label className={`flex items-center cursor-pointer ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <input
                  type="checkbox"
                  name="events"
                  value="hackathon"
                  checked={formData.events.includes("hackathon")}
                  onChange={handleCheckboxChange}
                  className={checkboxClasses}
                />
                <span className="ml-2">48-Hour Hackathon</span>
              </label>
              <label className={`flex items-center cursor-pointer ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <input
                  type="checkbox"
                  name="events"
                  value="workshops"
                  checked={formData.events.includes("workshops")}
                  onChange={handleCheckboxChange}
                  className={checkboxClasses}
                />
                <span className="ml-2">Technical Workshops</span>
              </label>
              <label className={`flex items-center cursor-pointer ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <input
                  type="checkbox"
                  name="events"
                  value="coding"
                  checked={formData.events.includes("coding")}
                  onChange={handleCheckboxChange}
                  className={checkboxClasses}
                />
                <span className="ml-2">Coding Competitions</span>
              </label>
              <label className={`flex items-center cursor-pointer ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <input
                  type="checkbox"
                  name="events"
                  value="startup"
                  checked={formData.events.includes("startup")}
                  onChange={handleCheckboxChange}
                  className={checkboxClasses}
                />
                <span className="ml-2">Startup Pitch</span>
              </label>
            </div>
            {errors.events && <p className={errorClasses}>{errors.events}</p>}
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              type="submit"
              className={`w-full py-3 px-6 ${
                darkMode
                  ? "bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                  : "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
              } rounded-lg text-white font-semibold shadow-lg flex items-center justify-center`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="mr-2" size={18} />
              Register Now
            </motion.button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  )
}

