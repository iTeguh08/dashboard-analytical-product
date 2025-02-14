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

export default function KatalogProduk({ products, setProducts }) {
  const [sortConfig, setSortConfig] = useState({
    key: "tanggal",
    direction: "desc",
  });
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedAvailability, setSelectedAvailability] = useState("all"); // 'all', 'Tersedia', 'Habis'

  // Data produk
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', atau 'view'
  const [selectedProduct, setSelectedProduct] = useState(null); // Produk yang dipilih (untuk edit/view)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Sample product images added
  const defaultProducts = [
    {
      id: 1,
      nama: "Produk 1",
      kategori: "Activity",
      tanggal: "2024-01-01",
      rating: 4,
      harga: 100000,
      ketersediaan: "Tersedia",
      gambar: ["https://via.placeholder.com/200x150"]
    },
    {
      id: 2,
      nama: "Produk 2",
      kategori: "Tour",
      tanggal: "2024-01-02",
      rating: 5,
      harga: 200000,
      ketersediaan: "Tersedia",
      gambar: ["https://via.placeholder.com/200x150"]
    }
  ];

  useEffect(() => {
    if (!products || products.length === 0) {
      setProducts(defaultProducts);
    }
  }, []);

  // Fungsi untuk membuka modal
  const openModal = (mode, product = null) => {
    setModalMode(mode);
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsCategoryDropdownOpen(false);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Fungsi untuk menambahkan produk baru
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: Date.now() },
    ]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
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
    setSortConfig({ key, direction });
  };

  // Fungsi untuk mendapatkan ikon panah berdasarkan arah pengurutan
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <FiArrowUp /> 
      ) : (
        <FiArrowDown /> 
      );
    }
    return (
      <div className="flex flex-col items-center gap-0 text-gray-400">
        <FaChevronUp className="text-xs" />
        <FaChevronDown className="text-xs -mt-1" />
      </div>
    );
  };

  // Filter produk
  const [searchQuery, setSearchQuery] = useState("");
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
    if (sortConfig.key !== "ketersediaan") {
      setSelectedAvailability("all");
    }
    if (sortConfig.key !== "kategori") {
      setSelectedCategory("Semua Kategori");
      setIsCategoryDropdownOpen(false);
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
            onClick={() => openModal("add")}
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
          <thead className="sticky top-0 bg-white">
            <tr className="text-gray-600 border-b border-gray-200">
              <th className="py-3 w-[17%] min-w-[170px]">
                <div className="flex justify-between items-center">
                  <span>Nama Produk</span>
                </div>
              </th>
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
                  setSortConfig({ key: "ketersediaan", direction: "asc" });
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
              <th
                className="py-3 w-[14%] min-w-[140px] cursor-pointer relative"
                onClick={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setSortConfig({ key: "kategori", direction: "asc" });
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
              <th className="py-3 w-[6%] min-w-[60px]">Aksi</th>
            </tr>
          </thead>
          <tbody>
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
