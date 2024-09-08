import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CultureCard({ id, title, content, image }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-80 w-full">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 ease-in-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-bold text-2xl mb-2">{title}</h3>
        <p className="text-sm mb-4 opacity-90">{content.substring(0, 100)}...</p>
        <Link href={`/culture/${id}`}>
          <motion.a
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-red-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore
          </motion.a>
        </Link>
      </div>
    </motion.div>
  );
}
