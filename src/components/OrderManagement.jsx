import { useState, useEffect } from "react";
import {
  FaChevronUp,
  FaChevronDown,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaList,
} from "react-icons/fa";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import OrderModal from "./OrderModal";

export default function OrderManagement({ orders, setOrders, products }) {
  const [sortConfig, setSortConfig] = useState({
    key: "tanggal",
    direction: "desc",
  });
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', atau 'view'
  const [selectedOrder, setSelectedOrder] = useState(null); // Produk yang dipilih (untuk edit/view)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Semua Status"); // 'Semua Status', 'Sukses', 'Diproses', 'Batal'

  const openModal = (mode, order = null) => {
    if (mode === "view" && order) {
      // Find the complete product data from products array
      const productData = products.find(p => p.nama === order.produk);
  
      // Merge order data with product data
      const enrichedOrder = {
        ...order,
        productDetails: productData,
        // Ensure images are passed through
        gambar: productData?.gambar || []
      };
  
      setSelectedOrder(enrichedOrder);
    } else {
      setSelectedOrder(order);
    }
  
    setModalMode(mode);
    setIsModalOpen(true);
    setIsProductDropdownOpen(false);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null); // Reset selectedProduct saat modal ditutup
  };

  // Fungsi untuk menambahkan produk baru
  const handleAddOrder = (newOrder) => {
    const product = products.find(p => p.nama === newOrder.produk);
    if (product) {
      const totalHarga = product.harga * newOrder.jumlah;
      setOrders((prevOrders) => {
        const updatedOrders = [
          ...prevOrders,
          {
            ...newOrder,
            id: Date.now(),
            orderId: newOrder.orderId,
            totalHarga: totalHarga
          }
        ];
        return updatedOrders.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
      });
    }
  };
  
  const handleUpdateOrder = (updatedOrder) => {
    const product = products.find(p => p.nama === updatedOrder.produk);
    if (product) {
      const totalHarga = product.harga * updatedOrder.jumlah;
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrder.id ? { ...updatedOrder, totalHarga: totalHarga } : order
      );
      setOrders(updatedOrders.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)));
    }
  };

  const handleDeleteOrder = (order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    if (orderToDelete) {
      const updatedOrders = orders.filter(
        (order) => order.id !== orderToDelete.id
      );
      setOrders(updatedOrders.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))); // Perbaiki nama fungsi
      setIsDeleteModalOpen(false);
      setOrderToDelete(null);
    }
  };

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  
    const sorted = [...orders].sort((a, b) => {
      if (key === "tanggal") {
        return direction === "asc"
          ? new Date(a.tanggal) - new Date(b.tanggal)
          : new Date(b.tanggal) - new Date(a.tanggal);
      }
      if (key === "jumlah" || key === "totalHarga") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
      return a[key].localeCompare(b[key]);
    });
  
    setOrders(sorted);
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

  // Underline styling
  const getActiveUnderline = (key) => {
    if (sortConfig.key === key) {
      return (
        <div
          className="absolute bottom-[-13px] left-0 w-full h-[2px]"
          style={{
            background: "linear-gradient(to right, #517897, #006FFF)",
          }}
        />
      );
    }
    return null;
  };

  const filteredOrders = orders.filter((order) => {
    if (!order.customer) return false; // Skip jika customer tidak ada
    const nameMatch = order.customer
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const statusMatch =
      selectedStatus === "Semua Status" || order.status === selectedStatus;
    return nameMatch && statusMatch;
  });

  // Urutkan data secara descending berdasarkan tanggal secara default
  useEffect(() => {
    setOrders((prevOrders) =>
      [...prevOrders].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    );
  }, [setOrders]);

  return (
    <div className="bg-white rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Cari customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Tombol Order Baru */}
          <button
            onClick={() => openModal("add")}
            className="px-4 py-2 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            style={{
              background: "linear-gradient(to bottom, #4CAF50, #00CA08)",
            }}
          >
            <span>+</span>
            <span>Order Baru</span>
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="">
        <table className="w-full text-left table-fixed border-spacing-x-4">
          <thead className="sticky top-0 bg-white">
            <tr className="text-gray-600 border-b border-gray-200">
              <th className="py-3 w-[15%] min-w-[170px]">Customer</th>
              <th className="py-3 w-[15%] min-w-[170px]">Email</th>
              <th className="py-3 w-[10%] min-w-[100px]">Order ID</th>
              <th className="py-3 w-[10%] min-w-[100px]">Produk</th>
              {/* Kolom Produk dengan Underline */}
              <th
                className="py-3 w-[9%] min-w-[100px] cursor-pointer relative"
                onClick={() => {
                  setIsProductDropdownOpen(!isProductDropdownOpen);
                  setSortConfig({ key: "status", direction: "asc" });
                }}
              >
                <div className="flex items-center">
                  <span className="relative mr-2">
                    Status
                    {getActiveUnderline("status")}
                  </span>
                  <FaChevronDown className="text-xs text-gray-400" />
                </div>
                {/* Dropdown Filter */}
                {isProductDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedStatus("Semua Status")}
                    >
                      Semua Status
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedStatus("Sukses")}
                    >
                      Sukses
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedStatus("Diproses")}
                    >
                      Diproses
                    </div>
                    <div
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedStatus("Batal")}
                    >
                      Batal
                    </div>
                  </div>
                )}
              </th>
              {/* Kolom Tanggal dengan Underline */}
              <th
                className="py-3 w-[10%] min-w-[120px] cursor-pointer relative"
                onClick={() => sortData("tanggal")}
              >
                <div className="flex items-center">
                  <span className="relative mr-2">
                    Tanggal
                    {getActiveUnderline("tanggal")}
                  </span>
                  {getSortIcon("tanggal")}
                </div>
              </th>
              {/* Kolom Jumlah dengan Underline */}
              <th
                className="py-3 w-[8%] min-w-[80px] cursor-pointer relative"
                onClick={() => sortData("jumlah")}
              >
                <div className="flex items-center">
                  <span className="relative mr-2">
                    Jumlah
                    {getActiveUnderline("jumlah")}
                  </span>
                  {getSortIcon("jumlah")}
                </div>
              </th>
              {/* Kolom Total Harga dengan Underline */}
              <th
                className="py-3 w-[12%] min-w-[120px] cursor-pointer relative"
                onClick={() => sortData("totalHarga")}
              >
                <div className="flex items-center">
                  <span className="relative mr-2">
                    Total Harga
                    {getActiveUnderline("totalHarga")}
                  </span>
                  {getSortIcon("totalHarga")}
                </div>
              </th>
              <th className="py-3 w-[8%] min-w-[80px]">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4">{order.customer}</td>
                <td className="py-4">{order.email}</td>
                <td className="py-4">{order.orderId}</td>
                <td className="py-4">{order.produk}</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "Sukses"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Batal"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4">
                  {new Date(order.tanggal).toLocaleDateString()}
                </td>
                <td className="py-4">{order.jumlah}</td>
                <td className="py-4">Rp{order.totalHarga.toLocaleString()}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => openModal("edit", order)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => openModal("view", order)}
                    >
                      <FaList />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteOrder(order)}
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
        <OrderModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          mode={modalMode}
          order={selectedOrder}
          onSubmit={
            modalMode === "add" ? handleAddOrder : handleUpdateOrder
          }
          products={products}
        />
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <OrderModal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          mode="delete"
          order={orderToDelete}
          onSubmit={confirmDelete}
        />
      )}
    </div>
  );
}