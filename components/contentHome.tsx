'use client';

import { useState, useEffect } from 'react';
import { CaroselDivisi } from "./caroselDivisi";
import { CaroselEvent } from "./caroselEvent";
import { getDivisions, getAboutContent, getImageUrl, type Division } from '@/lib/api';

const fallbackDivisions = [
  { id: '1', name: 'CORE', color: '#B0689A', display_order: 1 },
  { id: '2', name: 'ATC', color: '#4D7E5F', display_order: 2 },
  { id: '3', name: 'CMD', color: '#618B98', display_order: 3 },
  { id: '4', name: 'DDC', color: '#4F61D9', display_order: 4 },
  { id: '5', name: 'HRD', color: '#6965AC', display_order: 5 },
  { id: '6', name: 'MLC', color: '#A49A67', display_order: 6 },
  { id: '7', name: 'RDC', color: '#AC6565', display_order: 7 },
];

export const ContentHome = () => {
  const [divisions, setDivisions] = useState(fallbackDivisions);
  const [homeImage, setHomeImage] = useState('/images/background/Photo Profile.jpeg');

  useEffect(() => {
    getDivisions()
      .then((data) => {
        if (data && data.length > 0) {
          setDivisions(data.map((d: Division) => ({
            id: d.id,
            name: d.name,
            color: d.color,
            display_order: d.display_order,
          })));
        }
      })
      .catch(() => { /* keep fallback */ });

    getAboutContent()
      .then((about) => {
        if (about.home_image_key) {
          setHomeImage(getImageUrl(about.home_image_key));
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Photo Asisten */}
        <div className="flex items-center justify-center mt-5 sm:mt-10 lg:mt-5">
            <img src={homeImage} alt="Daskom Photo Profile" width={1300} height={300} />
        </div>

        {/* meet out Asisten */}
        <div className="mt-14 sm:mt-16 lg:mt-16 mb-10 max-w-5xl mx-auto text-center">
            {/* judul */}
            <div className="flex flex-wrap mt-16 sm:mt-0 lg:mt-0 font-semibold text-2xl sm:text-3xl lg:text-4xl gap-3 mb-4 justify-center">
                <h2 className="bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
                MEET OUR ASSISTANT
                </h2>
                {/* <h2>👨‍💻 👩‍💻</h2> */}
            </div>

            {/* sub judul */}
            <h5 className="mb-8 sm:mb-0 lg:mb-0 font-semibold text-lg sm:text-xl bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent max-w-4xl mx-auto">
                Let’s meet the assistants that dedicated themselves for Daskom Laboratory
            </h5>

            {/* sub card divisi */}
            <div className="mt-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 items-center">
                    {divisions.map((d, i) => (
                      <div
                        key={d.id}
                        className={`text-white rounded-full px-4 py-1 text-center ${
                          i === 0 ? 'col-span-2 sm:col-span-3 lg:col-span-1' : ''
                        }`}
                        style={{ backgroundColor: d.color, order: i + 1 }}
                      >
                        {d.name}
                      </div>
                    ))}
                </div>
            </div>

            {/* Carousel Divisi */}
            <div className="mt-5">
                <CaroselDivisi />
            </div>
        </div>

        {/* Our activities */}
        <div className="lg:block mt-16 mb-10 max-w-5xl mx-auto text-center">
            {/* judul */}
            <div className="flex flex-wrap font-semibold text-2xl sm:text-3xl lg:text-4xl gap-3 mb-4 justify-center">
                <h2 className="bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
                    OUR ACTIVITIES 
                </h2>
            </div>

            {/* sub judul */}
            <h5 className="font-semibold text-md sm:text-xl bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent max-w-4xl text-justify sm:text-center">
                In Daskom Laboratory, we’re not only teaching freshmen students from Electrical Engineering Department. We also have other activities, including
            </h5>

            {/* carosel event */}
            <CaroselEvent />
        </div>

    </section>
  );
};