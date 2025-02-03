import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header({ year, setYear }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Tentukan apakah breadcrumb harus ditampilkan
  const showBreadcrumb = location.pathname === '/katalog-produk';

  // Tentukan apakah dropdown tahun harus ditampilkan
  const showYearDropdown = location.pathname !== '/katalog-produk';

  // Fungsi untuk menangani klik pada breadcrumb Dashboard
  const handleDashboardClick = () => {
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center mb-6">
      {/* Tampilkan breadcrumb jika di halaman Katalog Produk, jika tidak tampilkan greetings */}
      {showBreadcrumb ? (
        <div className="text-lg text-gray-600">
          <Link
            to="/"
            onClick={handleDashboardClick}
            className="text-gray-400 hover:text-gray-600"
          >
            Dashboard
          </Link>{' '}
          &gt; <span className="font-semibold">Katalog Produk</span>
        </div>
      ) : (
        <h1 className="text-2xl font-bold">Good morning Lorem ipsum</h1>
      )}

      {/* Dropdown Tahun (hanya ditampilkan jika bukan di halaman Katalog Produk) */}
      {showYearDropdown && (
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-4 py-2 rounded-lg focus:outline-none focus:ring-0 hover:ring-0"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      )}
    </header>
  );
}
