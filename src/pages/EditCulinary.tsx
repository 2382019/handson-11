import React, { useState, useEffect } from 'react';

// Impor tipe dari Culinary.tsx jika perlu, atau definisikan ulang
interface CulinaryItem {
    id: string;
    name: string;
    type: 'Savory' | 'Sweet';
}

// Tipe data yang dikirim saat menyimpan editan
export interface EditedCulinaryData {
    id: string; // Kirim ID asli kembali
    name: string;
    type: 'Savory' | 'Sweet';
}

// Props untuk komponen modal edit
interface EditCulinaryProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: EditedCulinaryData) => void;
    initialData: CulinaryItem; // Data awal untuk diisi ke form
}

const EditCulinary: React.FC<EditCulinaryProps> = ({ isOpen, onClose, onSave, initialData }) => {
    // State internal untuk form, diinisialisasi dari initialData
    const [dishName, setDishName] = useState(initialData.name);
    const [dishType, setDishType] = useState<'Savory' | 'Sweet'>(initialData.type);

    // Reset form jika initialData berubah (penting saat membuka item berbeda)
    useEffect(() => {
        if (initialData) {
            setDishName(initialData.name);
            setDishType(initialData.type);
        }
    }, [initialData]);

    // Handler simpan editan
    const handleSave = () => {
        if (!dishName.trim()) {
            alert('Please enter the name of the dish.');
            return;
        }
        // Kirim data editan beserta ID asli
        onSave({ id: initialData.id, name: dishName.trim(), type: dishType });
        // onClose(); // Biarkan parent yang menutup setelah state update
    };

    if (!isOpen) return null;

    return (
        // Overlay (Sama seperti AddCulinary)
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={onClose}>
            {/* Kontainer Modal (Sama seperti AddCulinary) */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Edit Culinary Item</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close modal">×</button>
                </div>
                {/* Body (Form) */}
                <div className="p-6 space-y-4">
                    {/* Dish Name Input */}
                    <div>
                        <label htmlFor="editDishName" className="block text-sm font-medium text-gray-700 mb-1">Dish Name</label>
                        <input
                            type="text"
                            id="editDishName"
                            value={dishName}
                            onChange={(e) => setDishName(e.target.value)}
                            placeholder="e.g., Ayam Betutu"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            autoFocus
                            required
                        />
                    </div>
                    {/* Dish Type Selection (Radio Buttons) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center">
                                <input id="editTypeSavory" name="editDishType" type="radio" value="Savory" checked={dishType === 'Savory'} onChange={() => setDishType('Savory')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                                <label htmlFor="editTypeSavory" className="ml-2 block text-sm text-gray-900">Savory</label>
                            </div>
                            <div className="flex items-center">
                                <input id="editTypeSweet" name="editDishType" type="radio" value="Sweet" checked={dishType === 'Sweet'} onChange={() => setDishType('Sweet')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                                <label htmlFor="editTypeSweet" className="ml-2 block text-sm text-gray-900">Sweet</label>
                            </div>
                        </div>
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

export default EditCulinary;