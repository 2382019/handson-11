// src/components/ConfirmDeleteModal.tsx
import React from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Fungsi yang dijalankan jika konfirmasi
  itemName: string; // Nama item yang akan dihapus (untuk pesan)
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Kontainer Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 text-center">Confirm Deletion</h2>
        </div>
        {/* Body (Pesan Konfirmasi) */}
        <div className="p-6 text-center">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete the activity: <br />
            <strong className="text-gray-800">{itemName || 'this item'}</strong>?
          </p>
          <p className="text-xs text-red-600 mt-2">This action cannot be undone.</p>
        </div>
        {/* Footer (Aksi) */}
        <div className="flex justify-center items-center p-4 bg-gray-50 border-t border-gray-200 space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => { onConfirm(); onClose(); }} // Panggil konfirmasi lalu tutup
            className="px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;