'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'John Smith',
    position: 'CEO & Founder',
    image: '/team/john.jpg',
    bio: 'With over 20 years of experience in construction, John leads our company with vision and expertise.',
  },
  {
    name: 'Sarah Johnson',
    position: 'Chief Architect',
    image: '/team/sarah.jpg',
    bio: 'Sarah brings innovative design solutions and sustainable building practices to every project.',
  },
  {
    name: 'Michael Chen',
    position: 'Project Manager',
    image: '/team/michael.jpg',
    bio: 'Michael ensures all projects are completed on time and within budget while maintaining quality standards.',
  },
  {
    name: 'Emily Rodriguez',
    position: 'Lead Engineer',
    image: '/team/emily.jpg',
    bio: 'Emily oversees the technical aspects of our projects, ensuring structural integrity and safety.',
  },
]

export default function About() {
  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-1 text-center mb-16"
          >
            About Us
          </motion.h1>

          {/* Company Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <Image
                src="/about/company.jpg"
                alt="Our Company"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col justify-center"
            >
              <h2 className="heading-2 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2005, our construction company has grown from a small local builder to a leading construction firm serving clients nationwide. We've built our reputation on quality, innovation, and customer satisfaction.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team of experienced professionals combines traditional craftsmanship with modern technology to deliver exceptional results. We take pride in our ability to transform our clients' visions into reality while maintaining the highest standards of safety and sustainability.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-2">500+</h3>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-2">15+</h3>
                  <p className="text-gray-600">Years Experience</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: 'Quality',
                description: 'We never compromise on quality, using only the best materials and techniques.',
                icon: '🏗️',
              },
              {
                title: 'Innovation',
                description: 'We embrace new technologies and sustainable practices to deliver better results.',
                icon: '💡',
              },
              {
                title: 'Integrity',
                description: 'We conduct our business with honesty, transparency, and ethical practices.',
                icon: '🤝',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Team */}
          <div>
            <h2 className="heading-2 text-center mb-16">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-gray-600 mb-4">{member.position}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 