import React from 'react';
import { FaRunning, FaSeedling } from 'react-icons/fa'; // Import ikon outline
import { Tooltip } from 'react-tooltip'; // Import Tooltip dari react-tooltip
import 'react-tooltip/dist/react-tooltip.css'; // Import CSS untuk styling tooltip

// Komponen SVG untuk pesawat
const AirplaneIcon = () => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 transform -rotate-45"
  >
    <path
      d="m 6.496094 1 c -0.792969 0 -0.78125 0.035156 -0.53125 1.03125 l 1.625 4.96875 h -4.5 l -1.21875 -1.78125 c -0.140625 -0.207031 -0.121094 -0.21875 -0.34375 -0.21875 h -0.21875 c -0.425782 0 -0.28125 0.4375 -0.28125 0.4375 l 0.28125 2.5625 l -0.28125 2.5625 s -0.140625 0.4375 0.25 0.4375 h 0.25 c 0.210937 0 0.203125 -0.007812 0.34375 -0.21875 l 1.21875 -1.78125 h 4.5 l -1.625 4.9375 c -0.261719 1.046875 -0.265625 1.0625 0.53125 1.0625 c 0.433594 0 0.433594 -0.011719 0.71875 -0.5 l 3.6875 -5.5 h 3.09375 c 0.554687 0 1 -0.445312 1 -1 s -0.445313 -1 -1 -1 h -3.09375 l -3.6875 -5.5 c -0.265625 -0.457031 -0.28125 -0.5 -0.65625 -0.5 z m 0 0"
      fill="currentColor"
    />
  </svg>
);

export default function MetricCard({ title, value, isActive, onClick }) {
  // Gradien untuk setiap produk
  const gradients = {
    Tour: {
      start: '#517897', // Biru tua (bawah)
      end: '#006FFF', // Biru muda (atas)
    },
    Activity: {
      start: '#FF6A13', // Oranye (bawah)
      end: '#FFF82E', // Kuning (atas)
    },
    Attraction: {
      start: '#4CAF50', // Hijau tua (bawah)
      end: '#00CA08', // Hijau muda (atas)
    },
  };

  // Pilih ikon berdasarkan kategori
  const getIcon = (title) => {
    switch (title) {
      case 'Tour':
        return <AirplaneIcon />; // Gunakan komponen SVG pesawat
      case 'Activity':
        return <FaRunning />; // Orang berlari
      case 'Attraction':
        return <FaSeedling />; // Tanaman dengan 1 tangkai dan 2 daun
      default:
        return null;
    }
  };

  // Informasi penjualan untuk tooltip
  const salesInfo = {
    Tour: 'Total penjualan Tour',
    Activity: 'Total penjualan Activity',
    Attraction: 'Total penjualan Attraction',
  };

  return (
    <>
      <div
        className={`p-6 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
          isActive
            ? `text-white shadow-md` // Gradien saat aktif
            : 'bg-white border hover:border-gray-400' // Background putih dan border saat tidak aktif
        }`}
        style={{
          background: isActive
            ? `linear-gradient(to bottom, ${gradients[title].start}, ${gradients[title].end})`
            : 'white',
        }}
        onClick={onClick}
        data-tooltip-id={`${title}-tooltip`} // ID tooltip
        data-tooltip-content={salesInfo[title]} // Konten tooltip
      >
        <div>
          <h3 className={`mb-2 ${isActive ? 'text-white' : 'text-gray-600'}`}>
            {title}
          </h3>
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <div
          className={`text-2xl ${isActive ? 'text-white' : 'text-gray-600'}`}
        >
          {getIcon(title)}
        </div>
      </div>

      {/* Tooltip */}
      <Tooltip id={`${title}-tooltip`} />
    </>
  );
}
