import { useState, useEffect } from 'react';
import Image from 'next/image';
import cuisineData from '@/data/cuisine.json';
import DishDialog from '@/components/DishDialog';

export default function Cuisine() {
  const [selectedDish, setSelectedDish] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleReadMore = (dish) => {
    setSelectedDish(dish);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1
          className={`text-5xl md:text-6xl font-bold text-red-700 mb-12 text-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          {cuisineData.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <Image
              src={cuisineData.mainImage}
              alt="Mithila Cuisine"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {cuisineData.content.map((paragraph, index) => (
              <p key={index} className="text-lg mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <h2
          className={`text-4xl font-bold mt-16 mb-10 text-center text-red-600 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Popular Dishes
        </h2>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {cuisineData.dishes.map((dish, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <Image
                src={dish.image}
                alt={dish.name}
                width={400}
                height={300}
                className="rounded-lg mb-6 object-cover"
              />
              <h3 className="text-2xl font-semibold mb-4 text-red-600">{dish.name}</h3>
              <p className="text-gray-700 mb-6">{dish.description}</p>
              <button
                onClick={() => handleReadMore(dish)}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-full font-semibold text-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
              >
                Discover More
              </button>
            </div>
          ))}
        </div>
      </div>
      <DishDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        dish={selectedDish}
      />
    </div>
  );
}
