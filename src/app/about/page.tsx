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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#882131]/5 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#882131]/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Header Section */}
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
            >
              Our Journey
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              About <span className="text-[#882131]">Us</span>
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
            >
              Building excellence through dedication, innovation, and unwavering commitment to quality
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                {/* Main Image Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                  <Image
                    src="/image/ChatGPT Image Jun 12, 2025, 04_08_03 PM.png"
                    alt="About Us"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-[#882131]">30+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-[#882131]">1000+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="space-y-8">
                {/* Main Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <p className="text-xl leading-relaxed text-gray-700">
                    Founded with a vision to revolutionize the industry, we've grown from a small team of passionate individuals to a global force in innovation and excellence.
                  </p>
                  <p className="text-xl leading-relaxed text-gray-700">
                    Our journey has been marked by continuous learning, adaptation, and a relentless pursuit of excellence. We believe in pushing boundaries and setting new standards in everything we do.
                  </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-2 gap-6"
                >
                  {[
                    { number: "50+", label: "Countries", icon: "🌍" },
                    { number: "24/7", label: "Support", icon: "🛟" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{stat.icon}</span>
                        <div>
                          <div className="text-3xl font-bold text-[#882131] group-hover:scale-110 transition-transform duration-300">
                            {stat.number}
                          </div>
                          <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="pt-4"
                >
                  <button className="group relative bg-[#882131] text-white px-8 py-4 rounded-lg font-semibold overflow-hidden">
                    <span className="relative z-10">Learn More About Us</span>
                    <div className="absolute inset-0 bg-[#882131] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                    <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300"></div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
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
            </motion.div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="text-4xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To deliver innovative solutions that empower businesses to achieve their goals while maintaining the highest standards of quality and customer service.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="text-4xl mb-6">👁️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the global leader in our industry, recognized for innovation, excellence, and our commitment to creating sustainable value for our clients and communities.
                </p>
              </motion.div>
            </div>

            {/* Core Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "💪",
                    title: "Excellence",
                    description: "We strive for excellence in everything we do, setting high standards and continuously improving."
                  },
                  {
                    icon: "🤝",
                    title: "Integrity",
                    description: "We conduct our business with honesty, transparency, and ethical practices."
                  },
                  {
                    icon: "💡",
                    title: "Innovation",
                    description: "We embrace creativity and innovation to deliver cutting-edge solutions."
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <div className="text-3xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Team Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "John Smith",
                    position: "CEO & Founder",
                    image: "/images/team-1.jpg"
                  },
                  {
                    name: "Sarah Johnson",
                    position: "Chief Operations Officer",
                    image: "/images/team-2.jpg"
                  },
                  {
                    name: "Michael Chen",
                    position: "Chief Technology Officer",
                    image: "/images/team-3.jpg"
                  }
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-gray-600">{member.position}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#882131] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#882131]/90 transition-colors duration-300 inline-flex items-center gap-2"
                >
                  Get in Touch
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 