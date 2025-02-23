'use client';  
import { DlorLogo } from "@/components/icons";  

export const ContentRecruitment = () => {
  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Requirements Section */}
      <div className="space-y-8 mb-12 mt-10 sm:mt-5 md:mt-5 lg:mt-5">
        <h3 className="text-3xl sm:text-3xl font-semibold text-center sm:text-left text-darkGreen">Requirements</h3>

        {/* General Requirements */}
        <div className="bg-gradient-to-r from-gray-100 to-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h4 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-darkGreen">Persyaratan Umum</h4>
          <ul className="list-disc pl-4 sm:pl-6 space-y-3 text-gray-600 text-left">
            <li>Bertaqwa kepada Tuhan YME.</li>
            <li>Mahasiswa program studi S1 Teknik Telekomunikasi, S1 Teknik Biomedis, dan S1 Teknik Sistem Energi Angkatan 2024.</li>
            <li>Indeks Prestasi (IP) Semester 1 ≥ 3.00 di bawah itu akan dipertimbangkan.</li>
          </ul>
        </div>

        {/* Specific Requirements */}
        <div className="bg-gradient-to-r from-gray-100 to-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h4 className="text-xl sm:text-2xl font-semibold text-center mb-4 text-darkGreen">Persyaratan Khusus</h4>
          <ul className="list-disc pl-4 sm:pl-6 space-y-3 text-gray-600 text-left">
            <li>CV ATS (Dapat menggunakan template yang sudah disediakan, namun diperbolehkan apabila menggunakan template CV yang disediakan asal tetap menggunakan format ATS)</li>
            <li>Biodata (Sesuai dengan format).</li>
            <li>Transkrip Nilai (KHS) Semester 1.</li>
            <li>Foto Formal Full Body Ukuran 4R Berwarna (Format JPG/JPEG, mengenakan pakaian yang sopan, dengan latar belakang bebas polos).</li>
            <li>Visi, Misi, Motivasi Mengikuti Rekrutmen, dan Ide Inovasi untuk Laboratorium Dasar Komputer.</li>
            <li>Surat Lamaran yang Ditujukan kepada Koordinator Asisten dan Pembina Laboratorium.</li>
            <li>Mengisi Formulir Pendaftaran Calon Asisten Laboratorium Dasar Komputer 2025/2026.</li>
          </ul>
        </div>
      </div>

      {/* Apply Button Section */}
      <div className="flex justify-center mt-14 mb-8 gap-8">
        {/* Apply Now Button */}
        <a
          href="https://forms.gle/EXaBkcZdwEi2bTVy9"  // GForm Link
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
