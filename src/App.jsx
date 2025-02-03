import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';
import SalesCard from './components/SalesCard';
import ProductTable from './components/ProductTable';
import SalesChart from './components/SalesChart';
import DonutChart from './components/DonutChart';
import KatalogProduk from './components/KatalogProduk'; // Import komponen KatalogProduk
import './index.css';

export default function App() {
  const [activeProduct, setActiveProduct] = useState('Tour');

  const metrics = [
    { title: 'Tour', value: '78' },
    { title: 'Activity', value: '87' },
    { title: 'Attraction', value: '98' },
  ];

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-white">
        {/* Fixed Sidebar */}
        <div className="flex-none">
          <Sidebar />
        </div>

        {/* Scrollable Middle Section */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-8">
            {/* Header */}
            <Header />

            {/* Routes untuk Dashboard dan Katalog Produk */}
            <Routes>
              {/* Route untuk Dashboard */}
              <Route
                path="/"
                element={
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {metrics.map((metric) => (
                        <MetricCard
                          key={metric.title}
                          title={metric.title}
                          value={metric.value}
                          isActive={activeProduct === metric.title}
                          onClick={() => setActiveProduct(metric.title)}
                        />
                      ))}
                    </div>

                    <div className="mt-8">
                      <SalesChart productType={activeProduct} />
                    </div>

                    <div className="mt-2">
                      <ProductTable />
                    </div>
                  </>
                }
              />

              {/* Route untuk Katalog Produk */}
              <Route path="/katalog-produk" element={<KatalogProduk />} />
            </Routes>
          </div>
        </div>

        {/* Fixed Right Section */}
        <RightSection />
      </div>
    </Router>
  );
}

// Komponen RightSection untuk menentukan apakah SalesCard dan DonutChart ditampilkan
function RightSection() {
  const location = useLocation(); // Ambil path saat ini

  // Tampilkan SalesCard dan DonutChart hanya jika path bukan '/katalog-produk'
  if (location.pathname === '/katalog-produk') {
    return null; // Jangan tampilkan apa pun di halaman Katalog Produk
  }

  return (
    <div className="flex-none w-[21dvw] h-screen overflow-hidden bg-white">
      <div className="py-8 px-3 flex flex-col">
        <SalesCard />
        <div className="mt-4">
          <DonutChart />
        </div>
      </div>
    </div>
  );
}
