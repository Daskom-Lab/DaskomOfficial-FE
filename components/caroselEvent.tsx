'use client';  

import { useState } from 'react';

export const CaroselEvent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    { src: 'https://via.placeholder.com/800x400?text=Image+1', description: 'Deskripsi untuk Divisi 1' },
    { src: 'https://via.placeholder.com/800x400?text=Image+2', description: 'Deskripsi untuk Divisi 2' },
    { src: 'https://via.placeholder.com/800x400?text=Image+3', description: 'Deskripsi untuk Divisi 3' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <section className="max-w-5xl mx-auto mt-6 p-4">
      <div className="relative group">
        <img
          src={images[currentSlide].src}
          alt={`Divisi ${currentSlide + 1}`}
          className="w-full h-auto rounded-lg"
        />
        {/* Deskripsi teks */}
        <div
          className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {images[currentSlide].description}
        </div>
        {/* Tombol navigasi */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>
      {/* Pagination dots */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`mx-1 w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};
