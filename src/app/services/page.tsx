'use client'

import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import Image from 'next/image'

function ServiceModel() {
  return (
    <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#E67E22" />
    </Sphere>
  )
}

const services = [
  {
    title: 'Residential Construction',
    description: 'We specialize in building custom homes that reflect your unique style and needs. Our team of experienced architects and builders will work with you every step of the way.',
    features: [
      'Custom home design',
      'Energy-efficient solutions',
      'Smart home integration',
      'Premium finishes',
    ],
    image: '/residential-construction.jpg',
  },
  {
    title: 'Commercial Construction',
    description: 'From office buildings to retail spaces, we deliver high-quality commercial construction projects that meet your business needs and exceed industry standards.',
    features: [
      'Office buildings',
      'Retail spaces',
      'Restaurants',
      'Industrial facilities',
    ],
    image: '/commercial-construction.jpg',
  },
  {
    title: 'Renovation & Remodeling',
    description: 'Transform your existing space with our comprehensive renovation and remodeling services. We handle everything from minor updates to complete transformations.',
    features: [
      'Interior renovations',
      'Exterior upgrades',
      'Structural modifications',
      'Modern amenities',
    ],
    image: '/renovation-and-remodeling.jpg',
  },
  {
    title: 'Project Management',
    description: 'Our expert project managers ensure your construction project stays on time and within budget while maintaining the highest quality standards.',
    features: [
      'Budget management',
      'Timeline coordination',
      'Quality control',
      'Stakeholder communication',
    ],
    image: '/project-management.jpg',
  },
]

export default function Services() {
  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-1 text-center mb-16"
          >
            Our Services
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-[500px] rounded-lg overflow-hidden"
            >
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <ServiceModel />
                <OrbitControls enableZoom={false} />
              </Canvas>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <h2 className="heading-2 mb-6">Building Excellence</h2>
              <p className="text-lg text-gray-600 mb-8">
                We are committed to delivering exceptional construction services that exceed our clients' expectations. Our team of experienced professionals combines expertise with innovation to bring your vision to life.
              </p>
              <ul className="space-y-4">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center"
                >
                  <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quality craftsmanship</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center"
                >
                  <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Timely project delivery</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center"
                >
                  <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sustainable practices</span>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {service.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 