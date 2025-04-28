import React, { useState } from 'react';
import AddPacking, { NewPackingItemData } from './AddPacking'; 
import EditPacking, { EditedPackingData } from './EditPacking'; // Impor modal Edit

// Interface untuk struktur data item packing
interface PackingItem {
    id: string;
    name: string;
    isChecked: boolean;
}

const Packing: React.FC = () => {
    // --- State untuk Checklist Items ---
    const [checklistItems, setChecklistItems] = useState<PackingItem[]>([
        // Contoh data awal dengan struktur baru
        { id: 'item-1', name: 'Paspor', isChecked: false },
        { id: 'item-2', name: 'Tiket Pesawat', isChecked: false },
        { id: 'item-3', name: 'Topi Pantai', isChecked: true }, // Contoh item sudah dicek
        { id: 'item-4', name: 'Oleh-oleh', isChecked: false },
        { id: 'item-5', name: 'Handuk', isChecked: false },
        { id: 'item-6', name: 'Obat-obatan', isChecked: true },
    ]);

    // --- State untuk Modals ---
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<PackingItem | null>(null);

    // --- Handlers ---

    // Toggle status checked item
    const handleToggleCheck = (id: string) => {
        setChecklistItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    };

    // Membuka modal Add
    const handleOpenAddModal = () => setIsAddModalOpen(true);
    // Menutup modal Add
    const handleCloseAddModal = () => setIsAddModalOpen(false);
    // Menyimpan item baru dari modal Add
    const handleAddSave = (data: NewPackingItemData) => {
        const newItem: PackingItem = {
            id: `item-${Date.now()}`, // ID unik sederhana
            name: data.name,
            isChecked: false, // Item baru defaultnya belum dicek
        };
        setChecklistItems(prevItems => [...prevItems, newItem]);
        // Modal Add akan menutup dirinya sendiri
    };

    // Membuka modal Edit
    const handleOpenEditModal = (item: PackingItem) => {
        setItemToEdit(item);
        setIsEditModalOpen(true);
    };
    // Menutup modal Edit
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setItemToEdit(null);
    };
    // Menyimpan perubahan dari modal Edit
    const handleEditSave = (editedData: EditedPackingData) => {
        setChecklistItems(prevItems =>
            prevItems.map(item =>
                item.id === editedData.id ? { ...item, name: editedData.name } : item
            )
        );
        handleCloseEditModal(); // Tutup modal setelah menyimpan
    };

    // Menghapus item
    const handleDeleteItem = (id: string, name: string) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
        if (confirmDelete) {
            setChecklistItems(prevItems => prevItems.filter(item => item.id !== id));
            alert(`"${name}" deleted successfully!`);
        }
    };

    // --- JSX Render ---
    return (
        <> {/* Fragment agar modal bisa di luar div utama */}
            <div>
                {/* Page Title & Tombol Add Item */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Packing Checklist</h2>
                    <button
                        onClick={handleOpenAddModal}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        + Add Item
                    </button>
                </div>

                {/* Checklist Content Box */}
                <div className="border border-gray-300 rounded-lg p-6 bg-white min-h-[300px] shadow-sm">
                    {checklistItems.length > 0 ? (
                        <ul className="space-y-3">
                            {checklistItems.map((item) => (
                                <li key={item.id} className="flex items-center justify-between group">
                                    {/* Checkbox dan Nama Item */}
                                    <div className="flex items-center space-x-3 flex-grow cursor-pointer" onClick={() => handleToggleCheck(item.id)}>
                                        <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            onChange={() => handleToggleCheck(item.id)} // onChange juga memanggil toggle
                                            className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500 flex-shrink-0"
                                            aria-labelledby={`item-label-${item.id}`}
                                        />
                                        <span
                                            id={`item-label-${item.id}`}
                                            className={` ${
                                                item.isChecked
                                                    ? 'text-gray-500 line-through' // Style jika sudah dicek
                                                    : 'text-gray-800' // Style jika belum dicek
                                            }`}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                    {/* Tombol Edit & Delete */}
                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 ml-4">
                                         <button
                                            onClick={() => handleOpenEditModal(item)}
                                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                                            title="Edit"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(item.id, item.name)}
                                            className="text-xs text-red-600 hover:text-red-800 hover:underline"
                                            title="Delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                         <p className="text-sm text-gray-500 italic text-center pt-4">Checklist is empty. Add some items!</p>
                    )}
                </div>
            </div>

            {/* Render Modal AddPacking */}
            <AddPacking
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onSave={handleAddSave}
            />

            {/* Render Modal EditPacking (Hanya jika ada data & modal terbuka) */}
            {itemToEdit && isEditModalOpen && (
                <EditPacking
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    onSave={handleEditSave}
                    initialData={itemToEdit}
                />
            )}
        </>
    );
};

export default Packing;