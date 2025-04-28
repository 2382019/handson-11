import React, { useState, useEffect } from 'react';

// Tipe data yang akan dikirim saat menyimpan item baru
export interface NewPackingItemData {
  name: string;
}

// Props untuk komponen modal
interface AddPackingProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewPackingItemData) => void;
}

const AddPacking: React.FC<AddPackingProps> = ({ isOpen, onClose, onSave }) => {
  // State internal untuk menyimpan nama item dari input
  const [itemName, setItemName] = useState('');

  // Reset input field saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      setItemName(''); // Kosongkan input setiap kali modal muncul
    }
  }, [isOpen]);

  // Handler untuk tombol simpan
  const handleSave = () => {
    // Validasi sederhana: jangan simpan jika input kosong (setelah trim)
    if (!itemName.trim()) {
      alert('Please enter the name of the packing item.');
      return; // Hentikan fungsi jika tidak valid
    }
    // Panggil fungsi onSave yang diberikan oleh parent, kirim nama item
    onSave({ name: itemName.trim() });
    onClose(); // Tutup modal setelah berhasil menyimpan
  };

  // Jangan render apa pun jika modal tidak seharusnya terbuka
  if (!isOpen) {
    return null;
  }

  // Render struktur modal
  return (
    // Modal Overlay: latar belakang gelap transparan, menutupi layar
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
      onClick={onClose} // Tutup modal jika klik di area overlay
    >
      {/* Modal Content: Kontainer putih di tengah */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Cegah klik di dalam modal menutup modal (event bubbling)
      >
        {/* Modal Header: Judul dan tombol close */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Add New Packing Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close modal"
          >
            × {/* Karakter 'x' */}
          </button>
        </div>

        {/* Modal Body: Form input */}
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="packingItemName" className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              id="packingItemName" // ID untuk label
              value={itemName} // Bind value ke state itemName
              onChange={(e) => setItemName(e.target.value)} // Update state saat input berubah
              placeholder="e.g., Sunscreen, Charger" // Contoh placeholder
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              autoFocus // Otomatis fokus ke input ini saat modal terbuka
              required // Atribut HTML untuk menandakan wajib diisi
            />
          </div>
        </div>

        {/* Modal Footer: Tombol aksi */}
        <div className="flex justify-end items-center p-4 bg-gray-50 border-t border-gray-200 space-x-3">
           {/* Tombol Cancel */}
           <button
            type="button" // Tipe 'button' agar tidak submit form secara default
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
          >
            Cancel
          </button>
          {/* Tombol Add Item (Save) */}
          <button
            type="button" // Tipe 'button'
            onClick={handleSave} // Panggil handler simpan saat diklik
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

// Export komponen dan tipe data
export default AddPacking;