import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tag, Clock, Calendar, Hash, AlertTriangle } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

function OrderModal({ isOpen, onRequestClose, mode, order, onSubmit, products }) {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (mode === "add") {
      const newOrderId = `ORD${Math.floor(100 + Math.random() * 999)}`;
      setOrderId(newOrderId);
    }
  }, [mode]);

  const initialValues = {
    custName: order?.customer || "",
    email: order?.email || "",
    productName: order?.produk || (products.length > 0 ? products[0].nama : ""),
    quantity: order?.jumlah || 0,
    price: order?.totalHarga || 0,
    status: order?.status || "Sukses",
    date: order?.tanggal || "",
  };

  const validationSchema = Yup.object().shape({
    custName: Yup.string().required("Nama customer harus diisi"),
    email: Yup.string().email("Email tidak valid").required("Email harus diisi"),
    productName: Yup.string().required("Nama produk harus dipilih"),
    quantity: Yup.number().min(1, "Jumlah harus lebih dari 0").required("Jumlah harus diisi"),
    price: Yup.number().min(1, "Harga harus lebih dari 0").required("Harga harus diisi"),
    status: Yup.string().required("Status harus dipilih"),
    date: Yup.date().required("Tanggal harus diisi"),
  });

  const handleSubmit = (values) => {
    const newOrder = {
      orderId: orderId,
      customer: values.custName,
      email: values.email,
      produk: values.productName,
      jumlah: values.quantity,
      totalHarga: values.price,
      status: values.status,
      tanggal: values.date,
    };
    onSubmit(newOrder);
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
              Apakah Anda yakin ingin menghapus order customer dari "{order.customer}"?
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
          {order?.gambar && order.gambar.length > 0 ? (
            <div className="relative w-full md:w-2/5 p-4 flex items-center justify-center">
              <img
                src={order.gambar[0]} // Ambil gambar pertama dari array `gambar`
                alt={`Preview ${order.nama}`}
                className="w-full h-[300px] object-cover rounded-lg shadow-md"
              />
            </div>
          ) : (
            <p>Tidak ada gambar tersedia.</p>
          )}

          {/* Bagian Detail */}
          <div className="w-full md:w-3/5 p-6 pl-2 overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-gray-800">{initialValues.productName}</h2>
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
            <h2 className="text-sm text-gray-500 mb-2">Customer contact information</h2>
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-800">{initialValues.custName}</h2>
            </div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold text-gray-600">{initialValues.email}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">
                  Rp {initialValues.price.toLocaleString()}
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
                        ID Order
                      </th>
                      <th className="text-left pb-2 font-medium text-gray-500">
                        Tanggal
                      </th>
                      <th className="text-left pb-2 font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">
                            {initialValues.quantity}
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {orderId}
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">
                            {initialValues.date}
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              initialValues.status === "Sukses"
                                ? "bg-green-100 text-green-600"
                                : initialValues.status === "Batal"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {initialValues.status}
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
      ) : (
        // Form untuk Add dan Edit
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full p-10">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-bold">{mode === "edit" ? "Edit Order" : "Tambah Order Baru"}</h2>
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

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nama Customer
                  </label>
                  <Field
                    type="text"
                    name="custName"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="custName" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Order ID
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tanggal
                  </label>
                  <Field
                    type="date"
                    name="date"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Field
                    as="select"
                    name="status"
                    className="w-full p-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    }}
                  >
                    <option value="Sukses">Sukses</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Batal">Batal</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Jumlah</label>
                  <Field
                    type="number"
                    name="quantity"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nama Produk
                  </label>
                  <Field
                    as="select"
                    name="productName"
                    className="w-full p-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                    }}
                  >
                    {products.map((product) => (
                      <option key={product.id} value={product.nama}>
                      {product.nama}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="productName" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Total Harga (Rp)
                </label>
                <Field
                  type="number"
                  name="price"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
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
                className={`px-4 py-2 text-white rounded-lg ${mode === "edit" ? "gradient-button-blue" : "gradient-button-green"}`}
                disabled={isSubmitting}
              >
                {mode === "edit" ? "Simpan Perubahan" : "Buat Produk"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    )}
  </Modal>
);
}

export default OrderModal;