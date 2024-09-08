import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Info } from 'lucide-react';

const culturalElements = [
  { title: 'Art & Crafts', image: '/images/mithila-arts.webp', link: '/culture/arts-crafts', description: 'Vibrant paintings and intricate handicrafts', funFact: 'Madhubani paintings are traditionally created using fingers, twigs, and natural dyes.' },
  { title: 'Cuisine', image: '/images/litti-chokha.jpg', link: '/culture/cuisine', description: 'Delectable flavors of traditional Mithila dishes', funFact: 'The famous "Makhana" (fox nuts) from Mithila are considered a superfood and are used in various dishes.' },
  { title: 'Festivals', image: '/images/chhath-puja.jpg', link: '/culture/festivals', description: 'Colorful celebrations and joyous traditions', funFact: 'Chhath Puja, a major festival in Mithila, is dedicated to the Sun God and his sister Chhathi Maiya.' },
  { title: 'Literature', image: '/images/literature-main.jpg', link: '/culture/literature', description: 'Rich literary heritage and folk tales', funFact: 'Vidyapati, a 14th-century Maithili poet, is often referred to as the "Shakespeare of Mithila".' },
  { title: 'History', image: '/images/history-main.jpg', link: '/culture/history', description: 'Ancient roots and historical significance', funFact: 'Mithila is believed to be the birthplace of Sita, the central character in the Hindu epic Ramayana.' },
];

export default function Home() {
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [isImageChanging, setIsImageChanging] = useState(false);
  const [showFunFact, setShowFunFact] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsImageChanging(true);
      setTimeout(() => {
        setCurrentElementIndex((prevIndex) => (prevIndex + 1) % culturalElements.length);
        setIsImageChanging(false);
      }, 500);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-red-600 mb-4"
            variants={fadeInUp}
          >
            Mithila Sansar (मिथिला सँसार)
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-700"
            variants={fadeInUp}
          >
            Unveiling the Tapestry of Mithila Culture
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence>
              <motion.div
                key={currentElementIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={culturalElements[currentElementIndex].image}
                  alt={culturalElements[currentElementIndex].title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-500"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
              <h2 className="text-4xl font-bold text-white mb-2">{culturalElements[currentElementIndex].title}</h2>
              <p className="text-xl text-white/90">{culturalElements[currentElementIndex].description}</p>
            </div>
          </motion.div>

          <div className="flex flex-col justify-between">
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 mb-6"
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-semibold text-red-600 mb-4">Explore Mithila Culture</h3>
              <p className="text-gray-700 mb-6">Immerse yourself in the rich tapestry of Mithila's heritage, where every brushstroke tells a story and every tradition holds centuries of wisdom.</p>
              <Link href="/culture" className="inline-block">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                  Discover More
                </button>
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {culturalElements.map((element, index) => (
                <motion.div key={element.title} variants={fadeInUp}>
                  <Link href={element.link} className="block">
                    <div className={`p-4 rounded-xl transition-all duration-300 ${index === currentElementIndex ? 'bg-red-100 shadow-md' : 'bg-white hover:bg-red-50'}`}>
                      <h4 className="text-lg font-semibold text-red-600 mb-1">{element.title}</h4>
                      <p className="text-sm text-gray-600">{element.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-3xl font-semibold text-red-600 mb-6">Discover Mithila's Cultural Wonders</h3>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-semibold text-gray-800">{culturalElements[currentElementIndex].title}</h4>
              <button
                className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-colors duration-300"
                onClick={() => setShowFunFact(!showFunFact)}
              >
                <Info size={24} />
              </button>
            </div>
            <AnimatePresence>
              {showFunFact && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
                >
                  <p className="text-gray-700">{culturalElements[currentElementIndex].funFact}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-gray-600 mb-4">{culturalElements[currentElementIndex].description}</p>
            <Link href={culturalElements[currentElementIndex].link} className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold">
              Learn more about {culturalElements[currentElementIndex].title}
              <ChevronRight className="ml-2" size={20} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="text-center bg-red-600 text-white py-12 px-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-4">Engage with Mithila Culture</h3>
          <p className="text-xl mb-6">Discover the depths of Mithila's heritage through our interactive AI guide</p>
          <Link href="/chatbot" className="inline-block">
            <button className="bg-white text-red-600 hover:bg-red-50 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
              Chat with AI Guide
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
