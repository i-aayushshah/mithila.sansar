import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50 py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-red-700 mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Mithila Sansar<br />
          <span className="text-3xl md:text-4xl text-red-600">(मिथिला सँसार)</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="relative rounded-lg overflow-hidden shadow-2xl"
            variants={fadeInUp}
          >
            <Image
              src="/images/mithila-sansar.jpg"
              alt="About Mithila Sansar"
              width={600}
              height={400}
              layout="responsive"
              className="transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-700/50 to-transparent"></div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-xl mb-6 text-gray-800 leading-relaxed">
              Mithila Sansar (मिथिला सँसार) is a passionate project dedicated to preserving and promoting the rich cultural heritage of the Mithila region. Our mission is to bring the beauty and depth of Mithila culture to a global audience, fostering understanding and appreciation across diverse communities.
            </p>
            <p className="text-xl mb-6 text-gray-800 leading-relaxed">
              Through this platform, we showcase the vibrant art, profound literature, delectable cuisine, and time-honored traditions that make Mithila unique. We believe that by sharing our culture, we can build bridges between people and celebrate our shared humanity.
            </p>
            
          </motion.div>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Our Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Preserve", description: "Safeguarding the rich cultural heritage of Mithila for future generations." },
              { title: "Educate", description: "Sharing knowledge about Mithila's art, traditions, and history with the world." },
              { title: "Inspire", description: "Encouraging cultural exchange and inspiring creativity rooted in tradition." }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-700">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-red-700 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>


      </div>
    </div>
  );
}
