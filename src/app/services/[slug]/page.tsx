'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    id: 1,
    title: "Main Contracting",
    description: "Complete project management and execution of construction projects with our expert team.",
    icon: "🏗️",
    image: "/image/services/main-contracting.jpg",
    details: "Our main contracting services encompass comprehensive project management and execution of construction projects. We handle everything from initial planning to final delivery, ensuring quality and efficiency at every step.",
    features: [
      "Project Planning and Management",
      "Quality Control and Assurance",
      "Timely Project Delivery",
      "Cost Management",
      "Safety Compliance",
      "Resource Optimization"
    ]
  },
  {
    id: 2,
    title: "MEP",
    description: "Mechanical, Electrical, and Plumbing solutions for optimal building performance.",
    icon: "⚡",
    image: "/image/services/mep.jpg",
    details: "Our MEP services provide comprehensive mechanical, electrical, and plumbing solutions that ensure optimal building performance, energy efficiency, and occupant comfort.",
    features: [
      "HVAC Systems Design & Installation",
      "Electrical Power Distribution",
      "Plumbing & Drainage Systems",
      "Fire Protection Systems",
      "Building Automation",
      "Energy Management"
    ]
  },
  {
    id: 3,
    title: "Facade Contracting",
    description: "Specialized exterior solutions that combine aesthetics with functionality.",
    icon: "🏢",
    image: "/image/services/facade.jpg",
    details: "Our facade contracting services deliver innovative and sustainable exterior solutions that enhance building aesthetics while ensuring optimal performance and durability.",
    features: [
      "Curtain Wall Systems",
      "Cladding Solutions",
      "Glass Facades",
      "Architectural Metalwork",
      "Weather Protection",
      "Energy-Efficient Design"
    ]
  },
  {
    id: 4,
    title: "Infrastructure",
    description: "Comprehensive infrastructure development and management services.",
    icon: "🌉",
    image: "/image/services/infrastructure.jpg",
    details: "Our infrastructure services cover the complete spectrum of civil engineering and development projects, from roads and bridges to utilities and public spaces.",
    features: [
      "Road & Bridge Construction",
      "Utility Infrastructure",
      "Drainage Systems",
      "Public Space Development",
      "Site Preparation",
      "Infrastructure Maintenance"
    ]
  },
  {
    id: 5,
    title: "Joinery Works",
    description: "Custom woodwork and joinery solutions for interior and exterior applications.",
    icon: "🪚",
    image: "/image/services/joinery.jpg",
    details: "Our joinery services provide high-quality custom woodwork solutions that combine traditional craftsmanship with modern techniques for both interior and exterior applications.",
    features: [
      "Custom Furniture",
      "Interior Woodwork",
      "Exterior Joinery",
      "Architectural Woodwork",
      "Cabinet Making",
      "Wood Finishing"
    ]
  },
  {
    id: 6,
    title: "Fit Out Works",
    description: "Complete interior fit-out solutions for commercial and residential spaces.",
    icon: "🏠",
    image: "/image/services/fitout.jpg",
    details: "Our fit-out services transform spaces into functional and aesthetically pleasing environments, whether for commercial, retail, or residential purposes.",
    features: [
      "Commercial Fit-outs",
      "Retail Space Design",
      "Office Interiors",
      "Residential Fit-outs",
      "Space Planning",
      "Interior Finishing"
    ]
  },
  {
    id: 7,
    title: "Aluminum and Glazing",
    description: "High-quality aluminum and glazing solutions for modern architecture.",
    icon: "🪟",
    image: "/image/services/glazing.jpg",
    details: "Our aluminum and glazing services provide innovative solutions that combine durability, aesthetics, and energy efficiency for modern architectural projects.",
    features: [
      "Aluminum Windows & Doors",
      "Glass Facades",
      "Skylights & Canopies",
      "Curtain Walls",
      "Energy-Efficient Glazing",
      "Custom Aluminum Solutions"
    ]
  },
  {
    id: 8,
    title: "Water Proofing",
    description: "Comprehensive waterproofing solutions to protect your structures.",
    icon: "💧",
    image: "/image/services/waterproofing.jpg",
    details: "Our waterproofing services ensure the long-term protection of structures through comprehensive solutions that prevent water ingress and damage.",
    features: [
      "Roof Waterproofing",
      "Basement Protection",
      "Bathroom Waterproofing",
      "Terrace Waterproofing",
      "Foundation Protection",
      "Waterproofing Maintenance"
    ]
  },
  {
    id: 9,
    title: "Pods",
    description: "Modular pod solutions for flexible and efficient space utilization.",
    icon: "📦",
    image: "/image/services/pods.jpg",
    details: "Our pod solutions offer innovative modular spaces that provide flexibility and efficiency for various applications, from residential to commercial use.",
    features: [
      "Modular Living Spaces",
      "Commercial Pods",
      "Educational Pods",
      "Healthcare Pods",
      "Custom Pod Solutions",
      "Quick Installation"
    ]
  }
]

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = services.find(s => s.title.toLowerCase().replace(/\s+/g, '-') === params.slug)

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-[#1a365d]">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a365d] via-[#1a365d]/90 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl mb-6"
            >
              {service.icon}
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{service.title}</h1>
            <p className="text-xl text-gray-200 max-w-2xl">{service.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">{service.details}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#882131]/5 rounded-xl p-6">
                  <div className="text-2xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Approach</h3>
                  <p className="text-gray-600">We combine expertise with innovation to deliver exceptional results that exceed expectations.</p>
                </div>
                <div className="bg-[#882131]/5 rounded-xl p-6">
                  <div className="text-2xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                  <p className="text-gray-600">Rigorous quality control processes ensure the highest standards in every project.</p>
                </div>
                <div className="bg-[#882131]/5 rounded-xl p-6">
                  <div className="text-2xl mb-4">🤝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Client Focus</h3>
                  <p className="text-gray-600">We prioritize client satisfaction through transparent communication and dedicated support.</p>
                </div>
              </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-4 bg-gray-50 rounded-xl p-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#882131]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why Choose Us Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#882131]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">💪</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
                      <p className="text-gray-600">Our team consists of highly skilled professionals with extensive experience in the industry.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#882131]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Response</h3>
                      <p className="text-gray-600">We ensure prompt response and efficient handling of all client requirements.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#882131]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Focus</h3>
                      <p className="text-gray-600">We maintain the highest standards of quality in every aspect of our work.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#882131]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Client Satisfaction</h3>
                      <p className="text-gray-600">Your satisfaction is our priority, and we work tirelessly to exceed expectations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#882131] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#882131]/90 transition-colors duration-300 inline-flex items-center gap-2"
                >
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
                >
                  Back to Services
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 