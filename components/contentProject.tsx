"use client";

import { Pagination } from "@nextui-org/react";
import { useState } from "react";
import { ProjectBackground } from "@/components/icons";
import { projects } from "@/components/themeDlor";
import { FallbackDlor } from "./fallbackDlor";

export const ContentProject = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

  // Fallback dari request (done)
  if (!Array.isArray(projects) || projects.length === 0) {
    return <FallbackDlor />;
  }

  return (
    <section className="w-full">
      {/* Background Section */}
      <div className="relative w-full h-screen">
        <ProjectBackground />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 lg:px-12">
          {/* Welcome Section */}
          <div className="flex flex-col justify-center items-center text-center text-white max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-6xl font-bold mt-[-20px] sm:mt-24 md:mt-[-100px] lg:mt-24 mb-2">
              Daskom Laboratory Open Recruitment (DLOR)
            </h1>
            <p className="text-base sm:text-lg md:text-2xl lg:text-xl max-w-3xl mt-8 sm:mt-4 md:mt-16 lg:mt-4 mb-8">
              Each year, Daskom creates a unique recruitment website with a
              different theme to attract new talent. Here’s a timeline of our
              previous DLOR projects:
            </p>
            {/* Visit Recruitment Website Button */}
            <div className="flex justify-center mt-20 sm:mt-8 md:mt-[200px] lg:mt-8">
              <a
                href="https://recruitment.daskomlab.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white py-5 px-6 sm:py-3 sm:px-10 md:py-8 md:px-12 lg:py-3 lg:px-10 rounded-full text-sm sm:text-md md:text-2xl lg:text-xl font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105"
              >
                Visit Recruitment Website
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline of previous projects */}
      <div className="max-w-5xl mx-auto mt-14 xl:mt-12 md:mt-20 lg:mt-[170px] px-4">
        <div className="mt-8 w-full h-[2px] mb-4 sm:mb-4 lg:mb-4 bg-gray-500"></div>
        <div className="space-y-12">
          {currentProjects.map((project, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center justify-between`}
            >
              <div className="lg:w-1/2 p-4">
                <div className="w-full max-w-4xl shadow-xl rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-auto object-cover transition duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 p-4 text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-darkGreen mb-4">
                  {project.year} - {project.title}
                </h2>
                <p className="text-sm sm:text-md lg:text-lg text-gray-800 text-center lg:text-justify">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-12 mb-6">
        <Pagination
          total={Math.ceil(projects.length / itemsPerPage)}
          initialPage={1}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};
