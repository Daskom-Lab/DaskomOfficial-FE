'use client';

import { useState } from 'react';

export const CaroselEvent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    { src: '/images/event/wisuda.webp', eventName: 'Wisuda Asisten' },
    { src: '/images/event/syukuran.webp', eventName: 'Syukuran' },
    { src: '/images/event/building.webp', eventName: 'Building Team' },
    { src: '/images/event/fotoasisten.webp', eventName: 'Foto Bersama Asisten' },
    { src: '/images/event/makrab.webp', eventName: 'Malam Keakraban' },
    { src: '/images/event/baksos.webp', eventName: 'Bakti Sosial' },
    { src: '/images/event/firewallParty.webp', eventName: 'Firewall Party' },
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
        {/* Gambar */}
        <img
          src={images[currentSlide].src}
          alt={images[currentSlide].eventName}
          className="w-full h-auto rounded-xl transition-all duration-700 ease-in-out filter brightness-50 group-hover:brightness-100"
        />
        {/* Judul di tengah */}
        <div
          className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold opacity-100 group-hover:opacity-0 transition-opacity duration-700 ease-in-out"
        >
          {images[currentSlide].eventName}
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
