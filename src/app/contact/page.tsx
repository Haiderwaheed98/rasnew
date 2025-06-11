'use client'

import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Plane } from '@react-three/drei'
import { useState } from 'react'
import Image from 'next/image'

function MapModel() {
  return (
    <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <meshStandardMaterial color="#2C3E50" />
    </Plane>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-1 text-center mb-16"
          >
            Contact Us
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Our Location</h2>
              <div className="relative h-64">
                <Image
                  src="/image/map.jpg"
                  alt="Map"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Address</h3>
                <p className="text-gray-600">123 Construction Ave, Building City, ST 12345</p>
                <h3 className="text-xl font-bold mt-4 mb-2">Contact</h3>
                <p className="text-gray-600">Phone: (123) 456-7890</p>
                <p className="text-gray-600">Email: info@construction.com</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
} 