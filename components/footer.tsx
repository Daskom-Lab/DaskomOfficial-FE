'use client';
import { Line, Linkedin, Instagram, Youtube, LogoPutih } from "@/components/icons";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-darkGreen to-lightGreen text-white py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-8 md:space-y-0">
        {/* Section 1: Social Media */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-lg font-bold">FOLLOW US ON</h3>
          <div className="flex space-x-2">
            <a
              href="https://youtube.com/@daskomtelu?si=0FgfOumggcmF_snA"
              className="text-2xl hover:text-gray-200 transition"
            >
              <Youtube />
            </a>
            <a
              href="https://www.instagram.com/telu.daskom/profilecard/?igsh=MW9nYmE4dWhpdHVuOQ=="
              className="text-2xl hover:text-gray-200 transition"
            >
              <Instagram />
            </a>
            <a
              href="https://linevoom.line.me/user/_dbhqzOurXL1CbjNxhYBPzSbYBVWZFDnFa5_ashs"
              className="text-2xl hover:text-gray-200 transition"
            >
              <Line />
            </a>
            <a
              href="https://www.linkedin.com/company/basic-computing-laboratorytelkom-university/"
              className="text-2xl hover:text-gray-200 transition"
            >
              <Linkedin />
            </a>
          </div>
        </div>

        {/* Section 2: Address and Logo */}
        <div className="flex flex-col md:flex-row gap-5 items-center  text-center md:text-right">
          <div>
            <p>Telkom University Landmark Tower</p>
            <p>10.01, 10.02 and 10.04</p>
            <p>Bandung, Indonesia</p>
          </div>
          <div>
            <LogoPutih />
          </div>
        </div>
      </div>
    </footer>
  );
};
