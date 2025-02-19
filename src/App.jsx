import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MetricCard from "./components/MetricCard";
import SalesCard from "./components/SalesCard";
import ProductTable from "./components/ProductTable";
import SalesChart from "./components/SalesChart";
import DonutChart from "./components/DonutChart";
import KatalogProduk from "./components/KatalogProduk"; // Import komponen KatalogProduk
import OrderManagement from "./components/OrderManagement"; // Import komponen OrderManagement
import "./index.css";

export default function App() {
  const [activeProduct, setActiveProduct] = useState("Tour");

  const [products, setProducts] = useState([
    {
      id: 1,
      nama: "Snorkeling",
      ketersediaan: "Tersedia",
      kategori: "Activity",
      tanggal: "2024-12-11",
      rating: 4.7,
      harga: 200000,
      durasi: 3, // Durasi dalam jam
      deskripsi:
        "Nikmati pengalaman snorkeling di pantai indah dengan kehidupan laut yang memukau.",
      gambar: [
        // Gambar diambil dari pencarian "snorkeling" di Unsplash
        "https://res.klook.com/image/upload/c_fill,w_750,h_750/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/bwg8wmcrubrjjgjaecys.jpg",
        "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2021/04/23/437b4bbc-3f45-44b1-bff5-58d6218f9a8f-1619184378979-bf8ac3e826cfa8882365f39b517571a7.jpg",
      ],
    },
    {
      id: 2,
      nama: "Nusa Penida",
      ketersediaan: "Habis",
      kategori: "Tour",
      tanggal: "2024-12-09",
      rating: 4.8,
      harga: 150000,
      durasi: 8, // Durasi dalam jam
      deskripsi:
        "Jelajahi keindahan Nusa Penida dengan tur sehari penuh, termasuk makan siang dan transportasi.",
      gambar: [
        // Gambar diambil dari pencarian "Nusa Penida Bali" di Unsplash
        "https://torch.id/cdn/shop/articles/Artikel_157_-_Preview.webp?v=1710759080&width=1100",
        "https://images.unsplash.com/photo-1583022725197-4dc56058caaf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    {
      id: 3,
      nama: "Pantai Pandawa",
      ketersediaan: "Tersedia",
      kategori: "Attraction",
      tanggal: "2024-12-13",
      rating: 4.9,
      harga: 135000,
      durasi: 2, // Durasi dalam jam
      deskripsi:
        "Kunjungi Pantai Pandawa yang eksotis dengan pasir putih dan air biru jernih.",
      gambar: [
        // Hasil pencarian "Pantai Pandawa Bali" di Unsplash
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntEdXnfj4CBjdKQGfKYthAs7XdctIaSx41g&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFafnucLm3QG8eZr12OJ-N-mXGSUWlX3xfCzxCqb1WSMd9mCaYNgETlqrckcpZJkLaDs&usqp=CAU",
      ],
    },
    {
      id: 4,
      nama: "Rafting Ayung",
      ketersediaan: "Tersedia",
      kategori: "Activity",
      tanggal: "2024-11-25",
      rating: 4.6,
      harga: 250000,
      durasi: 4, // Durasi dalam jam
      deskripsi:
        "Rasakan sensasi rafting di Sungai Ayung dengan pemandangan alam yang menakjubkan.",
      gambar: [
        // Pencarian dengan kata kunci "Rafting Ayung Bali" di Unsplash
        "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2021/05/06/74e069fa-c4f0-4e6f-a4ab-ef1c8cc67505-1620272772592-a42bbcb094ce4bc6efd33d8ea02b65d9.jpg",
        "https://www.water-sport-bali.com/wp-content/uploads/2023/10/Ayung-Rafting-Ubud-Bali-Twitter.jpg",
      ],
    },
    {
      id: 5,
      nama: "Tanah Lot",
      ketersediaan: "Tersedia",
      kategori: "Attraction",
      tanggal: "2024-12-01",
      rating: 4.5,
      harga: 100000,
      durasi: 3, // Durasi dalam jam
      deskripsi:
        "Kunjungi Pura Tanah Lot, salah satu ikon wisata Bali yang terkenal dengan sunsetnya.",
      gambar: [
        // Gambar dari pencarian "Tanah Lot Bali" di Unsplash
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7viuKn7WiCG94wwZe3dobYJhRaieI6Keww&s",
        "https://www.rentalmobilbali.net/wp-content/uploads/2019/12/Sunset-Pura-Tanah-Lot-Bali-Feature-Image.jpg",
      ],
    },
    {
      id: 6,
      nama: "Ubud Tour",
      ketersediaan: "Habis",
      kategori: "Tour",
      tanggal: "2024-11-30",
      rating: 4.7,
      harga: 180000,
      durasi: 6, // Durasi dalam jam
      deskripsi:
        "Jelajahi Ubud dengan tur budaya, termasuk kunjungan ke sawah terasering dan galeri seni.",
      gambar: [
        // Hasil pencarian "Ubud Bali" di Unsplash
        "https://cdn.forevervacation.com/uploads/digital/assets/besakih-mother-temple.jpg?tr=w-560,h-638",
        "https://res.klook.com/image/upload/c_fill,w_750,h_750/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/v9gsxlscqdv3yxovmjs3.jpg",
      ],
    },
    {
      id: 7,
      nama: "Kintamani Tour",
      ketersediaan: "Tersedia",
      kategori: "Tour",
      tanggal: "2024-12-05",
      rating: 4.8,
      harga: 220000,
      durasi: 5, // Durasi dalam jam
      deskripsi:
        "Nikmati pemandangan Gunung Batur dan Danau Batur di Kintamani dengan tur sehari.",
      gambar: [
        // Gambar dari pencarian "Kintamani Bali" di Unsplash
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/ba/5d.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKlX1yrs7lfgIzgUfshIfJYa5GEO0EsS3f0g&s",
      ],
    },
    {
      id: 8,
      nama: "Tirta Empul",
      ketersediaan: "Tersedia",
      kategori: "Attraction",
      tanggal: "2024-12-10",
      rating: 4.4,
      harga: 120000,
      durasi: 2, // Durasi dalam jam
      deskripsi:
        "Kunjungi Pura Tirta Empul untuk merasakan ritual pembersihan spiritual di sumber air suci.",
      gambar: [
        // Pencarian "Tirta Empul Bali" di Unsplash
        "https://torch.id/cdn/shop/articles/Artikel_160_-_Preview.webp?v=1710761089&width=1100",
        "https://www.gotravelaindonesia.com/wp-content/uploads/wisata-tirta-empul.jpg",
      ],
    },
    {
      id: 9,
      nama: "Bali Safari",
      ketersediaan: "Tersedia",
      kategori: "Attraction",
      tanggal: "2024-12-15",
      rating: 4.3,
      harga: 300000,
      durasi: 4, // Durasi dalam jam
      deskripsi:
        "Jelajahi kehidupan satwa liar di Bali Safari and Marine Park dengan tur edukatif.",
      gambar: [
        // Hasil pencarian "Bali Safari" di Unsplash
        "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2250/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/mjb5xsoj1r5m92whyx8p/PesanBaliSafariandMarineParkTour-KlookIndonesia.jpg",
        "https://yourtrip.id/wp-content/uploads/2023/02/Bali-Safari.jpg",
      ],
    },
    {
      id: 10,
      nama: "Waterboom Bali",
      ketersediaan: "Habis",
      kategori: "Activity",
      tanggal: "2024-12-20",
      rating: 4.9,
      harga: 350000,
      durasi: 6, // Durasi dalam jam
      deskripsi:
        "Nikmati wahana air seru di Waterbom Bali, taman air terbaik di Asia.",
      gambar: [
        // Gambar dari pencarian "Waterbom Bali" atau "water park Bali" di Unsplash
        "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2021/12/23/e03986c2-3689-46fa-b346-0d355472818d-1640249617229-985ec7b0c8b9d720ee4baa6de97d4c12.jpg",
        "https://www.whitewaterwest.com/wp-content/uploads/2019/03/FlowRider-Double-Waterbom-Bali-Kuta-Bali-2-492x702.jpg",
      ],
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      email: "john@mail.com",
      orderId: "ORD001",
      produk: "Pantai Pandawa",
      status: "Sukses",
      tanggal: "2024-12-11",
      jumlah: 2,
      totalHarga: 400000,
      gambar: [
        // Hasil pencarian "Pantai Pandawa Bali" di Unsplash
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntEdXnfj4CBjdKQGfKYthAs7XdctIaSx41g&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFafnucLm3QG8eZr12OJ-N-mXGSUWlX3xfCzxCqb1WSMd9mCaYNgETlqrckcpZJkLaDs&usqp=CAU",
      ],
    },
    {
      id: 2,
      customer: "Jane Smith",
      email: "jane@mail.com",
      orderId: "ORD002",
      produk: "Snorkeling",
      status: "Diproses",
      tanggal: "2024-12-10",
      jumlah: 4,
      totalHarga: 800000,
      gambar: [
        // Gambar diambil dari pencarian "snorkeling" di Unsplash
        "https://res.klook.com/image/upload/c_fill,w_750,h_750/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/bwg8wmcrubrjjgjaecys.jpg",
        "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2021/04/23/437b4bbc-3f45-44b1-bff5-58d6218f9a8f-1619184378979-bf8ac3e826cfa8882365f39b517571a7.jpg",
      ],
    },
    {
      id: 3,
      customer: "Bob Johnson",
      email: "bob@mail.com",
      orderId: "ORD003",
      produk: "Nusa Penida",
      status: "Batal",
      tanggal: "2024-12-09",
      jumlah: 1,
      totalHarga: 150000,
    },
    {
      id: 4,
      customer: "Alice Brown",
      email: "alice@mail.com",
      orderId: "ORD004",
      produk: "Rafting Ayung",
      status: "Sukses",
      tanggal: "2024-12-12",
      jumlah: 3,
      totalHarga: 750000,
      gambar: [
        // Pencarian dengan kata kunci "Rafting Ayung Bali" di Unsplash
        "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2021/05/06/74e069fa-c4f0-4e6f-a4ab-ef1c8cc67505-1620272772592-a42bbcb094ce4bc6efd33d8ea02b65d9.jpg",
        "https://www.water-sport-bali.com/wp-content/uploads/2023/10/Ayung-Rafting-Ubud-Bali-Twitter.jpg",
      ],
    },
    {
      id: 5,
      customer: "Charlie Wilson",
      email: "charlie@mail.com",
      orderId: "ORD005",
      produk: "Bali Safari",
      status: "Diproses",
      tanggal: "2024-12-13",
      jumlah: 2,
      totalHarga: 600000,
      gambar: [
                // Hasil pencarian "Bali Safari" di Unsplash
                "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2250/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/mjb5xsoj1r5m92whyx8p/PesanBaliSafariandMarineParkTour-KlookIndonesia.jpg",
                "https://yourtrip.id/wp-content/uploads/2023/02/Bali-Safari.jpg",
              ],
            },
          ]);
        
          const categories = ["Tour", "Activity", "Attraction"];
          const metrics = categories.map(category => ({
            title: category,
            value: products.filter(product => product.kategori === category).length.toString()
          }));
        
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
                      <Route path="/katalog-produk" element={<KatalogProduk products={products} setProducts={setProducts} />} />
                      <Route path="/order-management" element={<OrderManagement orders={orders} setOrders={setOrders} products={products} />} />
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
          if (
            location.pathname === "/katalog-produk" ||
            location.pathname === "/order-management"
          ) {
            return null;
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