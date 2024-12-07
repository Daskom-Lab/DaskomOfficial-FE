import {Pagination} from "@nextui-org/react"

export const ContentProject = () => {
    return (
      <section className="relative max-w-5xl mx-auto p-4">
            {/* Welcome section */}
            <div className="flex flex-col justify-center items-center text-center py-14 text-white border-b-2 border-gray-500">
                <h1 className="text-7xl font-bold mb-4 text-darkGreen">Daskom Laboratory Open Recruitment (DLOR)</h1>
                <p className="text-2xl max-w-3xl mb-6 text-darkGreen">
                Each year, Daskom creates a unique recruitment website with a different theme to attract new talent.
                Here’s a timeline of our previous DLOR projects:
                </p>

                {/* Visit Recruitment Website Button below image */}
                    <div className="flex justify-center mt-8">
                    <a
                        href="https://recruitment.daskomlab.com/"  // Recruitment Website Link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white py-3 px-10 rounded-full text-md font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-105"
                    >
                        Visit Recruitment Website
                    </a>
                    </div>
            </div>

            {/* Timeline of previous projects */}
            <div className="space-y-12 mt-8">
                {/* Project 2024 */}
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 p-4">
                    <div className="w-full max-w-4xl shadow-xl rounded-lg overflow-hidden">
                        <img
                        src="/images/DLOR2024.jpeg"
                        alt="2024 Adventure Theme"
                        className="w-full h-auto object-cover transition duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>
                    </div>
                    <div className="lg:w-1/2 p-4 text-center lg:text-left">
                    <h2 className="text-3xl font-semibold text-darkGreen mb-4">2024 - Adventure Theme</h2>
                    <p className="text-lg text-softBlue">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ad explicabo quod doloribus nihil, autem dolorem temporibus consectetur fuga, dicta qui delectus quam suscipit et est voluptatibus ab amet reiciendis!
                    </p>
                    </div>
                </div>
        
                {/* Project 2023 */}
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 p-4 text-center lg:text-left">
                    <h2 className="text-3xl font-semibold text-darkGreen mb-4">2023 - Retro Arcade Theme</h2>
                    <p className="text-lg text-softBlue">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ad explicabo quod doloribus nihil, autem dolorem temporibus consectetur fuga, dicta qui delectus quam suscipit et est voluptatibus ab amet reiciendis!
                    </p>
                    </div>
                    <div className="lg:w-1/2 p-4">
                    <div className="w-full max-w-4xl shadow-xl rounded-lg overflow-hidden">
                        <img
                        src="/images/DLOR2024.jpeg"
                        alt="2023 Retro Arcade Theme"
                        className="w-full h-auto object-cover transition duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>
                    </div>
                </div>
        
                {/* Project 2022 */}
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 p-4">
                    <div className="w-full max-w-4xl shadow-xl rounded-lg overflow-hidden">
                        <img
                        src="/images/DLOR2024.jpeg"
                        alt="2022 Tech Innovations"
                        className="w-full h-auto object-cover transition duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>
                    </div>
                    <div className="lg:w-1/2 p-4 text-center lg:text-left">
                    <h2 className="text-3xl font-semibold text-darkGreen mb-4">2022 - Tech Innovations</h2>
                    <p className="text-lg text-softBlue">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ad explicabo quod doloribus nihil, autem dolorem temporibus consectetur fuga, dicta qui delectus quam suscipit et est voluptatibus ab amet reiciendis!
                    </p>
                    </div>
                </div>
        
                {/* Project 2021 */}
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 p-4 text-center lg:text-left">
                    <h2 className="text-3xl font-semibold text-darkGreen mb-4">2021 - Future Technologies</h2>
                    <p className="text-lg text-softBlue">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ad explicabo quod doloribus nihil, autem dolorem temporibus consectetur fuga, dicta qui delectus quam suscipit et est voluptatibus ab amet reiciendis!
                    </p>
                    </div>
                    <div className="lg:w-1/2 p-4">
                    <div className="w-full max-w-4xl shadow-xl rounded-lg overflow-hidden">
                        <img
                        src="/images/DLOR2024.jpeg"
                        alt="2021 Future Technologies"
                        className="w-full h-auto object-cover transition duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>
                    </div>
                </div>
        
                {/* Project 2020 */}
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 p-4">
                    <div className="w-full max-w-4xl shadow-xl rounded-lg overflow-hidden">
                        <img
                        src="/images/DLOR2024.jpeg"
                        alt="2020 Digital Revolution"
                        className="w-full h-auto object-cover transition duration-300 ease-in-out transform hover:scale-105"
                        />
                    </div>
                    </div>
                    <div className="lg:w-1/2 p-4 text-center lg:text-left">
                    <h2 className="text-3xl font-semibold text-darkGreen mb-4">2020 - Digital Revolution</h2>
                    <p className="text-lg text-softBlue">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ad explicabo quod doloribus nihil, autem dolorem temporibus consectetur fuga, dicta qui delectus quam suscipit et est voluptatibus ab amet reiciendis!
                    </p>
                    </div>
                </div>
    
            </div>

            {/* pagination */}
            {/* <div className="flex items-center justify-center mt-12 mb-6">
                <Pagination total={5} initialPage={1} />
            </div> */}
      </section>
    );
  };
  