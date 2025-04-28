import React, { useState, useEffect } from 'react';

interface BudgetItem {
    id: string;
    description: string;
    category: string;
    quantity: number;
    unitCost: number;
    amount: number;
}

export interface EditedBudgetData {
    id: string; 
    description: string;
    category: string;
    quantity: number; 
    unitCost: number; 
}

// Props untuk komponen modal edit
interface EditBudgetProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: EditedBudgetData) => void;
    initialData: BudgetItem; // Data awal item yang diedit
}

const EditBudget: React.FC<EditBudgetProps> = ({ isOpen, onClose, onSave, initialData }) => {
    // State internal untuk form, diinisialisasi dari initialData
    const [description, setDescription] = useState(initialData.description);
    const [category, setCategory] = useState(initialData.category);
    // Konversi angka ke string untuk input
    const [quantity, setQuantity] = useState(String(initialData.quantity));
    const [unitCost, setUnitCost] = useState(String(initialData.unitCost));

    // Reset form fields jika initialData berubah (penting jika modal dibuka untuk item berbeda)
    useEffect(() => {
        if (initialData) {
            setDescription(initialData.description);
            setCategory(initialData.category);
            setQuantity(String(initialData.quantity));
            setUnitCost(String(initialData.unitCost));
        }
    }, [initialData]); // Efek ini berjalan saat initialData berubah

    // Handler simpan editan
    const handleSave = () => {
        // --- Validasi Input (sama seperti AddBudget) ---
        const trimmedDescription = description.trim();
        const trimmedCategory = category.trim();
        if (!trimmedDescription || !trimmedCategory) {
            alert('Description and Category cannot be empty.');
            return;
        }
        const parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity) || parsedQuantity < 1) {
            alert('Please enter a valid quantity (at least 1).');
            return;
        }
        const parsedUnitCost = parseFloat(unitCost.replace(/[^0-9.-]+/g,""));
        if (isNaN(parsedUnitCost) || parsedUnitCost < 0) {
            alert('Please enter a valid unit cost (0 or positive).');
            return;
        }

        // --- Panggil onSave dengan ID asli ---
        onSave({
            id: initialData.id, // Sertakan ID asli
            description: trimmedDescription,
            category: trimmedCategory,
            quantity: parsedQuantity,
            unitCost: parsedUnitCost,
        });
        // onClose(); // Biarkan parent (Budget.tsx) yang menutup modal setelah state terupdate
    };

    if (!isOpen) return null; // Jangan render jika modal tertutup

    return (
        // Overlay (Sama seperti AddBudget)
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={onClose}>
            {/* Kontainer Modal (Sama seperti AddBudget) */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Edit Budget Item</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close modal">×</button>
                </div>
                {/* Body (Form) */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Description */}
                    <div className="sm:col-span-2">
                        <label htmlFor="editBudgetItemDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input type="text" id="editBudgetItemDescription" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required autoFocus/>
                    </div>
                    {/* Category */}
                    <div>
                        <label htmlFor="editBudgetItemCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input type="text" id="editBudgetItemCategory" value={category} onChange={(e) => setCategory(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>
                    {/* Quantity */}
                    <div>
                        <label htmlFor="editBudgetItemQuantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input type="number" id="editBudgetItemQuantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
                    </div>
                    {/* Unit Cost */}
                    <div className="sm:col-span-2">
                        <label htmlFor="editBudgetItemUnitCost" className="block text-sm font-medium text-gray-700 mb-1">Unit Cost (IDR)</label>
                        <input type="text" inputMode="decimal" id="editBudgetItemUnitCost" value={unitCost} onChange={(e) => setUnitCost(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
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

export default EditBudget;