import React from 'react';

export default function ProductTable() {
  return (
    <div className="bg-white rounded-lg pr-4">
      <h2 className="text-xl font-semibold mb-6">Top 3 Produk</h2>
      <div className="overflow-x-auto pl-5">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="w-2/12 pb-[2dvh] border-b border-gray-200">No</th>
              <th className="w-4/12 pb-[2dvh] border-b border-gray-200">
                Nama
              </th>
              <th className="w-3/12 pb-[2dvh] border-b border-gray-200">
                Kategori
              </th>
              <th className="w-3/12 pb-[2dvh] border-b border-gray-200">
                Terjual
              </th>
              <th className="w-3/12 pb-[2dvh] border-b border-gray-200">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-[2.2dvh]">01</td>
              <td>Pantai Pandawa</td>
              <td>Attraction</td>
              <td>124</td>
              <td>
                <span className="text-amber-400 text-xl">★</span>
                4.8
              </td>
            </tr>
            <tr>
              <td className="py-[2.2dvh]">02</td>
              <td>Workshop Seni Ubud</td>
              <td>Attraction</td>
              <td>88</td>
              <td>
                <span className="text-amber-400 text-xl">★</span>
                4.8
              </td>
            </tr>
            <tr>
              <td className="py-[2.2dvh]">03</td>
              <td>Nusa Penida</td>
              <td>Tour</td>
              <td>72</td>
              <td>
                <span className="text-amber-400 text-xl">★</span>
                4.9
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
