'use client';

import { useState } from 'react';

export const CaroselDivisi = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { src: '/images/CORE.JPG', name: 'CORE', subtitle: 'Core Division', color: '#B0689A' },
    { src: '/images/ATC.jpeg', name: 'ATC', subtitle: 'Assignment and Task Committee', color: '#4D7E5F' },
    { src: '/images/CMD.jpeg', name: 'CMD', subtitle: 'Creative Media Development', color: '#618B98' },
    { src: '/images/DDC.jpeg', name: 'DDC', subtitle: 'Daskom Dev Community', color: '#A49A67' },
    { src: '/images/HRD.jpeg', name: 'HRD', subtitle: 'Human Resource Development', color: '#6965AC' },
    { src: '/images/MLC.jpeg', name: 'MLC', subtitle: 'Maintenance and Logistic Committee', color: '#A49A67' },
    { src: '/images/RDC.jpeg', name: 'RDC', subtitle: 'Rules and Discipline Committe', color: '#AC6565' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <section className="max-w-5xl mx-auto mt-10 p-4">
      <div className="relative shadow-lg rounded-lg overflow-hidden">
        <div className="relative group">
          {/* Image */}
          <img
            src={images[currentSlide].src}
            alt={`Divisi ${images[currentSlide].name}`}
            className="w-full h-[300px] sm:h-[400px] md:h-[530px] object-cover rounded-2xl transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: `${images[currentSlide].color}80` }}
          >
            {/* Animated text */}
            <div className="text-center">
              <h2
                className="text-white text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-widest translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out"
              >
                {images[currentSlide].name}
              </h2>
              <p
                className="text-white text-sm sm:text-base md:text-xl font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
              >
                {images[currentSlide].subtitle}
              </p>
            </div>
          </div>
          {/* Border animation */}
          <div
            className="absolute inset-0 rounded-lg border-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
            style={{ borderColor: images[currentSlide].color }}
          ></div>
        </div>
        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white text-gray-800 shadow-lg p-3 rounded-full hover:bg-gray-800 hover:text-white transition duration-300"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white text-gray-800 shadow-lg p-3 rounded-full hover:bg-gray-800 hover:text-white transition duration-300"
        >
          &#10095;
        </button>
      </div>
      {/* Pagination dots */}
      <div className="flex justify-center mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`mx-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
              currentSlide === index
                ? `bg-[${images[index].color}] scale-125 shadow-md`
                : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};