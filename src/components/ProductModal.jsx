import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Tag, Clock, Barcode, Calendar, Hash } from 'lucide-react';

const getCustomStyles = (mode) => ({
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: mode === 'view' ? '700px' : '600px', // Increased width for edit mode
    maxHeight: '100vh',
    padding: '0',
    borderRadius: '0',
    overflow: 'hidden',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

  .gradient-button-blue:hover {
    opacity: 0.9;
  }
`;

const scrollableContent = `
  .modal-scrollable {
    max-height: 100vh;
    overflow-y: auto;
    padding: 1rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .modal-scrollable::-webkit-scrollbar {
    display: none;
  }

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

Modal.setAppElement('#root');

export default function ProductModal({
  isOpen,
  onRequestClose,
  mode,
  product,
  onSubmit,
}) {
  const [productName, setProductName] = useState('');
  const [availability, setAvailability] = useState('Tersedia');
  const [category, setCategory] = useState('Tour');
  const [date, setDate] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [productId, setProductId] = useState('');
  const [duration, setDuration] = useState('');

  // Generate Product ID untuk mode tambah
  useEffect(() => {
    if (mode === 'add') {
      setProductId(`PROD-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      setProductName(product.nama);
      setAvailability(product.ketersediaan);
      setCategory(product.kategori);
      setDate(product.tanggal);
      setRating(product.rating);
      setPrice(product.harga);
      setDescription(product.deskripsi || '');
      setImageUrl(product.gambar || '');
      setPreviewUrl('');
      setProductId(product.id || '');
      setDuration(product.durasi || '');
    } else {
      resetForm();
    }
  }, [mode, product]);

  const resetForm = () => {
    setProductName('');
    setAvailability('Tersedia');
    setCategory('Tour');
    setDate('');
    setRating(0);
    setPrice(0);
    setDescription('');
    setFile(null);
    setImageUrl('');
    setPreviewUrl('');
    setDuration('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setImageUrl('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      setImageUrl('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreviewUrl(url);
    setFile(null);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: productId,
      nama: productName,
      ketersediaan: availability,
      kategori: category,
      tanggal: date,
      rating: Number.parseFloat(rating),
      harga: Number.parseFloat(price),
      deskripsi: description,
      gambar: imageUrl || previewUrl,
      durasi: duration,
    };
    onSubmit(newProduct);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={getCustomStyles(mode)}
      contentLabel={`${mode} Produk Modal`}
    >
      <style>{gradientStyles}</style>
      <style>{scrollableContent}</style>

      {mode === 'view' ? (
        // Tampilan khusus View
        <div className="flex flex-col md:flex-row" style={{ border: 'none' }}>
          {/* Bagian Gambar */}
          <div className="w-full md:w-2/5 p-4 flex items-center justify-center">
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={productName}
              className="object-cover w-full h-64 md:h-full rounded-lg shadow-md"
            />
          </div>

          {/* Bagian Detail */}
          <div className="w-full md:w-3/5 p-6 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
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
                <span className="text-2xl font-bold text-blue-600">
                  Rp {price.toLocaleString()}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < rating ? 'text-yellow-400' : 'text-gray-300'
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
                  {description || 'Tidak ada deskripsi'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : mode === 'edit' ? (
        // Tampilan khusus Edit
        <div
          className="modal-scrollable flex"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full p-6">
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
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Upload Gambar
                </label>
                <div className="flex gap-4">
                  {/* Image Preview */}
                  <div className="w-1/2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={previewUrl || imageUrl || '/placeholder.svg'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Upload Area */}
                  <div
                    className="w-1/2 flex justify-center items-center px-6 pt-5 pb-6 border border-gray-300 border-dashed rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <span className="text-blue-600 hover:text-blue-500">
                            Klik untuk upload
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG maksimal 5MB
                        </p>
                      </div>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

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
        <div className="modal-scrollable" onClick={(e) => e.stopPropagation()}>
          <div className="w-full p-6">
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
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Upload Gambar
                </label>
                <div
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border border-gray-300 border-dashed rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <label className="cursor-pointer w-full h-full">
                    <div className="space-y-1 text-center">
                      {previewUrl ? (
                        <img
                          src={previewUrl || '/placeholder.svg'}
                          alt="Preview"
                          className="mx-auto h-32 w-32 object-cover rounded-lg"
                        />
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600 justify-center">
                            <span className="text-blue-600 hover:text-blue-500">
                              Klik untuk upload
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG maksimal 5MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

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
                  className={`px-4 py-2 text-white rounded-lg ${
                    mode === 'add'
                      ? 'gradient-button-green'
                      : 'gradient-button-blue'
                  }`}
                >
                  {mode === 'add' ? 'Buat Produk' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Modal>
  );
}
