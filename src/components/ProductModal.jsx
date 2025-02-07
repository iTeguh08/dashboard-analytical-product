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

export default function ProductModal({
  isOpen,
  onRequestClose,
  mode,
  product,
  onSubmit,
}) {
  const [productName, setProductName] = useState("");
  const [availability, setAvailability] = useState("Tersedia");
  const [category, setCategory] = useState("Tour");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]); // Menyimpan file-file yang diupload
  const [previewUrls, setPreviewUrls] = useState([]); // Menyimpan URL preview gambar
  const [imageUrl, setImageUrl] = useState("");
  const [productId, setProductId] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedFilesCount, setSelectedFilesCount] = useState(0); // Tambahkan state baru
  const [file, setFile] = useState(null); // Declare setFile
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Generate Product ID untuk mode tambah
  useEffect(() => {
    if (mode === "add") {
      setProductId(`PROD-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === "edit" || mode === "view") {
      // Memuat data produk ke state
      setProductName(product.nama);
      setAvailability(product.ketersediaan);
      setCategory(product.kategori);
      setDate(product.tanggal);
      setRating(product.rating);
      setPrice(product.harga);
      setDescription(product.deskripsi || "");
      setProductId(product.id || "");
      setDuration(product.durasi || "");

      // Memastikan previewUrls selalu berupa array
      if (product.gambar) {
        if (Array.isArray(product.gambar)) {
          setPreviewUrls(product.gambar); // Jika gambar disimpan sebagai array
        } else {
          setPreviewUrls([product.gambar]); // Jika gambar disimpan sebagai single URL
        }
      } else {
        setPreviewUrls([]); // Reset previewUrls jika tidak ada gambar
      }

      setFiles([]); // Reset files
    } else {
      resetForm();
    }
  }, [mode, product]);

  const resetForm = () => {
    setProductName("");
    setAvailability("Tersedia");
    setCategory("Tour");
    setDate("");
    setRating(0);
    setPrice(0);
    setDescription("");
    setFiles([]); // Reset files
    setImageUrl("");
    setPreviewUrls([]); // Reset previewUrls
    setProductId("");
    setDuration("");
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFiles = (selectedFiles) => {
    if (selectedFiles.length === 0) return;

    const newFiles = [...files, ...selectedFiles];
    const newPreviewUrls = [
      ...previewUrls,
      ...Array.from(selectedFiles).map((file) => URL.createObjectURL(file)),
    ];

    setFiles(newFiles);
    setPreviewUrls(newPreviewUrls); // Memperbarui previewUrls
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviewUrls(newPreviewUrls);
    setSelectedFilesCount(newFiles.length);
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreviewUrls(url);
    setFile(null);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Membuat objek produk baru
    const newProduct = {
      id: productId,
      nama: productName,
      ketersediaan: availability,
      kategori: category,
      tanggal: date,
      rating: Number.parseFloat(rating),
      harga: Number.parseFloat(price),
      deskripsi: description,
      gambar: previewUrls, // Kirim semua URL gambar yang ada
      durasi: duration,
    };

    // Panggil onSubmit dengan data produk
    onSubmit(newProduct);

    // Reset form dan tutup modal
    resetForm();
    onRequestClose();
  };

  const handleNext = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === previewUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? previewUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        ...getCustomStyles(mode),
        content: {
          ...getCustomStyles(mode).content,
          height:
            mode === "delete" ? "auto" : mode === "view" ? "auto" : "100vh", // Tambahkan ini
          maxHeight: mode === "view" ? "90vh" : "100vh", // Modifikasi ini
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
              Apakah Anda yakin ingin menghapus produk "{product?.nama}"?
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
                    onClick={handlePrev}
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
                    onClick={handleNext}
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
              <h2 className="text-3xl font-bold text-gray-800">
                {productName}
              </h2>
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
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-gray-600">({rating}/5)</span>
                </div>
              </div>

              <div className="mt-6">
                <table className="w-full text-sm table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2 font-medium text-gray-500">
                        Kategori
                      </th>
                      <th className="text-left pb-2 font-medium text-gray-500">
                        Durasi
                      </th>
                      <th className="text-left pb-2 font-medium text-gray-500">
                        ID Produk
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
                            {category}
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {duration} Jam
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <Hash className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {productId}
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

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Deskripsi
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {description || "Tidak ada deskripsi"}
                </p>
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
              <h2 className="text-xl font-bold">Edit Produk</h2>
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
              {/* Product ID dan Tanggal */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Produk ID
                  </label>
                  <input
                    type="text"
                    value={productId}
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
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Durasi (Jam)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Ketersediaan dan Kategori */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ketersediaan
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full p-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    }}
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Habis">Habis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
              </div>

              {/* Rating dan Harga */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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

              {/* Upload Gambar */}
              <div className="mb-6 w-full">
                <label className="block text-sm font-medium mb-2">
                  Upload Gambar
                </label>
                <div
                  className="w-full h-[220px] flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition duration-300 ease-in-out"
                  onClick={() => document.getElementById("fileInput").click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={(e) => handleFiles(Array.from(e.target.files))}
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-medium text-blue-600 hover:text-blue-500">
                        Klik untuk upload
                      </span>{" "}
                      atau drag and drop
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG up to 5MB
                    </p>
                  </label>
                </div>
                {/* Informasi File yang Dipilih */}
                {previewUrls.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    {previewUrls.length} file{previewUrls.length > 1 ? "s" : ""}{" "}
                    dipilih
                  </div>
                )}
              </div>

              {/* Preview Gambar */}
              {previewUrls.length > 0 && (
                <div className="mt-4 mb-6">
                  <div className="grid grid-cols-3 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Preview ${index}`}
                          className="w-full h-[150px] object-cover rounded-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveImage(index);
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-sm w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deskripsi */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="3"
                />
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
            <h2 className="text-xl font-bold">Tambah Produk Baru</h2>
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
            {/* Product ID dan Tanggal */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Produk ID
                </label>
                <input
                  type="text"
                  value={productId}
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
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Durasi (Jam)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Ketersediaan dan Kategori */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ketersediaan
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full p-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  }}
                >
                  <option value="Tersedia">Tersedia</option>
                  <option value="Habis">Habis</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
            </div>

            {/* Rating dan Harga */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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

            {/* Upload Gambar */}
            <div className="mb-6 w-full">
              <label className="block text-sm font-medium mb-2">
                Upload Gambar
              </label>
              <div
                className="w-full h-[220px] flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition duration-300 ease-in-out"
                onClick={() => document.getElementById("fileInput").click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  onChange={(e) => handleFiles(Array.from(e.target.files))}
                  className="hidden"
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Klik untuk upload
                    </span>{" "}
                    atau drag and drop
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
                </label>
              </div>
              {selectedFilesCount > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {selectedFilesCount} file{selectedFilesCount > 1 ? "s" : ""}{" "}
                  dipilih
                </p>
              )}
            </div>

            {/* Preview Gambar */}
            {previewUrls.length > 0 && (
              <div className="mt-4 mb-6">
                <div className="grid grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        className="w-full h-[150px] object-cover rounded-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-sm w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deskripsi */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Deskripsi
              </label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="3"
              />
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
