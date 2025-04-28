import React, { useState } from 'react';
import AddCulinary, { NewCulinaryData } from './AddCulinary';
import EditCulinary, { EditedCulinaryData } from './EditCulinary'; // <-- Impor Modal Edit

// --- Interface untuk Item Kuliner ---
interface CulinaryItem {
    id: string;
    name: string;
    type: 'Savory' | 'Sweet';
}

const Culinary: React.FC = () => {
    // --- Gunakan State dengan Struktur Data Baru ---
    const [savoryDishes, setSavoryDishes] = useState<CulinaryItem[]>([
        { id: 'sav-1', name: 'Ayam Betutu', type: 'Savory' },
        { id: 'sav-2', name: 'Sate Lilit', type: 'Savory' },
        { id: 'sav-3', name: 'Nasi Campur', type: 'Savory' }
    ]);
    const [sweetDishes, setSweetDishes] = useState<CulinaryItem[]>([
        { id: 'swt-1', name: 'Smoothies', type: 'Sweet' },
        { id: 'swt-2', name: 'Pie Susu', type: 'Sweet' },
        { id: 'swt-3', name: 'Pia Legong', type: 'Sweet' },
        { id: 'swt-4', name: 'Pisang Rai', type: 'Sweet' }
    ]);

    // --- State untuk Modal Add ---
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // --- State untuk Modal Edit ---
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [dishToEdit, setDishToEdit] = useState<CulinaryItem | null>(null);

    // --- Handlers Modal Add ---
    const handleOpenAddModal = () => setIsAddModalOpen(true);
    const handleCloseAddModal = () => setIsAddModalOpen(false);
    const handleAddSave = (data: NewCulinaryData) => {
        console.log('Saving new dish:', data);
        const newItem: CulinaryItem = {
            id: `${data.type.toLowerCase()}-${Date.now()}`, // Buat ID unik sederhana
            name: data.name,
            type: data.type
        };
        if (data.type === 'Savory') {
            setSavoryDishes(prev => [...prev, newItem]);
        } else {
            setSweetDishes(prev => [...prev, newItem]);
        }
        // Modal Add ditutup oleh dirinya sendiri (onClose di handleSave-nya)
    };

    // --- Handlers Modal Edit ---
    const handleOpenEditModal = (dish: CulinaryItem) => {
        setDishToEdit(dish); // Simpan data dish yang akan diedit
        setIsEditModalOpen(true); // Buka modal edit
    };
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setDishToEdit(null); // Reset data dish yang diedit
    };
    const handleEditSave = (editedData: EditedCulinaryData) => {
        console.log('Saving edited dish:', editedData);
        const { id, name, type } = editedData;

        // Cari tahu tipe asli dari state dishToEdit (sebelum diedit)
        const originalType = dishToEdit?.type;

        if (!originalType) {
             console.error("Could not determine the original type of the dish being edited.");
             handleCloseEditModal();
             return;
         }

        // 1. Update item di array yang sesuai (jika tipe tidak berubah)
        // 2. Atau hapus dari array lama & tambah ke array baru (jika tipe berubah)

        if (originalType === type) {
            // Tipe tidak berubah, update di array yang sama
            if (type === 'Savory') {
                setSavoryDishes(prev => prev.map(dish => dish.id === id ? { ...dish, name: name } : dish));
            } else {
                setSweetDishes(prev => prev.map(dish => dish.id === id ? { ...dish, name: name } : dish));
            }
        } else {
            // Tipe berubah
            const updatedItem = { id, name, type }; // Item dengan data baru

            // Hapus dari array lama
            if (originalType === 'Savory') {
                setSavoryDishes(prev => prev.filter(dish => dish.id !== id));
            } else {
                setSweetDishes(prev => prev.filter(dish => dish.id !== id));
            }

            // Tambah ke array baru
            if (type === 'Savory') {
                setSavoryDishes(prev => [...prev, updatedItem]);
            } else {
                setSweetDishes(prev => [...prev, updatedItem]);
            }
        }

        handleCloseEditModal(); // Tutup modal setelah update
    };

    // --- Handler Delete ---
    const handleDeleteDish = (id: string, type: 'Savory' | 'Sweet', name: string) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
        if (confirmDelete) {
            console.log(`Deleting dish: ${id} (${type})`);
            if (type === 'Savory') {
                setSavoryDishes(prev => prev.filter(dish => dish.id !== id));
            } else {
                setSweetDishes(prev => prev.filter(dish => dish.id !== id));
            }
            alert(`"${name}" deleted successfully!`);
        }
    };

    return (
        <>
            <div>
                {/* Header Halaman */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Culinary & Local Cuisine</h2>
                    <button
                        onClick={handleOpenAddModal} // Buka modal add
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        + Add Dish
                    </button>
                </div>

                {/* Konten Kolom */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Kolom Savory */}
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-center mb-3 text-gray-700">Savory</h3>
                        <div className="border border-gray-300 rounded-lg p-4 bg-white min-h-[200px] shadow-sm">
                            {savoryDishes.length > 0 ? (
                                <ol className="list-decimal list-inside space-y-2 text-gray-800">
                                    {savoryDishes.map((dish) => (
                                        <li key={dish.id} className="flex justify-between items-center group">
                                            <span>{dish.name}</span>
                                            {/* Tombol Edit/Delete (muncul saat hover atau selalu) */}
                                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                                <button
                                                    onClick={() => handleOpenEditModal(dish)} // Buka modal edit
                                                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                                                    title="Edit"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDish(dish.id, dish.type, dish.name)} // Panggil delete
                                                    className="text-xs text-red-600 hover:text-red-800 hover:underline"
                                                    title="Delete"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="text-sm text-gray-500 italic text-center pt-4">No savory dishes added yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Kolom Sweet */}
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-center mb-3 text-gray-700">Sweet</h3>
                        <div className="border border-gray-300 rounded-lg p-4 bg-white min-h-[200px] shadow-sm">
                             {sweetDishes.length > 0 ? (
                                <ol className="list-decimal list-inside space-y-2 text-gray-800">
                                    {sweetDishes.map((dish) => (
                                        <li key={dish.id} className="flex justify-between items-center group">
                                            <span>{dish.name}</span>
                                            {/* Tombol Edit/Delete */}
                                             <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                                <button
                                                    onClick={() => handleOpenEditModal(dish)}
                                                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                                                    title="Edit"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDish(dish.id, dish.type, dish.name)}
                                                    className="text-xs text-red-600 hover:text-red-800 hover:underline"
                                                    title="Delete"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="text-sm text-gray-500 italic text-center pt-4">No sweet dishes added yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Modal AddCulinary */}
            <AddCulinary
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal} // Gunakan handler close yang benar
                onSave={handleAddSave}      // Gunakan handler save yang benar
            />

            {/* Render Modal EditCulinary (Hanya jika ada data & modal terbuka) */}
            {dishToEdit && isEditModalOpen && (
                <EditCulinary
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    onSave={handleEditSave}
                    initialData={dishToEdit}
                />
            )}
        </>
    );
};

export default Culinary;