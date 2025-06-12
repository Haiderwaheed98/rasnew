'use client'

import { motion, useAnimation, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box } from '@react-three/drei'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

function BuildingModel() {
  return (
    <Box args={[2, 3, 2]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#FF6B00" />
    </Box>
  )
}

// Animated Counter component
function Counter({ from = 0, to, duration = 2, ...props }: { from?: number; to: number; duration?: number; [key: string]: any }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { 
    duration: duration * 1000,
    stiffness: 50,
    damping: 20
  });
  const rounded = useTransform(spring, (latest) => Math.floor(latest));
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) {
      motionValue.set(0);
      spring.set(0);
      setTimeout(() => {
        motionValue.set(to);
      }, 100);
    }
  }, [inView, to, motionValue, spring]);

  useEffect(() => {
    return rounded.on('change', (v) => setValue(v));
  }, [rounded]);

  return <span ref={ref} {...props}>{value}</span>;
}

// Animation variants for staggered children
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

// Slider component for the hero section
function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/image/banner/01.jpg',
      title: 'Building Your Future',
      subtitle: 'Excellence in Construction Since 1990',
      description: 'Transforming visions into reality with unmatched expertise and dedication.'
    },
    {
      image: '/image/banner/06.jpg',
      title: 'Innovative Solutions',
      subtitle: 'Modern Architecture & Design',
      description: 'Creating sustainable and innovative spaces that inspire and endure.'
    },
    {
      image: '/image/banner/07.jpg',
      title: 'Quality Craftsmanship',
      subtitle: 'Premium Construction Services',
      description: 'Delivering excellence in every project with attention to detail.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen">
      <div className="absolute top-0 left-0 w-1/4 h-0.5 bg-gradient-to-r from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-r-full"></div>
      <div className="absolute top-0 right-0 w-1/4 h-0.5 bg-gradient-to-l from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-l-full"></div>
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: currentSlide === index ? 1 : 0, x: currentSlide === index ? 0 : -50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-2xl"
              >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <h2 className="text-2xl md:text-3xl text-white/90 font-medium mb-6">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-8">
                  {slide.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#882131] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#882131]/90 transition-colors duration-300"
                >
                  Get Started
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
      <div className="absolute bottom-0 left-0 w-1/4 h-0.5 bg-gradient-to-r from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-r-full"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-0.5 bg-gradient-to-l from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-l-full"></div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-white/50 text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function MovingText() {
  const text = "Building Excellence • Quality Construction • Professional Service • Trusted Partner • Innovative Solutions • Premium Materials • Expert Team • Customer Satisfaction •";
  
  return (
    <div className="w-full bg-gradient-to-r from-[#1a365d] to-[#882131] py-4 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="text-white text-lg font-medium mx-4">{text}</span>
        <span className="text-white text-lg font-medium mx-4">{text}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const projects = [
    {
      title: 'Residential Project',
      description: 'A beautiful residential project completed with excellence.',
      image: '/image/project1.jpg',
      technologies: ['Residential', 'Modern Design'],
    },
    {
      title: 'Commercial Project',
      description: 'A state-of-the-art commercial building.',
      image: '/image/project2.jpg',
      technologies: ['Commercial', 'Innovation'],
    },
    {
      title: 'Renovation Project',
      description: 'Transforming an old space into a new one.',
      image: '/image/project3.jpg',
      technologies: ['Renovation', 'Sustainability'],
    },
  ]

  const team = [
    {
      name: 'John Doe',
      position: 'CEO',
      bio: 'John has over 20 years of experience in construction.',
      image: '/image/team1.jpg',
    },
    {
      name: 'Jane Smith',
      position: 'Project Manager',
      bio: 'Jane leads our projects with precision and care.',
      image: '/image/team2.jpg',
    },
    {
      name: 'Mike Johnson',
      position: 'Architect',
      bio: 'Mike designs innovative and sustainable buildings.',
      image: '/image/team3.jpg',
    },
  ]

  const testimonials = [
    {
      quote: "RAS Construction has transformed our vision into reality. Their attention to detail and commitment to quality is unmatched. The team's professionalism and expertise made our project a success.",
      name: "XYZ",
      position: "CEO, XYZ",
      image: "/image/testimonials/client1.jpg"
    },
    {
      quote: "Working with RAS Construction was a pleasure from start to finish. Their innovative approach and dedication to excellence set them apart in the industry.",
      name: "XYZ",
      position: "Director, XYZ",
      image: "/image/testimonials/client2.jpg"
    },
    {
      quote: "The team at RAS Construction delivered beyond our expectations. Their expertise in sustainable construction and attention to detail is remarkable.",
      name: "XYZ",
      position: "Managing Director, XYZ",
      image: "/image/testimonials/client3.jpg"
    }
  ];

  const articles = [
    {
      title: 'Latest Trends in Construction',
      excerpt: 'Discover the latest trends in the construction industry.',
      image: '/image/blogs/1-1.jpg',
      link: '/blog/latest-trends',
      category: 'Construction',
      date: '2025-06-11',
      readTime: 5,
    },
    {
      title: 'Sustainable Building Practices',
      excerpt: 'Learn about sustainable practices in modern construction.',
      image: '/image/blogs/54.jpg',
      link: '/blog/sustainable-practices',
      category: 'Sustainability',
      date: '2025-06-11',
      readTime: 7,
    },
    {
      title: 'Innovation in Construction',
      excerpt: 'How innovation is shaping the future of construction.',
      image: '/image/blogs/Industry-Trends.jpg',
      link: '/blog/innovation',
      category: 'Innovation',
      date: '2025-06-11',
      readTime: 6,
    },
  ]

  const blogPosts = [
    {
      title: 'Latest Construction Trends',
      excerpt: 'Discover the most innovative trends shaping the future of construction.',
      image: '/image/blogs/1-1.jpg',
      category: 'Construction',
      date: '2025-06-11',
      readTime: 5,
      link: '/blog/latest-trends'
    },
    {
      title: 'Sustainable Building Practices',
      excerpt: 'Exploring eco-friendly construction methods and their impact on the industry.',
      image: '/image/blogs/54.jpg',
      category: 'Sustainability',
      date: '2025-06-11',
      readTime: 7,
      link: '/blog/sustainable-practices'
    },
    {
      title: 'Industry Innovation',
      excerpt: 'How technology is revolutionizing modern construction methods.',
      image: '/image/blogs/Industry-Trends.jpg',
      category: 'Innovation',
      date: '2025-06-11',
      readTime: 6,
      link: '/blog/innovation'
    }
  ]

  return (
    <main className="min-h-screen">
      <HeroSlider />
      <MovingText />
      {/* Loader Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/4 h-0.5 bg-gradient-to-r from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-r-full"></div>
        <div className="absolute top-0 right-0 w-1/4 h-0.5 bg-gradient-to-l from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-l-full"></div>
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/5 via-[#882131]/3 to-[#1a365d]/5">
          <div className="absolute inset-0 bg-[url('/image/pattern.png')] opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#882131]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#1a365d]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#882131]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
        <motion.div
    className="absolute right-0 top-0 w-96 h-96 opacity-50 pointer-events-none z-0"
    animate={{
      rotate: 360,
      y: [0, -30, 0],
    }}
    transition={{
      rotate: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      },
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  >
    <Image
      src="/image/features-bg-shape.png"
      alt="Decorative Shape"
      width={400}
      height={400}
      className="w-full h-full object-contain"
    />
  </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <div className="w-24 h-1 bg-[#882131] mx-auto mb-6"></div>
            <p className="text-lg text-gray-900 max-w-2xl mx-auto">
              Building excellence through dedication, innovation, and unwavering commitment to quality
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Projects Completed */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }
              }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#882131]/5 rounded-bl-full transition-all duration-500 group-hover:bg-[#882131]/10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#882131]/5 rounded-tr-full transition-all duration-500 group-hover:bg-[#882131]/10"></div>
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-[#882131]/5 rounded-full transition-all duration-500 group-hover:bg-[#882131]/10"></div>
              
              <div className="relative z-10">
                {/* Icon container with enhanced styling */}
                <div className="relative mb-8">
                  <div className="absolute -inset-4 bg-[#882131]/5 rounded-full blur-xl group-hover:bg-[#882131]/10 transition-all duration-500"></div>
                  <div className="relative w-16 h-16 bg-[#882131]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>

                {/* Content with enhanced layout */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 relative">
                    <span className="relative z-10">Projects Completed</span>
                    <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#882131]/20 rounded-full"></div>
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <Counter
                      to={150}
                      duration={2.5}
                      className="text-4xl font-bold text-[#882131]"
                    />
                    <span className="text-2xl font-bold text-[#882131] ml-2">+</span>
                  </div>
                  <p className="text-gray-600 relative pl-4 border-l-2 border-[#882131]/20">Completed with excellence and client satisfaction</p>
                </div>
              </div>
            </motion.div>

            {/* Client Satisfaction */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2
                  }
                }
              }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a365d]/5 rounded-bl-full transition-all duration-500 group-hover:bg-[#1a365d]/10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#1a365d]/5 rounded-tr-full transition-all duration-500 group-hover:bg-[#1a365d]/10"></div>
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-[#1a365d]/5 rounded-full transition-all duration-500 group-hover:bg-[#1a365d]/10"></div>
              
              <div className="relative z-10">
                {/* Icon container with enhanced styling */}
                <div className="relative mb-8">
                  <div className="absolute -inset-4 bg-[#1a365d]/5 rounded-full blur-xl group-hover:bg-[#1a365d]/10 transition-all duration-500"></div>
                  <div className="relative w-16 h-16 bg-[#1a365d]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>

                {/* Content with enhanced layout */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 relative">
                    <span className="relative z-10">Client Satisfaction</span>
                    <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#1a365d]/20 rounded-full"></div>
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <Counter
                      to={98}
                      duration={2.5}
                      className="text-4xl font-bold text-[#1a365d]"
                    />
                    <span className="text-2xl font-bold text-[#1a365d] ml-2">%</span>
                  </div>
                  <p className="text-gray-600 relative pl-4 border-l-2 border-[#1a365d]/20">Happy clients who trust our services</p>
                </div>
              </div>
            </motion.div>

            {/* Years of Experience */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.4
                  }
                }
              }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#882131]/5 rounded-bl-full transition-all duration-500 group-hover:bg-[#882131]/10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#882131]/5 rounded-tr-full transition-all duration-500 group-hover:bg-[#882131]/10"></div>
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-[#882131]/5 rounded-full transition-all duration-500 group-hover:bg-[#882131]/10"></div>
              
              <div className="relative z-10">
                {/* Icon container with enhanced styling */}
                <div className="relative mb-8">
                  <div className="absolute -inset-4 bg-[#882131]/5 rounded-full blur-xl group-hover:bg-[#882131]/10 transition-all duration-500"></div>
                  <div className="relative w-16 h-16 bg-[#882131]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                {/* Content with enhanced layout */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 relative">
                    <span className="relative z-10">Years of Experience</span>
                    <div className="absolute -bottom-2 left-0 w-12 h-1 bg-[#882131]/20 rounded-full"></div>
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <Counter
                      to={30}
                      duration={2.5}
                      className="text-4xl font-bold text-[#882131]"
                    />
                    <span className="text-2xl font-bold text-[#882131] ml-2">+</span>
                  </div>
                  <p className="text-gray-600 relative pl-4 border-l-2 border-[#882131]/20">Delivering excellence since 1990</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
        {/* Decorative Lines */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#882131] to-transparent opacity-50"></div>
      </section>

      {/* About Our Company Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  About our Company
                </h2>
                <div className="w-20 h-1 bg-[#882131]"></div>
                <p className="text-xl text-gray-600 font-medium">
                  Delivering our clients more project clarity, greater insight, and less chaos.
                </p>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  RAS Construction and Project Management is a leading contractor based in Abu Dhabi, specializing in a wide range of construction services. We offer a complete "one-stop-shop" solution, providing Design & Build, Traditional, and Turnkey contracts for complex projects across the GCC.
                </p>
                <p>
                  Our team is committed to safety and efficiency, fostering a "Think Safety, Work Safely" culture throughout the company. With strong technical expertise and advanced manufacturing capabilities, we focus on various sectors including:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-[#882131] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Main Contracting
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-[#882131] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      MEP
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-[#882131] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Infrastructure
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-[#882131] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Facade Works
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-[#882131] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Fit-Outs
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-[#882131] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Waterproofing
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-[#882131] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Manufacturing
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-[#882131] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Building Materials
                    </li>
                  </ul>
                </div>
                <p>
                  Additionally, our specialized teams excel in manufacturing GRC, GRP, GRG, UHPC, Aluminium & Glazing, Joinery, Precast Building Components, and Building Materials.
                </p>
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-lg mx-auto"
            >
              <div className="relative z-10">
                <div className="absolute -inset-2 bg-[#882131]/5 rounded-2xl"></div>
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative"
                  >
                    <Image
                      src="/image/slider/image5.jpg"
                      alt="RAS Construction Office"
                      width={600}
                      height={750}
                      className="w-full h-auto object-cover"
                      quality={100}
                      priority
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </motion.div>
                </motion.div>
              </div>
              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-20 h-20 bg-[#882131]/5 rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#882131]/5 rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/5 via-[#882131]/3 to-[#1a365d]/5">
          <div className="absolute inset-0 bg-[url('/image/pattern.png')] opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#882131]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#1a365d]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#882131]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-1/4 h-0.5 bg-gradient-to-r from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-r-full"></div>
        <div className="absolute top-0 right-0 w-1/4 h-0.5 bg-gradient-to-l from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-l-full"></div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#882131] to-[#1a365d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive construction and contracting solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Contracting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/5 to-[#882131]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#882131] to-[#1a365d] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-8 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#882131]/10 to-[#1a365d]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                  <svg className="w-10 h-10 text-[#882131] group-hover:text-[#1a365d] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Main Contracting</h3>
                <p className="text-gray-600">Complete construction solutions from concept to completion</p>
              </div>
            </motion.div>

            {/* MEP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/5 to-[#882131]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#882131] to-[#1a365d] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-8 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#882131]/10 to-[#1a365d]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                  <svg className="w-10 h-10 text-[#882131] group-hover:text-[#1a365d] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">MEP</h3>
                <p className="text-gray-600">Expert mechanical, electrical, and plumbing solutions ensuring optimal building performance and efficiency.</p>
              </div>
            </motion.div>

            {/* Facade Contracting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/5 to-[#882131]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#882131] to-[#1a365d] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="p-8 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#882131]/10 to-[#1a365d]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                  <svg className="w-10 h-10 text-[#882131] group-hover:text-[#1a365d] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Facade Contracting</h3>
                <p className="text-gray-600">Innovative and sustainable facade solutions that enhance building aesthetics and performance.</p>
              </div>
            </motion.div>
          </div>

          {/* View More Button */}
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#882131] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#1a365d] transition-colors duration-300"
            >
              <Link href="/services">View All Services</Link>
            </motion.button>
          </div>
        </div>

        {/* Bottom Decorative Lines */}
        <div className="absolute bottom-0 left-0 w-1/4 h-0.5 bg-gradient-to-r from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-r-full"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-0.5 bg-gradient-to-l from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-l-full"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Floating Background Image */}
        <motion.div
          className="absolute right-0 top-0 w-96 h-96 opacity-20 pointer-events-none z-0"
          animate={{
            rotate: 360,
            y: [0, -30, 0],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Image
            src="/image/about-agency-bg.png"
            alt="Decorative Background"
            width={400}
            height={400}
            className="w-full h-full object-contain"
          />
        </motion.div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative max-w-md mx-auto"
            >
              <div className="relative z-10">
                <div className="absolute -inset-2 bg-[#882131]/5 rounded-2xl"></div>
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative"
                  >
                    <Image
                      src="/image/12.png"
                      alt="How It Works"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      quality={100}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  How It Works
                </h2>
                <div className="w-24 h-1 bg-[#882131]"></div>
                <p className="text-lg text-gray-600">
                  Our streamlined process ensures efficient project delivery and client satisfaction
                </p>
              </div>

              <div className="space-y-6">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-[#882131]/10 rounded-full flex items-center justify-center">
                      <Image
                        src="/image/step1.png"
                        alt="Consultation"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#882131] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Initial Consultation</h3>
                    <p className="text-gray-600">We discuss your requirements and project goals in detail</p>
                  </div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-[#1a365d]/10 rounded-full flex items-center justify-center">
                      <Image
                        src="/image/step2.png"
                        alt="Planning"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#1a365d] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Planning</h3>
                    <p className="text-gray-600">We develop a comprehensive plan tailored to your needs</p>
                  </div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-start space-x-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-[#882131]/10 rounded-full flex items-center justify-center">
                      <Image
                        src="/image/step3.png"
                        alt="Execution"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#882131] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Project Execution</h3>
                    <p className="text-gray-600">We implement the plan with precision and expertise</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-4"
              >
                <Link
                  href="/contact"
                  className="inline-block bg-[#882131] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#882131]/90 transition-colors duration-300"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Decorative Lines */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#882131] to-transparent opacity-50"></div>
      </section>

      {/* Completed Projects Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/5 via-[#882131]/3 to-[#1a365d]/5">
          <div className="absolute inset-0 bg-[url('/image/pattern.png')] opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#882131]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#1a365d]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#882131]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Completed Projects
            </h2>
            <div className="w-24 h-1 bg-[#882131] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of successful projects that showcase our expertise and commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="/image/projects/420275071.jpg"
                    alt="Luxury Villa Complex"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-3 py-1 bg-[#882131] text-white text-sm rounded-full">Residential</span>
                      <span className="px-3 py-1 bg-[#1a365d] text-white text-sm rounded-full">Luxury</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#882131] transition-colors duration-300">Luxury Villa Complex</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">A stunning residential development featuring modern architecture and premium amenities</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-[#882131] font-semibold">Abu Dhabi</span>
                    </div>
                    <Link href="/projects/1" className="text-[#882131] hover:text-[#1a365d] transition-colors duration-300 flex items-center space-x-1">
                      <span>View Details</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="/image/projects/unnamed.jpg"
                    alt="Commercial Tower"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-3 py-1 bg-[#882131] text-white text-sm rounded-full">Commercial</span>
                      <span className="px-3 py-1 bg-[#1a365d] text-white text-sm rounded-full">Office</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#882131] transition-colors duration-300">Commercial Tower</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">A state-of-the-art office complex designed for optimal productivity and comfort</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-[#882131] font-semibold">Dubai</span>
                    </div>
                    <Link href="/projects/2" className="text-[#882131] hover:text-[#1a365d] transition-colors duration-300 flex items-center space-x-1">
                      <span>View Details</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="/image/projects/dubai-mall.jpg"
                    alt="Shopping Mall"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-3 py-1 bg-[#882131] text-white text-sm rounded-full">Retail</span>
                      <span className="px-3 py-1 bg-[#1a365d] text-white text-sm rounded-full">Shopping</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#882131] transition-colors duration-300">Shopping Mall</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">A modern retail space combining functionality with architectural excellence</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-[#882131] font-semibold">Sharjah</span>
                    </div>
                    <Link href="/projects/3" className="text-[#882131] hover:text-[#1a365d] transition-colors duration-300 flex items-center space-x-1">
                      <span>View Details</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="inline-block bg-[#882131] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#882131]/90 transition-colors duration-300"
            >
              <Link href="/projects">View All Projects</Link>
            </Link>
          </motion.div>
        </div>
        {/* Decorative Lines */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#882131] to-transparent opacity-50"></div>
      </section>

      {/* Awesome Team Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Awesome Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="group"
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#882131] transition-colors duration-300">{member.name}</h3>
                    <p className="text-[#882131] font-semibold mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#882131]/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1a365d]/5 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover why leading organizations trust us with their construction and development needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl relative h-[400px] flex flex-col">
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-[#882131] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-8 text-lg leading-relaxed line-clamp-4 h-32">{testimonial.quote}</p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-gray-900 text-xl mb-1">{testimonial.name}</h4>
                      <p className="text-[#882131] font-medium">{testimonial.position}</p>
                      <div className="w-16 h-1 bg-[#882131] rounded-full mt-4"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles & Blog Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/5 via-[#882131]/3 to-[#1a365d]/5">
          <div className="absolute inset-0 bg-[url('/image/pattern.png')] opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-[#882131]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-[#1a365d]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#882131]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-1/4 h-0.5 bg-gradient-to-r from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-r-full"></div>
        <div className="absolute top-0 right-0 w-1/4 h-0.5 bg-gradient-to-l from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-l-full"></div>

        <div className="container mx-auto px-4 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest Articles & Insights
            </h2>
            <div className="w-24 h-1 bg-[#882131] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest trends, innovations, and insights in the construction industry
            </p>
          </motion.div>

          {/* Articles Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-[#882131] text-white text-sm font-medium rounded-full shadow-lg">
                      {article.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium rounded-full shadow-lg">
                      {article.readTime} min read
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <svg className="w-4 h-4 mr-2 text-[#882131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {article.date}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#882131] transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {article.excerpt}
                  </p>
                  <Link
                    href={article.link}
                    className="inline-flex items-center text-[#882131] font-medium hover:text-[#1a365d] transition-colors duration-300"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-3 bg-[#882131] text-white rounded-full hover:bg-[#1a365d] transition-colors duration-300 group"
            >
              View All Articles
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Decorative Lines */}
        <div className="absolute bottom-0 left-0 w-1/4 h-0.5 bg-gradient-to-r from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-r-full"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-0.5 bg-gradient-to-l from-[#1a365d] via-[#882131] to-transparent animate-gradient-x shadow-[0_0_10px_rgba(136,33,49,0.5)] rounded-l-full"></div>
      </section>

      {/* Footer */}
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
    </main>
  )
}

const services = [
  {
    title: 'Residential Construction',
    description: 'Custom home building and renovation services tailored to your needs.'
  },
  {
    title: 'Commercial Projects',
    description: 'Office buildings, retail spaces, and industrial facilities construction.'
  },
  {
    title: 'Project Management',
    description: 'Comprehensive project management and consulting services.'
  }
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/image/logo.png"
                alt="Construction Logo"
                width={180}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={item.href}
                  className={`relative text-lg font-medium ${
                    scrolled ? 'text-gray-800' : 'text-white'
                  } hover:!text-[#882131] transition-colors duration-300 group`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#882131] transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full ${
                scrolled 
                  ? 'bg-[#882131] text-white' 
                  : 'bg-white text-[#882131]'
              } font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={`w-6 h-6 flex flex-col justify-between ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`block text-lg font-medium ${
                    scrolled ? 'text-gray-800' : 'text-white'
                  } hover:!text-[#882131] transition-colors duration-300`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full px-6 py-2 rounded-full ${
                scrolled 
                  ? 'bg-[#882131] text-white' 
                  : 'bg-white text-[#882131]'
              } font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  ); 
} 