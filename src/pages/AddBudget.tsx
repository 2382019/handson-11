import React, { useState, useEffect } from 'react';

// Tipe data yang akan dikirim dari modal ini saat menyimpan
export interface NewBudgetData {
  description: string;
  category: string;
  quantity: number; // Akan diparsing dari string
  unitCost: number; // Akan diparsing dari string
}

// Props untuk komponen modal AddBudget
interface AddBudgetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewBudgetData) => void;
}

const AddBudget: React.FC<AddBudgetProps> = ({ isOpen, onClose, onSave }) => {
  // State internal untuk setiap field dalam form
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('1'); // Mulai sbg string, default 1
  const [unitCost, setUnitCost] = useState(''); // Mulai sbg string

  // Reset form fields saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setDescription('');
      setCategory('');
      setQuantity('1'); // Reset ke default
      setUnitCost('');
    }
  }, [isOpen]);

  // Handler untuk tombol simpan
  const handleSave = () => {
    // --- Validasi Input ---
    const trimmedDescription = description.trim();
    const trimmedCategory = category.trim();

    if (!trimmedDescription) {
      alert('Please enter a description.');
      return;
    }
    if (!trimmedCategory) {
      alert('Please enter a category.');
      return;
    }

    // Coba parsing angka, quantity harus minimal 1
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      alert('Please enter a valid quantity (at least 1).');
      return;
    }

    // Coba parsing angka, unit cost harus minimal 0
    const parsedUnitCost = parseFloat(unitCost.replace(/[^0-9.-]+/g,"")); // Hapus format non-numerik jika ada
    if (isNaN(parsedUnitCost) || parsedUnitCost < 0) {
      alert('Please enter a valid unit cost (0 or positive).');
      return;
    }

    // --- Panggil onSave jika valid ---
    onSave({
      description: trimmedDescription,
      category: trimmedCategory,
      quantity: parsedQuantity,
      unitCost: parsedUnitCost,
    });

    onClose(); // Tutup modal setelah berhasil menyimpan
  };

  // Jangan render apapun jika modal tidak terbuka
  if (!isOpen) {
    return null;
  }

  // Render struktur modal
  return (
    // Modal Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
      onClick={onClose} // Tutup jika klik overlay
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Cegah penutupan jika klik di dalam modal
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Add New Budget Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Modal Body (Form) */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Description (full width on small screens) */}
          <div className="sm:col-span-2">
            <label htmlFor="budgetItemDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              id="budgetItemDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Flight Ticket, Hotel Stay"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              autoFocus
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="budgetItemCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            {/* Ganti dengan <select> jika kategori terbatas dan diketahui */}
            <input
              type="text"
              id="budgetItemCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Transportation, Food"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="budgetItemQuantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number" // Gunakan tipe number untuk input keyboard numerik
              id="budgetItemQuantity"
              value={quantity} // Tetap bind ke state string
              onChange={(e) => setQuantity(e.target.value)} // Simpan sebagai string
              min="1" // Validasi minimal di sisi HTML
              placeholder="e.g., 1"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

           {/* Unit Cost */}
          <div className="sm:col-span-2">
            <label htmlFor="budgetItemUnitCost" className="block text-sm font-medium text-gray-700 mb-1">
              Unit Cost (IDR)
            </label>
            <input
              type="text" // Gunakan text agar bisa input format atau koma, parsing dilakukan saat save
              inputMode="decimal" // Petunjuk keyboard mobile
              id="budgetItemUnitCost"
              value={unitCost}
              onChange={(e) => setUnitCost(e.target.value)}
              placeholder="e.g., 550000"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>

        {/* Modal Footer (Actions) */}
        <div className="flex justify-end items-center p-4 bg-gray-50 border-t border-gray-200 space-x-3">
           {/* Tombol Cancel */}
           <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
          >
            Cancel
          </button>
          {/* Tombol Add Item */}
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBudget;