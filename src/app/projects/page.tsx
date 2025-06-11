'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
  {
    title: 'Modern Office Complex',
    description: 'A state-of-the-art office building with sustainable design features.',
    image: '/projects/office.jpg',
    category: 'Commercial',
  },
  {
    title: 'Luxury Residential Villa',
    description: 'Custom-designed luxury villa with premium finishes and smart home features.',
    image: '/projects/villa.jpg',
    category: 'Residential',
  },
  {
    title: 'Shopping Mall Renovation',
    description: 'Complete renovation of a 50,000 sq ft shopping mall with modern amenities.',
    image: '/projects/mall.jpg',
    category: 'Commercial',
  },
  {
    title: 'Eco-Friendly Apartments',
    description: 'Sustainable apartment complex with green building certification.',
    image: '/projects/apartments.jpg',
    category: 'Residential',
  },
  {
    title: 'Industrial Warehouse',
    description: 'Large-scale industrial facility with advanced logistics systems.',
    image: '/projects/warehouse.jpg',
    category: 'Industrial',
  },
  {
    title: 'Smart Home Development',
    description: 'Community of smart homes with integrated technology solutions.',
    image: '/projects/smart-home.jpg',
    category: 'Residential',
  },
]

export default function Projects() {
  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-1 text-center mb-16"
          >
            Our Projects
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 