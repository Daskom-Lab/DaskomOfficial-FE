import { CaroselDivisi } from "./caroselDivisi";
import { CaroselEvent } from "./caroselEvent";
import { PhotoProfile } from "./icons";

export const ContentHome = () => {
  return (
    <section className="max-w-5xl mx-auto p-4">
     {/* Photo Asisten */}
        <div className="flex items-center justify-center">
            <PhotoProfile />
        </div>
     {/* meet out Asisten */}
        <div className="mt-20 mb-10 max-w-5xl mx-auto flex justify-center items-center text-center flex-col">
            {/* judul */}
            <div className="flex font-semibold text-4xl text-center gap-3 mb-4">
                <h2 className="bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
                MEET OUR ASSISTANT
                </h2>
                <h2>👨‍💻 👩‍💻</h2>
            </div>

            {/* sub judul */}
            <h5 className="font-semibold text-xl bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
                Let’s meet the assistants that dedicated themselves for Daskom Laboratory
            </h5>

            {/* sub card divisi */}
            <div>
                <div className="grid grid-cols-3 md:grid-cols-7 gap-3 mt-5">
                    <div className="bg-Purple  text-white rounded-full px-4 py-1">CORE</div>
                    <div className="bg-softGreen  text-white rounded-full px-4 py-1">ATC</div>
                    <div className="bg-softBlue  text-white rounded-full px-4 py-1">CMD</div>
                    <div className="bg-softDarkBlue  text-white rounded-full px-4 py-1">DDC</div>
                    <div className="bg-softMix  text-white rounded-full px-4 py-1">HRD</div>
                    <div className="bg-softBrown  text-white rounded-full px-4 py-1">MLC</div>
                    <div className="bg-softRed  text-white rounded-full px-4 py-1">RDC</div>
                    
                </div>
                <CaroselDivisi />
            </div>
        </div>

     {/* Our activities */}
        <div className="mt-16 mb-10 max-w-5xl mx-auto flex justify-center items-center text-center flex-col">
            {/* judul */}
            <div className="flex font-semibold text-4xl text-center gap-3 mb-4">
                <h2 className="bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
                    OUR ACTIVITIES 
                </h2>
                <h2>🛠️</h2>
            </div>

            {/* sub judul */}
            <h5 className="font-semibold text-xl bg-gradient-to-r from-darkGreen to-lightGreen bg-clip-text text-transparent">
                In Daskom Laboratory, we’re not only teaching freshmen students from Electrical Engineering Department. We also have other activities, including
            </h5>

            {/* carosel event */}
            <CaroselEvent />

        </div>

    </section>
  );
};
