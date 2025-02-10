import { useState, useEffect } from "react";
import {
  FaChevronUp,
  FaChevronDown,
  FaEdit,
  FaList,
  FaTrashAlt,
  FaSearch,
} from "react-icons/fa";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import ProductModal from "./ProductModal";

export default function KatalogProduk() {
  const [sortConfig, setSortConfig] = useState({
    key: "tanggal",
    direction: "desc",
  });
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedAvailability, setSelectedAvailability] = useState("all"); // 'all', 'Tersedia', 'Habis'

  // Data produk
  const initialProducts = [
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
      nama: "Waterbom Bali",
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
  ];

  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', atau 'view'
  const [selectedProduct, setSelectedProduct] = useState(null); // Produk yang dipilih (untuk edit/view)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fungsi untuk membuka modal
  const openModal = (mode, product = null) => {
    setModalMode(mode);
    setSelectedProduct(product);
    setIsModalOpen(true);

    // Tutup dropdown kategori dan nonaktifkan underline
    setIsCategoryDropdownOpen(false);
    // setSortConfig({ key: null, direction: 'asc' }); // Reset underline
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Reset selectedProduct saat modal ditutup
  };

  // Fungsi untuk menambahkan produk baru
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: Date.now() },
    ]);
  };

  // Fungsi untuk mengupdate produk
  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      const updatedProducts = products.filter(
        (product) => product.id !== productToDelete.id
      );
      setProducts(updatedProducts);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  // Fungsi untuk mengurutkan data
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction }); // Update sortConfig.key

    // Sorting logic (existing code)
    const sortedProducts = [...products].sort((a, b) => {
      if (key === "tanggal") {
        const dateA = new Date(a.tanggal);
        const dateB = new Date(b.tanggal);
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      }
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setProducts(sortedProducts);
  };

  // Fungsi untuk mendapatkan ikon panah berdasarkan arah pengurutan
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      // Saat kolom aktif, gunakan panah biasa (↑ atau ↓)
      return sortConfig.direction === "asc" ? (
        <FiArrowUp /> // Panah ke atas untuk ascending
      ) : (
        <FiArrowDown /> // Panah ke bawah untuk descending
      );
    }
    // Saat kolom tidak aktif, gunakan chevron ganda (siku)
    return (
      <div className="flex flex-col items-center gap-0 text-gray-400">
        <FaChevronUp className="text-xs" />
        <FaChevronDown className="text-xs -mt-1" />
      </div>
    );
  };

  // Filter produk
  const [searchQuery, setSearchQuery] = useState("");

  // Modifikasi filteredProducts untuk include search query
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.nama
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      selectedCategory === "Semua Kategori" ||
      product.kategori === selectedCategory;
    const availabilityMatch =
      selectedAvailability === "all" ||
      product.ketersediaan === selectedAvailability;

    return nameMatch && categoryMatch && availabilityMatch;
  });

  // Perbaikan 2: Tambahkan useEffect untuk handle klik di luar dropdown
  useEffect(() => {
    // Jika sortConfig.key berubah, reset filter dan dropdown
    if (sortConfig.key !== "ketersediaan") {
      setSelectedAvailability("all"); // Reset filter ketersediaan
    }
    if (sortConfig.key !== "kategori") {
      setSelectedCategory("Semua Kategori"); // Reset filter kategori
      setIsCategoryDropdownOpen(false); // Tutup dropdown kategori
    }
  }, [sortConfig.key]);

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Judul, Search Bar, dan Tombol Tambah Produk */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Katalog Produk</h1>
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Tombol Tambah Produk */}
          <button
            onClick={() => openModal("add")} // Buka modal dengan mode 'add'
            className="px-4 py-2 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            style={{
              background: "linear-gradient(to bottom, #4CAF50, #00CA08)",
            }}
          >
            <span>+</span>
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Tabel Produk */}
      <div className="">
        <table className="w-full text-left table-fixed border-spacing-x-4">
          {" "}
          {/* Tambahkan table-auto */}
          <thead className="sticky top-0 bg-white">
            <tr className="text-gray-600 border-b border-gray-200">
              {/* Perbaikan 1: Ganti min-w-[200px] dengan min-w-[25%] */}
              <th className="py-3 w-[17%] min-w-[170px]">
                <div className="flex justify-between items-center">
                  <span>Nama Produk</span>
                  {/* Spacer untuk alignment */}
                </div>
              </th>
              {/* Perbaikan 2: Ganti min-w-[120px] dengan min-w-[10%] */}
              <th
                className="py-3 w-[14%] min-w-[140px] cursor-pointer"
                onClick={() => {
                  const newStatus =
                    selectedAvailability === "all"
                      ? "Tersedia"
                      : selectedAvailability === "Tersedia"
                      ? "Habis"
                      : "all";
                  setSelectedAvailability(newStatus);
                  setSortConfig({ key: "ketersediaan", direction: "asc" }); // Aktifkan underline
                }}
              >
                <div className="flex items-center">
                  <span className="relative mr-2">
                    Ketersediaan
                    {sortConfig.key === "ketersediaan" && (
                      <div
                        className="absolute bottom-[-13px] left-0 w-[calc(100%-1rem)] h-[2px]"
                        style={{
                          background:
                            "linear-gradient(to right, #517897, #006FFF)",
                        }}
                      ></div>
                    )}
                  </span>
                  <div className="flex justify-end">
                    {/* Indicator status */}
                    <div
                      className={`w-2 h-2 rounded-full ${
                        selectedAvailability === "Tersedia"
                          ? "bg-green-500"
                          : selectedAvailability === "Habis"
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>
              </th>
              {/* Perbaikan 3: Ganti min-w-[120px] dengan min-w-[15%] */}
              <th
                className="py-3 w-[14%] min-w-[140px] cursor-pointer relative"
                onClick={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setSortConfig({ key: "kategori", direction: "asc" }); // Aktifkan underline
                }}
              >
                <div className="flex items-center">
                  <span className="relative mr-2">
                    Kategori
                    {sortConfig.key === "kategori" && (
                      <div
                        className="absolute bottom-[-13px] left-0 w-full h-[2px]"
                        style={{
                          background:
                            "linear-gradient(to right, #517897, #006FFF)",
                        }}
                      ></div>
                    )}
                  </span>
                  <FaChevronDown className="text-xs text-gray-400" />
                </div>
                {/* Dropdown Filter */}
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedCategory("Semua Kategori")}
                    >
                      Semua Kategori
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedCategory("Activity")}
                    >
                      Activity
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedCategory("Tour")}
                    >
                      Tour
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedCategory("Attraction")}
                    >
                      Attraction
                    </div>
                  </div>
                )}
              </th>
              {/* Perbaikan 4: Ganti min-w-[150px] dengan min-w-[15%] */}
              <th
                className="py-3 w-[14%] min-w-[140px] cursor-pointer"
                onClick={() => sortData("tanggal")}
              >
                <div className="flex items-center">
                  <span className="relative mr-2">
                    Tanggal
                    {sortConfig.key === "tanggal" && (
                      <div
                        className="absolute bottom-[-13px] left-0 w-full h-[2px]"
                        style={{
                          background:
                            "linear-gradient(to right, #517897, #006FFF)",
                        }}
                      ></div>
                    )}
                  </span>
                  {getSortIcon("tanggal")}
                </div>
              </th>
              {/* Perbaikan 5: Ganti min-w-[120px] dengan min-w-[10%] */}
              <th
                className="py-3 w-[11%] min-w-[110px] cursor-pointer"
                onClick={() => sortData("rating")}
              >
                <div className="flex items-center">
                  <span className="relative mr-2">
                    Rating
                    {sortConfig.key === "rating" && (
                      <div
                        className="absolute bottom-[-13px] left-0 w-full h-[2px]"
                        style={{
                          background:
                            "linear-gradient(to right, #517897, #006FFF)",
                        }}
                      ></div>
                    )}
                  </span>
                  {getSortIcon("rating")}
                </div>
              </th>
              {/* Perbaikan 6: Ganti min-w-[120px] dengan min-w-[10%] */}
              <th
                className="py-3 w-[14%] min-w-[140px] cursor-pointer"
                onClick={() => sortData("harga")}
              >
                <div className="flex items-center">
                  <span className="relative mr-2">
                    Harga
                    {sortConfig.key === "harga" && (
                      <div
                        className="absolute bottom-[-13px] left-0 w-full h-[2px]"
                        style={{
                          background:
                            "linear-gradient(to right, #517897, #006FFF)",
                        }}
                      ></div>
                    )}
                  </span>
                  {getSortIcon("harga")}
                </div>
              </th>
              {/* Perbaikan 7: Ganti min-w-[120px] dengan min-w-[10%] */}
              <th className="py-3 w-[6%] min-w-[60px]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Baris Data Produk */}
            {filteredProducts.map((produk) => (
              <tr
                key={produk.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4">{produk.nama}</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      produk.ketersediaan === "Tersedia"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {produk.ketersediaan}
                  </span>
                </td>
                <td className="py-4">{produk.kategori}</td>
                <td className="py-4">{produk.tanggal}</td>
                <td className="py-4">
                  <span className="text-amber-400 text-xl">★</span>{" "}
                  {produk.rating}
                </td>
                <td className="py-4">Rp {produk.harga.toLocaleString()}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal("edit", produk)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => openModal("view", produk)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaList />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(produk)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          mode={modalMode}
          product={selectedProduct}
          onSubmit={
            modalMode === "add" ? handleAddProduct : handleUpdateProduct
          }
        />
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <ProductModal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          mode="delete"
          product={productToDelete}
          onSubmit={confirmDelete}
        />
      )}
    </div>
  );
}
