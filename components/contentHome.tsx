import { CaroselDivisi } from "./caroselDivisi";
import { CaroselEvent } from "./caroselEvent";
import { PhotoProfile } from "./icons";

export const ContentHome = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Photo Asisten */}
        <div className="flex items-center justify-center mt-5 sm:mt-10 lg:mt-5">
            <PhotoProfile/>
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
                    <div className="bg-Purple text-white rounded-full px-4 py-1 col-span-2 sm:col-span-3 lg:col-span-1 order-1 text-center">CORE</div>
                    <div className="bg-softGreen text-white rounded-full px-4 py-1 order-2 text-center">ATC</div>
                    <div className="bg-softBlue text-white rounded-full px-4 py-1 order-3 text-center">CMD</div>
                    <div className="bg-softDarkBlue text-white rounded-full px-4 py-1 order-4 text-center">DDC</div>
                    <div className="bg-softMix text-white rounded-full px-4 py-1 order-5 text-center">HRD</div>
                    <div className="bg-softBrown text-white rounded-full px-4 py-1 order-6 text-center">MLC</div>
                    <div className="bg-softRed text-white rounded-full px-4 py-1 order-7 text-center">RDC</div>
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
                <h2>🛠️</h2>
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
