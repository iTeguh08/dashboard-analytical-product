import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Komponen SVG untuk ikon Dashboard
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    fill="currentColor"
  >
    <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
  </svg>
);

// Komponen SVG untuk ikon Katalog Produk
const CatalogIcon = () => (
  <svg
    fill="currentColor"
    width="20px"
    height="20px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M26,2H8A2,2,0,0,0,6,4V8H4v2H6v5H4v2H6v5H4v2H6v4a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V4A2,2,0,0,0,26,2Zm0,26H8V24h2V22H8V17h2V15H8V10h2V8H8V4H26Z" />
    <rect x="14" y="8" width="8" height="2" />
    <rect x="14" y="15" width="8" height="2" />
    <rect x="14" y="22" width="8" height="2" />
  </svg>
);

// Komponen SVG untuk ikon Order Management (SVG Baru)
const OrderManagementIcon = () => (
  <svg
    fill="currentColor"
    height="20px"
    width="20px"
    viewBox="0 0 470.767 470.767"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M362.965,21.384H289.62L286.638,7.99C285.614,3.323,281.467,0,276.685,0h-82.618c-4.782,0-8.913,3.323-9.953,7.99 l-2.967,13.394h-73.36c-26.835,0-48.654,21.827-48.654,48.662v352.06c0,26.835,21.819,48.662,48.654,48.662h255.179 c26.835,0,48.67-21.827,48.67-48.662V70.046C411.635,43.211,389.8,21.384,362.965,21.384z M379.831,422.105 c0,9.295-7.563,16.858-16.866,16.858H107.786c-9.287,0-16.85-7.563-16.85-16.858V70.046c0-9.295,7.563-16.857,16.85-16.857h66.294 l-1.692,7.609c-0.684,3.02,0.062,6.188,1.988,8.596c1.94,2.415,4.876,3.82,7.965,3.82h106.082c3.091,0,6.026-1.405,7.951-3.82 c1.942-2.415,2.687-5.575,2.004-8.596l-1.692-7.609h66.279c9.303,0,16.866,7.563,16.866,16.857V422.105z" />
    <path d="M170.835,188.426h43.249l-10.279-7.019c-14.506-9.899-18.232-29.693-8.325-44.197c9.893-14.489,29.693-18.239,44.197-8.324 l1.694,1.157v-12.136c0-7.866-6.383-14.248-14.242-14.248h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.271 C156.595,182.045,162.978,188.426,170.835,188.426z" />
    <path d="M303.256,110.313l-49.85,47.194l-22.704-15.49c-7.221-4.962-17.13-3.083-22.099,4.162 c-4.954,7.251-3.09,17.144,4.178,22.098l33.28,22.727c2.718,1.864,5.839,2.772,8.961,2.772c3.96,0,7.888-1.474,10.933-4.356 l59.167-56.014c6.382-6.033,6.645-16.104,0.62-22.479C319.686,104.552,309.637,104.28,303.256,110.313z" />
    <path d="M170.835,297.669H214.1l-10.295-7.027c-14.506-9.901-18.232-29.693-8.325-44.197c9.893-14.498,29.693-18.248,44.197-8.325 l1.694,1.158v-12.136c0-7.865-6.383-14.248-14.242-14.248h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.279 C156.595,291.286,162.978,297.669,170.835,297.669z" />
    <path d="M303.256,219.555l-49.85,47.186l-22.704-15.49c-7.221-4.97-17.13-3.098-22.099,4.162 c-4.954,7.253-3.09,17.144,4.178,22.099l33.28,22.727c2.718,1.864,5.839,2.772,8.961,2.772c3.96,0,7.888-1.476,10.933-4.356 l59.167-56.007c6.382-6.033,6.645-16.096,0.62-22.479C319.686,213.793,309.637,213.529,303.256,219.555z" />
    <path d="M227.129,322.135h-56.294c-7.857,0-14.24,6.383-14.24,14.248v56.271c0,7.865,6.383,14.248,14.24,14.248h56.294 c7.859,0,14.242-6.383,14.242-14.248v-56.271C241.371,328.518,234.988,322.135,227.129,322.135z" />
  </svg>
);

// Komponen SVG untuk ikon Logout
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    fill="currentColor"
    className="rotate-180"
  >
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
  </svg>
);

export default function Sidebar() {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  // Update active menu berdasarkan path saat ini
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveMenu('Dashboard');
    } else if (location.pathname === '/katalog-produk') {
      setActiveMenu('Katalog Produk');
    } else if (location.pathname === '/order-management') {
      setActiveMenu('Order Management');
    }
  }, [location.pathname]);

  return (
    <div className="w-64 bg-gray-50 p-6 flex flex-col h-screen overflow-hidden">
      {/* Logo */}
      <div className="flex justify-center items-center gap-2 mt-2 mb-11">
        <img
          src="src/assets/SMK-TI-BALI-GLOBAL993.png"
          alt="Logo"
          className="w-10 h-[50px]"
        />
      </div>

      {/* Profil Pengguna */}
      <div className="mb-11">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWv0KmvZhSF8J706GgWKwILeGnSqVl8_dGFxK-m-N42wHGSChQmZuRTjkHNwR2fpkFnYk&usqp=CAU"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-center font-semibold text-gray-800">Lorem ipsum</h2>
        <p className="text-center text-gray-500 text-sm">
          loremipsum@gmail.com
        </p>
      </div>

      {/* Menu Navigasi */}
      <nav className="space-y-3 flex-1">
        <Link
          to="/"
          className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded-lg transition-colors h-12 ${
            activeMenu === 'Dashboard'
              ? 'text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          style={{
            background:
              activeMenu === 'Dashboard'
                ? 'linear-gradient(to bottom, #000000, #474242)'
                : 'transparent',
          }}
          onClick={() => setActiveMenu('Dashboard')}
        >
          <DashboardIcon />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link
          to="/katalog-produk"
          className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded-lg transition-colors h-12 ${
            activeMenu === 'Katalog Produk'
              ? 'text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          style={{
            background:
              activeMenu === 'Katalog Produk'
                ? 'linear-gradient(to bottom, #000000, #474242)'
                : 'transparent',
          }}
          onClick={() => setActiveMenu('Katalog Produk')}
        >
          <CatalogIcon />
          <span className="text-sm">Katalog Produk</span>
        </Link>
        <Link
          to="/order-management"
          className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded-lg transition-colors h-12 ${
            activeMenu === 'Order Management'
              ? 'text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          style={{
            background:
              activeMenu === 'Order Management'
                ? 'linear-gradient(to bottom, #000000, #474242)'
                : 'transparent',
          }}
          onClick={() => setActiveMenu('Order Management')}
        >
          <OrderManagementIcon />
          <span className="text-sm">Order Management</span>
        </Link>
      </nav>

      {/* Tombol Logout */}
      <button className="flex items-center gap-2 px-4 py-2 text-left text-gray-600 hover:bg-gray-100 rounded-lg mt-auto transition-colors">
        <LogoutIcon />
        <span className="text-sm">Log out</span>
      </button>
    </div>
  );
}
