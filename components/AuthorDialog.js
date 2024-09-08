import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Loader, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchChatbotResponse } from '@/lib/chatbotApi';

export default function AuthorDialog({ isOpen, onClose, author }) {
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen && author) {
      setLoading(true);
      fetchChatbotResponse(`Tell me more about ${author.name}, a notable author from Mithila.`)
        .then(response => {
          setDetails(response);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching author details:', error);
          setDetails('Sorry, we couldn\'t fetch more details at this time.');
          setLoading(false);
        });
    }
  }, [isOpen, author]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !author) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
        >
          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl h-[90vh] flex flex-col"
          >
            <div className="relative h-64 flex-shrink-0">
              <Image
                src={author.image || '/images/default-author.jpg'}
                alt={author.name}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 transition duration-300 transform hover:scale-110"
              >
                <X size={24} />
              </button>
              <h2 className="absolute bottom-4 left-6 text-4xl font-bold text-white shadow-text">
                {author.name}
              </h2>
            </div>
            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
              <div className="flex items-center text-gray-600 mb-6">
                <Book className="mr-2" size={20} />
                <span>Famous work: {author.famousWork}</span>
              </div>
              <p className="text-gray-700 mb-6">{author.bio}</p>
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-4 text-red-600">More Details</h3>
                {loading ? (
                  <div className="flex items-center justify-center h-24">
                    <Loader className="animate-spin text-red-600" size={32} />
                  </div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-700 leading-relaxed"
                  >
                    {details}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
          border: 2px solid #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </AnimatePresence>
  );
}
