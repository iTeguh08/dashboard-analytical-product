import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tag, Clock, Calendar, Hash, AlertTriangle } from "lucide-react";

const getCustomStyles = (mode) => ({
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: mode === "view" ? "700px" : "600px", // Increased width for edit mode
    width: mode === "delete" ? "400px" : mode === "view" ? "700px" : "600px",
    padding: "0",
    borderRadius: "0",
    overflow: "hidden",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

const gradientStyles = `
  .gradient-button-green {
    background-image: linear-gradient(to top, #4CAF50, #00CA08);
    color: white;
    border: none;
    transition: opacity 0.3s ease;
  }

  .gradient-button-green:hover {
    opacity: 0.9;
  }

  .gradient-button-blue {
    background-image: linear-gradient(to top, #517897, #006FFF);
    color: white;
    border: none;
    transition: opacity 0.3s ease;
  }

  .gradient-button-red {
    background-image: linear-gradient(to top, #FF0000, #FF6A13);
    color: white;
    border: none;
    transition: opacity 0.3s ease;
  }

  .gradient-button-blue:hover {
    opacity: 0.9;
  }
`;

const scrollableContent = `
  .grid-cols-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .bg-gray-100 {
    background-color: #f3f4f6;
  }

  .border-dashed {
    border-style: dashed;
  }
`;

Modal.setAppElement("#root");

export default function OrderModal({
  isOpen,
  onRequestClose,
  mode,
  order,
  onSubmit,
}) {
  const [custName, setCustName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState(0); // Default value sebagai angka
  const [orderID, setOrderId] = useState(""); // Ubah nama variabel agar lebih jelas
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState(""); // Default value sebagai string
  const [quantity, setQuantity] = useState(0); // Default value sebagai angka
  const [status, setStatus] = useState(""); // Default value sebagai string

  useEffect(() => {
    if (mode === "add") {
      setOrderId(`ORD-${Math.floor(1000 + Math.random() * 8000)}`);
    } else if (mode === "edit" || mode === "view") {
      setCustName(order.customer || "");
      setEmail(order.email || "");
      setProductName(order.produk || "");
      setQuantity(order.jumlah || 0);
      setPrice(order.totalHarga || 0);
      setStatus(order.status || "");
      setDate(order.tanggal || "");
    }
  }, [mode, order]);

  const resetForm = () => {
    setOrderId("");
    setCustName("");
    setEmail("");
    setProductName([]); // String, bukan array
    setQuantity(0); // Angka, bukan string
    setPrice(0); // Angka, bukan string
    setStatus("");
    setDate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      alert("Harga harus berupa angka.");
      return;
    }
    const newOrder = {
      id: orderID,
      customer: custName, // Sesuaikan dengan nama properti di OrderManagement
      email: email,
      produk: productName, // Gunakan 'produk' sesuai struktur data
      jumlah: quantity,
      totalHarga: parsedPrice, // Gunakan 'totalHarga' sesuai struktur data
      status: status,
      tanggal: date,
    };
    onSubmit(newOrder); // Kirim data ke parent component
    resetForm();
    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        ...getCustomStyles(mode),
        content: {
          ...getCustomStyles(mode).content,
          height: "auto",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
      contentLabel={`${mode} Produk Modal`}
      onClick={(e) => {
        // Tutup modal hanya jika klik terjadi di luar konten modal
        if (e.target === e.currentTarget) {
          onRequestClose();
        }
      }}
    >
      <style>{gradientStyles}</style>
      <style>{scrollableContent}</style>

      {mode === "delete" ? (
        // Delete Confirmation Modal
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-xl font-bold mb-4">Konfirmasi Penghapusan</h2>
            <p className="mb-6">
              Apakah Anda yakin ingin menghapus order "{order?.custName}"?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onRequestClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={onSubmit}
                className="px-4 py-2 text-white rounded-lg gradient-button-red"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ) : mode === "view" ? (
        // Tampilan khusus View
        <div className="flex flex-col md:flex-row" style={{ border: "none" }}>
          {previewUrls.length > 0 ? (
            <div className="relative w-full md:w-2/5 p-4 flex items-center justify-center">
              {/* Gambar */}
              <img
                src={previewUrls[activeImageIndex] || "/placeholder.svg"}
                alt={`Preview ${activeImageIndex}`}
                className="w-full h-[300px] object-cover rounded-lg shadow-md"
              />

              {/* Navigation Buttons */}
              {previewUrls.length > 1 && (
                <>
                  <button
                    onClick={handleImageNavigation}
                    className="absolute top-1/2 left-6 transform rounded-sm -translate-y-1/2 bg-white p-[0.4rem] shadow-md hover:bg-gray-200 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleImageNavigation}
                    className="absolute top-1/2 right-6 transform rounded-sm -translate-y-1/2 bg-white p-[0.4rem] shadow-md hover:bg-gray-200 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ) : (
            <p>Tidak ada gambar tersedia.</p>
          )}

          {/* Bagian Detail */}
          <div className="w-full md:w-3/5 p-6 pl-2 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-gray-800">{custName}</h2>
              <button
                onClick={onRequestClose}
                className="p-[3px] pr-[2.8px] border border-gray-300 rounded-[3px] hover:bg-gray-100/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Tutup modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-gray-800">{email}</h2>
              <button
                onClick={onRequestClose}
                className="p-[3px] pr-[2.8px] border border-gray-300 rounded-[3px] hover:bg-gray-100/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Tutup modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">
                  Rp {price.toLocaleString()}
                </span>
              </div>

              <div className="mt-6">
                <table className="w-full text-sm table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2 font-medium text-gray-500">
                        Jumlah
                      </th>
                      <th className="text-left pb-2 font-medium text-gray-500">
                        Produk
                      </th>
                      <th className="text-left pb-2 font-medium text-gray-500">
                        ID Order
                      </th>
                      <th className="text-left pb-2 font-medium text-gray-500">
                        Tanggal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {quantity}
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {productName} Jam
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <Hash className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {orderID}
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {date}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : mode === "edit" ? (
        // Tampilan khusus Edit
        <div
          onClick={(e) => {
            e.stopPropagation(); // Mencegah event klik menyebar ke parent
          }}
        >
          <div className="w-full p-10">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold">Edit Order</h2>
              <button
                onClick={onRequestClose}
                className="p-[3px] pr-[2.8px] border border-gray-300 rounded-[3px] hover:bg-gray-100/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Tutup modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nama Customer
                  </label>
                  <input
                    type="text"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {/* Product ID dan Tanggal */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Produk ID
                  </label>
                  <input
                    type="text"
                    value={orderID}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Nama Produk dan Durasi */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Durasi (Jam)
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Ketersediaan dan Kategori */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nama Produk
                  </label>
                  <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    }}
                  >
                    <option value="Tour">Tour</option>
                    <option value="Activity">Activity</option>
                    <option value="Attraction">Attraction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onRequestClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 text-white rounded-lg gradient-button-blue"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // Tampilan untuk Add
        <div className="w-full p-10">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold">Tambah Order Baru</h2>
            <button
              onClick={onRequestClose}
              className="p-[3px] pr-[2.8px] border border-gray-300 rounded-[3px] hover:bg-gray-100/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Tutup modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Customer</label>
                <input
                  type="text"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  value={orderID}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Jumlah</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Ketersediaan dan Kategori */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nama Produk
                </label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  }}
                >
                  <option value="Tour">Tour</option>
                  <option value="Activity">Activity</option>
                  <option value="Attraction">Attraction</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Total Harga (Rp)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={onRequestClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className={`px-4 py-2 text-white rounded-lg gradient-button-green`}
              >
                Buat Produk
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
