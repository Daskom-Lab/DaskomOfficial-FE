import { AboutProfile, DaskomLogo, PhotoGallery1, PhotoGallery2, PhotoGallery3, PhotoGallery4, PhotoGallery5, PhotoGallery6 } from "@/components/icons";

export const ContentAbout = () => {
    return (
        <section className="w-full">

            {/* About Us - Cover Image */}
            <div className="relative w-full h-screen">
                <AboutProfile />
                <div className="absolute max-w-5xl"></div>
                    <div className="absolute inset-0 flex flex-col-reverse lg:flex-row items-center lg:items-center justify-between px-6 lg:px-12 gap-6 lg:gap-12">
                        
                        {/* Title - Description */}
                        <div className="lg:w-1/2 sm:mt-16 lg:mt-16 sm:ml-6 lg:ml-6 text-left flex flex-col justify-centersm:px-6 lg:px-0">
                            <h1 className="text-4xl mt-[-450px] sm:mt-0 md:mt-[-700px] xl:mt-0 sm:text-5xl md:text-6xl lg:text-6xl font-bold text-forestGreen mb-4 sm:text-left md:text-center lg:text-left text-center">
                            Daskom<br></br>Laboratory
                            </h1>
                            <p className="text-base mt-0 md:mt-20 lg:mt-0 sm:text-lg md:text-2xl lg:text-lg font-semibold text-black text-justify">
                            Telkom University’s Computer Basics Lab (Laboratorium Daskom) is
                            a leading C programming lab within the Faculty of Electrical
                            Engineering's Computer Engineering Department. We empower students
                            with essential coding skills, specialize in C algorithms.
                            Additionally, we conduct research in website and mobile app
                            development, fostering innovation and technological advancement.
                            </p>
                        </div>

                        {/* Daskom-Lab Logo */}
                        <div className="lg:w-1/3 lg:mt-16 mt-[150px] sm:mt-24 md:mt-[300px] lg:mt-24 mr-2 flex justify-center items-center">
                            <DaskomLogo />
                        </div>
                    </div>
                </div>

            {/* Galleries Section */}
            <div className="max-w-5xl mx-auto mt-20 sm:mt-[200px] lg:mt-[200px] px-4">
                <h2 className="font-semibold text-3xl sm:text-4xl mb-8 text-darkGreen text-center">
                    OUR GALLERIES 📸
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PhotoGallery1 />
                    <PhotoGallery2 />
                    <PhotoGallery3 />
                    <PhotoGallery4 />
                    <PhotoGallery5 />
                    <PhotoGallery6 />
                </div>
            </div>

            {/* Location Section */}
            <div className="max-w-5xl mx-auto mt-24 mb-16 px-4 text-center">
                <h2 className="font-semibold text-3xl sm:text-4xl mb-8 text-darkGreen">
                LOCATION 🏛️
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-darkGreen leading-relaxed mb-8 text-justify font-semibold">
                Our practical labs are located in rooms 10.02 & 10.04, and our research
                activities are conducted in room 10.01 (Telkom University Landmark Tower).
                </p>
                <div className="relative w-full h-64">
                    <iframe
                        className="w-full h-full rounded-lg shadow-lg"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.527535708291!2d107.6270074!3d-6.9750387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9c28f51a3e3%3A0x2619e8eb2d6b33cf!2sTelkom%20University!5e0!3m2!1sen!2sid!4v1691406391164!5m2!1sen!2sid"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            
        </section>
    );
};
