'use client';  
import { DlorLogo } from "@/components/icons";  

export const ContentRecruitment = () => {
  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Requirements Section */}
      <div className="space-y-8 mb-12">
        <h3 className="text-3xl sm:text-3xl font-semibold text-center sm:text-left text-darkGreen">Requirements</h3>

        {/* General Requirements */}
        <div className="bg-gradient-to-r from-gray-100 to-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h4 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-darkGreen">General Requirements</h4>
          <ul className="list-disc pl-4 sm:pl-6 space-y-3 text-gray-600 text-left">
            <li>Faithful to God Almighty.</li>
            <li>Must be an undergraduate student in one of the following programs:
              S1 Telecommunication Engineering, S1 Biomedical Engineering, S1 Energy Systems Engineering, S1 Electrical Engineering, or S1 Physics Engineering.
            </li>
            <li>Minimum GPA of 3.00 in the 1st semester.</li>
            <li>Minimum grade of B in Algorithms and Programming courses (BC considered).</li>
            <li>Minimum grade of AB in Algorithms and Programming Labs.</li>
          </ul>
        </div>

        {/* Specific Requirements */}
        <div className="bg-gradient-to-r from-gray-100 to-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h4 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-darkGreen">Specific Requirements</h4>
          <ul className="list-disc pl-4 sm:pl-6 space-y-3 text-gray-600 text-left">
            <li>Creative CV and Formal CV.</li>
            <li>1st Semester Transcript.</li>
            <li>Full body photo (4R, color, in JPEG/JPG format, wearing proper attire, with a plain background).</li>
            <li>Vision, mission, and motivation for joining the recruitment.</li>
            <li>Innovative ideas for the Computer Science Laboratory.</li>
            <li>Cover letter addressed to the Assistant Coordinator and Laboratory Supervisor.</li>
            <li>Fill out the registration form for prospective assistants to the Computer Science Laboratory below.</li>
          </ul>
        </div>
      </div>

      {/* Apply Button Section */}
      <div className="flex justify-center mt-14 mb-8 gap-8">
        {/* Apply Now Button */}
        <a
          href="https://forms.gle/your-google-form-link"  // GForm Link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-darkGreen to-lightGreen text-white py-3 px-10 rounded-full text-md font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105"
        >
          Apply Now
        </a>
      </div>
    </section>
  );
};
