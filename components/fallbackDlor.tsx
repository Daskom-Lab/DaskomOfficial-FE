"use client";

import { ProjectBackground } from "@/components/icons";

export const FallbackDlor = () => {
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

            {/* Fallback */}
            <div className="w-full text-center py-20 bg-gray-50 border border-gray-300 rounded-lg shadow-lg">
                <div className="mb-6 animate-bounce">
                    <div className="text-gray-400 text-6xl">
                        {/* Ikon dengan animasi bounce */}
                        <i className="fas fa-exclamation-circle"></i>
                    </div>
                </div>
                <h1 className="text-3xl font-semibold text-gray-800 mb-4 animate-fade-in">
                    No Projects Available
                </h1>
                <p className="text-lg text-gray-500 animate-fade-in">
                    It seems there are no DLOR projects to display at the moment. Please check back later!
                </p>
            </div>
        </section>
    );
};
