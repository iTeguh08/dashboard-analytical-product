import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 1920 1920"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="success-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4CAF50" />
        <stop offset="100%" stopColor="#00CA08" />
      </linearGradient>
    </defs>
    <path
      d="M1827.701 303.065 698.835 1431.801 92.299 825.266 0 917.564 698.835 1616.4 1919.869 395.234z"
      fill="url(#success-gradient)"
      fillRule="evenodd"
    />
  </svg>
);

const SyncIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="process-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#517897" />
        <stop offset="100%" stopColor="#006FFF" />
      </linearGradient>
    </defs>
    <g fill="url(#process-gradient)">
      <polygon points="31,8 42.9,9.6 33.1,19.4" />
      <polygon points="17,40 5.1,38.4 14.9,28.6" />
      <polygon points="8,17 9.6,5.1 19.4,14.9" />
      <path d="M9.3,21.2L5.1,22C5,22.7,5,23.3,5,24c0,4.6,1.6,9,4.6,12.4l3-2.6C10.3,31.1,9,27.6,9,24 C9,23.1,9.1,22.1,9.3,21.2z" />
      <path d="M24,5c-5.4,0-10.2,2.3-13.7,5.9l2.8,2.8C15.9,10.8,19.7,9,24,9c0.9,0,1.9,0.1,2.8,0.3l0.7-3.9 C26.4,5.1,25.2,5,24,5z" />
      <path d="M38.7,26.8l4.2-0.8c0.1-0.7,0.1-1.3,0.1-2c0-4.4-1.5-8.7-4.3-12.1l-3.1,2.5c2.2,2.7,3.4,6.1,3.4,9.5 C39,24.9,38.9,25.9,38.7,26.8z" />
      <path d="M34.9,34.3C32.1,37.2,28.3,39,24,39c-0.9,0-1.9-0.1-2.8-0.3l-0.7,3.9c1.2,0.2,2.4,0.3,3.5,0.3 c5.4,0,10.2-2.3,13.7-5.9L34.9,34.3z" />
    </g>
  </svg>
);

const TimesIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="cancel-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF0000" />
        <stop offset="100%" stopColor="#FF6A13" />
      </linearGradient>
    </defs>
    <line
      x1="8.06"
      y1="8.06"
      x2="55.41"
      y2="55.94"
      stroke="url(#cancel-gradient)"
      strokeWidth="3"
    />
    <line
      x1="55.94"
      y1="8.06"
      x2="8.59"
      y2="55.94"
      stroke="url(#cancel-gradient)"
      strokeWidth="3"
    />
  </svg>
);

export default function SalesCard() {
  return (
    <div
      className="text-white rounded-lg p-6 shadow-lg w-full max-w-sm"
      style={{
        background: 'linear-gradient(to bottom, #000000, #474242)',
      }}
    >
      <h2 className="text-sm font-medium mb-[3dvh]">
        Laporan status penjualan seluruh produk tahun 2024
      </h2>
      <h1 className="text-5xl font-bold mb-[3dvh]">293</h1>

      <div className="w-full h-2 overflow-hidden mb-[3dvh] flex">
        <div
          className="rounded-full"
          style={{
            width: '62%',
            background: 'linear-gradient(to right, #4CAF50, #00CA08)',
            marginRight: '5px',
          }}
          data-tooltip-id="sukses-tooltip"
          data-tooltip-content="Sukses: 263"
        ></div>
        <div
          className="rounded-full"
          style={{
            width: '22%',
            background: 'linear-gradient(to right, #517897, #006FFF)',
            marginRight: '5px',
          }}
          data-tooltip-id="diproses-tooltip"
          data-tooltip-content="Diproses: 17"
        ></div>
        <div
          className="rounded-full"
          style={{
            width: '16%',
            background: 'linear-gradient(to right, #FF0000, #FF6A13)',
          }}
          data-tooltip-id="batal-tooltip"
          data-tooltip-content="Batal: 13"
        ></div>
      </div>

      <div className="flex justify-between items-center">
        <div className="">
          <div className="text-2xl mb-[1.5dvh]">
            <CheckIcon />
          </div>
          <p className="text-xs mb-[1.2dvh]">Sukses</p>
          <p className="text-lg font-bold">263</p>
        </div>

        <div className="">
          <div className="text-2xl mb-[1.5dvh]">
            <SyncIcon />
          </div>
          <p className="text-xs mb-[1.2vh]">Diproses</p>
          <p className="text-lg font-bold">17</p>
        </div>

        <div className="">
          <div className="text-2xl mb-[1.5dvh]">
            <TimesIcon />
          </div>
          <p className="text-xs mb-[1.2vh]">Batal</p>
          <p className="text-lg font-bold">13</p>
        </div>
      </div>

      <Tooltip id="sukses-tooltip" />
      <Tooltip id="diproses-tooltip" />
      <Tooltip id="batal-tooltip" />
    </div>
  );
}
