import React, { useState, useEffect } from 'react';

// Tipe data item packing (asumsi dari Packing.tsx)
interface PackingItem {
    id: string;
    name: string;
    isChecked: boolean;
}

// Tipe data yang dikirim saat menyimpan editan
export interface EditedPackingData {
    id: string; // ID asli untuk identifikasi
    name: string;
}

// Props untuk komponen modal edit
interface EditPackingProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: EditedPackingData) => void;
    initialData: PackingItem; // Data awal item yang diedit
}

const EditPacking: React.FC<EditPackingProps> = ({ isOpen, onClose, onSave, initialData }) => {
    // State internal untuk nama item, diinisialisasi dari data awal
    const [itemName, setItemName] = useState(initialData.name);

    // Reset nama item jika data awal berubah (saat modal dibuka untuk item lain)
    useEffect(() => {
        if (initialData) {
            setItemName(initialData.name);
        }
    }, [initialData]);

    // Handler simpan editan
    const handleSave = () => {
        if (!itemName.trim()) {
            alert('Item name cannot be empty.');
            return;
        }
        // Kirim data editan beserta ID asli
        onSave({ id: initialData.id, name: itemName.trim() });
        // onClose(); // Biarkan parent menutup modal setelah state terupdate
    };

    if (!isOpen) return null; // Jangan render jika modal tertutup

    return (
        // Overlay (Sama seperti AddPacking)
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={onClose}>
            {/* Kontainer Modal (Sama seperti AddPacking) */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Edit Packing Item</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close modal">×</button>
                </div>
                {/* Body (Form) */}
                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="editPackingItemName" className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                        <input
                            type="text"
                            id="editPackingItemName"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            placeholder="e.g., Sunscreen, Charger"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            autoFocus
                            required
                        />
                    </div>
                </div>
                {/* Footer (Actions) */}
                <div className="flex justify-end items-center p-4 bg-gray-50 border-t border-gray-200 space-x-3">
                   <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400">Cancel</button>
                   <button type="button" onClick={handleSave} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditPacking;