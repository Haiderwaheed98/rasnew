'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Counter component for animated numbers
function Counter({ from = 0, to, duration = 2, ...props }: { from?: number; to: number; duration?: number; [key: string]: any }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * (to - from) + from))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration])

  return <span {...props}>{count}+</span>
}

export default function AboutPage() {
  const { scrollY } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const y = useTransform(scrollY, [0, 500], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-[#1a365d] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <Image
            src="/image/about.png"
            alt="About Us"
            fill
            className="object-cover object-center scale-150 opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a365d]/98 via-[#1a365d]/90 to-transparent"></div>
          
          {/* Animated Circles */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] rounded-full border-2 border-white/20"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full border-2 border-white/20"
          />

          {/* Floating Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.1, 1],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute w-4 h-4 rounded-full bg-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}

          {/* Mouse Follow Effect */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-[#882131]/5 blur-3xl pointer-events-none"
            animate={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl text-center"
          >
            {/* Title with Letter Animation */}
            <div className="relative inline-block">
              <motion.h1 
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-6xl font-bold text-white mb-6 group"
              >
                {"About ".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
                <span className="relative inline-block">
                  {"Us".split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      className="inline-block text-[#882131] group-hover:text-[#a82a3f] transition-colors duration-300"
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-1.5 bg-[#882131] absolute bottom-0 left-0 group-hover:bg-[#a82a3f] transition-colors duration-300"
                  />
                </span>
              </motion.h1>
            </div>

            {/* Animated Description with Glow Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative mt-8"
            >
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed hover:text-white transition-colors duration-300">
                We are a team of passionate professionals dedicated to delivering exceptional services and creating lasting value for our clients.
              </p>
              
              {/* Enhanced Decorative Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -left-6 top-1/2 w-3 h-3 rounded-full bg-[#882131] hover:scale-125 transition-transform duration-300"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -right-6 top-1/2 w-3 h-3 rounded-full bg-[#882131] hover:scale-125 transition-transform duration-300"
              />
            </motion.div>

            {/* Stats Section with Enhanced Animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { number: 15, label: "Years Experience" },
                { number: 500, label: "Projects Completed" },
                { number: 100, label: "Team Members" },
                { number: 50, label: "Awards Won" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-white/5 rounded-lg transform group-hover:bg-white/10 transition-all duration-300" />
                  <div className="relative p-6 text-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-[#882131] transition-colors duration-300"
                    >
                      <Counter 
                        to={stat.number} 
                        duration={2.5} 
                        className="inline-block"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                      className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300"
                    >
                      {stat.label}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{ y }}
        >
          <div className="flex flex-col items-center">
            <motion.span 
              className="text-white/50 text-sm mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll Down
            </motion.span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center hover:border-white/50 transition-colors duration-300"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-white/50 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid.svg')] opacity-5"></div>
          
          {/* Single Rotating Background Image */}
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ 
              opacity: 0.5,
              y: [0, 50, 0],
              rotate: [0, 360],
              scale: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src="/image/56-removebg-preview.png"
              alt="Background Pattern"
              width={800}
              height={800}
              className="object-contain opacity-80"
            />
          </motion.div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, index) => (
            <motion.div
              key={`particle-${index}`}
              initial={{ 
                opacity: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50
              }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                x: [
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50
                ],
                y: [
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50
                ],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: index * 0.2
              }}
              className="absolute w-2 h-2 bg-[#882131] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}

          {/* Animated Gradient Orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [0.8, 1.2, 0.8],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-[#882131]/20 to-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [0.8, 1.2, 0.8],
              x: [0, -50, 0],
              y: [0, -30, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-l from-[#882131]/20 to-blue-500/20 rounded-full blur-3xl"
          />

          {/* Mouse Follow Effect */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-[#882131]/5 blur-3xl pointer-events-none"
            animate={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Header Section with Enhanced Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 bg-[#882131]/10 rounded-full text-[#882131] font-semibold text-sm tracking-wider uppercase mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Our Journey
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Our <span className="text-[#882131]">Story</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-32 h-1 bg-[#882131] mx-auto mb-8"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              A decade of innovation, growth, and excellence in real estate
            </motion.p>
          </motion.div>

          {/* Timeline Section with Enhanced Animations */}
          <div className="max-w-4xl mx-auto">
            {[
              {
                year: "2014",
                title: "The Beginning",
                description: "Started with a vision to transform the real estate industry",
                icon: "🚀"
              },
              {
                year: "2016",
                title: "First Milestone",
                description: "Expanded to multiple cities and launched our digital platform",
                icon: "💡"
              },
              {
                year: "2018",
                title: "Innovation Era",
                description: "Introduced AI-powered property matching and virtual tours",
                icon: "🤖"
              },
              {
                year: "2020",
                title: "Global Reach",
                description: "Established presence in international markets",
                icon: "🌍"
              },
              {
                year: "2024",
                title: "Today",
                description: "Leading the industry with cutting-edge technology and exceptional service",
                icon: "⭐"
              }
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <motion.div 
                      className="text-4xl mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {milestone.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </motion.div>
                </div>

                {/* Timeline Line */}
                <div className="relative flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "#882131",
                      color: "white"
                    }}
                    className="w-16 h-16 bg-[#882131] rounded-full flex items-center justify-center text-white text-xl font-bold cursor-pointer"
                  >
                    {milestone.year}
                  </motion.div>
                  {index < 4 && (
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: 96 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="w-1 bg-[#882131]/20 absolute top-16"
                    />
                  )}
                </div>

                {/* Empty Space */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
     
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Founded with a vision to revolutionize the industry, we've grown from a small team to a leading service provider. Our journey has been marked by innovation, dedication, and a relentless focus on client satisfaction.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Today, we continue to push boundaries and set new standards in our field, always staying true to our core values of excellence, integrity, and customer-centricity.
                  </p>
                </div>
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src="/images/office.jpg"
                    alt="Our Office"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div> */}

           

          

            {/* CTA Section */}
          

      {/* Company Introduction Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-gradient-to-br from-[#882131]/5 to-transparent"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#882131]/5 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Animated Border */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute -inset-4 bg-gradient-to-r from-[#882131] via-[#882131]/50 to-[#882131] rounded-3xl blur-sm"
              />
              
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4"
              >
                {/* Animated Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"
                />
                
                {/* Shimmer Effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
                />

                <Image
                  src="/image/ChatGPT Image Jun 12, 2025, 04_08_03 PM.png"
                  alt="RAS Construction"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700 relative z-0"
                />

                {/* Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="absolute top-4 right-4 w-16 h-16 bg-[#882131]/10 rounded-full blur-xl"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute bottom-4 left-4 w-20 h-20 bg-[#882131]/10 rounded-full blur-xl"
                />
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-gray-900"
                >
                  Welcome to <span className="text-[#882131]">RAS Construction & Project Management</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  RAS Construction and Project Management is a prominent contractor based in Abu Dhabi, known for delivering high-quality projects across various sectors including Residential, Healthcare, and Infrastructure. We specialize in Design & Build, Traditional, and Turnkey contracts, offering a comprehensive range of services from planning and design to execution. Our focus is on providing innovative, sustainable solutions that meet the unique needs of each client. At RAS Construction and Project Management, we are dedicated to not only constructing buildings but also contributing to the growth and development of communities through our work.
                </motion.p>
              </motion.div>

              {/* Vision & Mission Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    👁️
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
                  <p className="text-gray-600">
                    To be the leading construction company in the GCC, renowned for delivering innovative, sustainable, and high-quality projects that shape the future of the region's infrastructure, communities, and skylines.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    🎯
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
                  <p className="text-gray-600">
                    At RAS Construction and Project Management, our mission is to provide exceptional construction services through a commitment to excellence, integrity, and client satisfaction. We aim to deliver integrated, cost-effective, and bespoke solutions across diverse sectors, fostering long-term partnerships and contributing to the growth and development of the region.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services & Offerings Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-gradient-to-br from-[#882131]/5 to-transparent"
        />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services & Expertise</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Delivering comprehensive solutions across multiple disciplines to meet your construction and development needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Engineering & Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div 
                className="text-4xl mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                🏗️
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Engineering & Design</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  Structural Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  Architectural Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  MEP Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  BIM Modeling
                </li>
              </ul>
            </motion.div>

            {/* Research & Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div 
                className="text-4xl mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                🔬
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Research & Development</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  Material Testing
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  Process Optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  Quality Control
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  Performance Analysis
                </li>
              </ul>
            </motion.div>

            {/* Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div 
                className="text-4xl mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                💡
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  Smart Building Solutions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  Sustainable Technologies
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  Digital Construction
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#882131]">•</span>
                  Green Building Practices
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Additional Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "📊", title: "Project Management" },
                { icon: "🔍", title: "Quality Assurance" },
                { icon: "📝", title: "Consulting" },
                { icon: "🏢", title: "Facility Management" }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-xl bg-gray-50"
                >
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h4 className="font-semibold text-gray-900">{service.title}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      
      <footer className="bg-[#1a365d] text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#882131]/5 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#882131]/5 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#882131]/5 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#882131] to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#882131] to-transparent opacity-50"></div>

        <div className="container mx-auto px-4 py-20 relative">
          {/* Newsletter Section */}
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">Subscribe to our newsletter for the latest updates and insights</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#882131] focus:outline-none text-white placeholder-gray-400"
                />
                <button className="px-8 py-3 bg-[#882131] hover:bg-[#882131]/90 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Link href="/" className="inline-block group">
                <div className="relative">
                  <Image
                    src="/image/logo/2.png"
                    alt="RAS Construction"
                    width={320}
                    height={128}
                    className="h-32 w-auto transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -inset-2 bg-[#882131]/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
              <p className="text-gray-300 leading-relaxed">
                Delivering excellence in construction and development across the UAE with innovative solutions and unmatched expertise.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: "facebook", href: "#" },
                  { icon: "twitter", href: "#" },
                  { icon: "instagram", href: "#" },
                  { icon: "linkedin", href: "#" }
                ].map((social, index) => (
                  <motion.a
                    key={social.icon}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#882131] transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="absolute -inset-2 bg-[#882131]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <svg className="w-6 h-6 transform transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                        {/* Social media icons paths */}
                        {social.icon === "facebook" && (
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        )}
                        {social.icon === "twitter" && (
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        )}
                        {social.icon === "instagram" && (
                          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                        )}
                        {social.icon === "linkedin" && (
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        )}
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-4 relative inline-block">
                Contact Us
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#882131] rounded-full"></div>
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#882131]/20 flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg className="w-6 h-6 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300 mb-2">Call Us Now</p>
                    <a href="tel:+97128779490" className="text-white hover:text-[#882131] transition-colors duration-300 block mb-1">+971 28 779 490</a>
                    <a href="tel:+971505983733" className="text-white hover:text-[#882131] transition-colors duration-300 block">(+971) 50 598 3733</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#882131]/20 flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg className="w-6 h-6 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300 mb-2">Need Support</p>
                    <a href="mailto:Info@rasconstructions.com" className="text-white hover:text-[#882131] transition-colors duration-300">Info@rasconstructions.com</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#882131]/20 flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg className="w-6 h-6 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300 mb-2">Our Address</p>
                    <p className="text-white">Abu Dhabi, UAE</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-4 relative inline-block">
                Office Hours
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#882131] rounded-full"></div>
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-xl bg-[#882131]/20 flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <svg className="w-6 h-6 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300 mb-2">Working Hours</p>
                    <p className="text-white mb-1">Mon-Fri: 8:30 am to 6:00 pm</p>
                    <p className="text-white">Sat: 8:30 am to 2:00 pm</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-4 relative inline-block">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#882131] rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Services", href: "/services" },
                  { name: "Projects", href: "/projects" },
                  { name: "Contact Us", href: "/contact" }
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-[#882131] transition-colors duration-300 group"
                    >
                      <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-300">&copy; {new Date().getFullYear()} RAS Construction. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-300 hover:text-[#882131] transition-colors duration-300">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-300 hover:text-[#882131] transition-colors duration-300">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative Lines */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#882131] to-transparent opacity-50"></div>
      </footer>
    </div>
  )
} 