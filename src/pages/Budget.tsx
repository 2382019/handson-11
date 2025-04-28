// Budget.tsx (Diperbarui untuk Edit/Delete Aktif)
import React, { useState } from 'react';
import AddBudget, { NewBudgetData } from './AddBudget';
import EditBudget, { EditedBudgetData } from './EditBudget'; // <-- Impor modal Edit

// Interface untuk struktur data item budget di state
interface BudgetItem {
    id: string;
    description: string;
    category: string;
    quantity: number;
    unitCost: number;
    amount: number;
}

// Interface dari EditBudget tidak perlu lagi di sini jika sudah diimpor

const Budget: React.FC = () => {
    // --- State untuk data budget ---
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
        { id: 'budget-1', description: 'Banana Inn', category: 'Accommodation', quantity: 3, unitCost: 550000, amount: 1650000 },
        { id: 'budget-2', description: 'Rental Mobil', category: 'Transportation', quantity: 4, unitCost: 300000, amount: 1200000 },
    ]);
    const emptyRowsCount = 6;

    // --- State untuk Modals ---
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<BudgetItem | null>(null);


    // --- Handlers ---

    // Buka Modal Add
    const handleOpenAddModal = () => setIsAddModalOpen(true);
    // Tutup Modal Add
    const handleCloseAddModal = () => setIsAddModalOpen(false);
    // Simpan dari Modal Add
    const handleAddSave = (data: NewBudgetData) => {
        const newAmount = data.quantity * data.unitCost;
        const newItem: BudgetItem = {
            id: `budget-${Date.now()}`,
            ...data,
            amount: newAmount,
        };
        setBudgetItems(prevItems => [...prevItems, newItem]);
    };

    // Buka Modal Edit
    const handleOpenEditModal = (item: BudgetItem) => {
        setItemToEdit(item);
        setIsEditModalOpen(true);
    };
    // Tutup Modal Edit
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setItemToEdit(null);
    };
    // Simpan dari Modal Edit
    const handleEditSave = (editedData: EditedBudgetData) => {
         const newAmount = editedData.quantity * editedData.unitCost;
         setBudgetItems(prevItems =>
             prevItems.map(item =>
                 item.id === editedData.id
                     ? { // Membuat objek baru untuk item yang diedit
                         id: item.id, // Pertahankan ID asli
                         description: editedData.description,
                         category: editedData.category,
                         quantity: editedData.quantity,
                         unitCost: editedData.unitCost,
                         amount: newAmount, // Amount yang sudah dihitung ulang
                       }
                     : item // Kembalikan item asli jika ID tidak cocok
             )
         );
         handleCloseEditModal(); // Tutup modal setelah state diupdate
    };

    // Hapus Item Budget
    const handleDeleteBudget = (itemId: string, description: string) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${description}"?`);
        if (confirmDelete) {
            setBudgetItems(prevItems => prevItems.filter(item => item.id !== itemId));
            alert(`"${description}" deleted successfully!`);
        }
    };

    // Utility format angka
    const formatNumber = (num: number): string => {
        if (isNaN(num) || typeof num !== 'number') return 'Invalid Number';
        try {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
        } catch (error) {
            console.error("Formatting error:", error);
            return 'Error';
        }
    }

    return (
        <>
            <div>
                 {/* Header */}
                 <div className="flex justify-between items-center mb-6">
                     <h2 className="text-2xl font-semibold text-gray-800">Budget Trip</h2>
                     <button onClick={handleOpenAddModal} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                         + Add Budget Item
                     </button>
                 </div>

                {/* Tabel Budget */}
                <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Unit Cost</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* Render baris data */}
                            {budgetItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{item.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{formatNumber(item.unitCost)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right font-medium">{formatNumber(item.amount)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        {/* --- AKTIFKAN TOMBOL --- */}
                                        <button
                                            onClick={() => handleOpenEditModal(item)} // Panggil buka modal Edit
                                            className="text-blue-600 hover:underline focus:outline-none mr-3"
                                            title="Edit"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBudget(item.id, item.description)} // Panggil fungsi delete
                                            className="text-red-600 hover:underline focus:outline-none"
                                            title="Delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {/* Render baris kosong */}
                            {Array.from({ length: Math.max(0, emptyRowsCount - budgetItems.length) }).map((_, index) => (
                                <tr key={`empty-${index}`} className="h-14">
                                    <td className="px-6 py-4"></td> <td className="px-6 py-4"></td> <td className="px-6 py-4"></td>
                                    <td className="px-6 py-4"></td> <td className="px-6 py-4"></td> <td className="px-6 py-4"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

             {/* Render Modal Add */}
            <AddBudget
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onSave={handleAddSave}
            />

            {/* --- AKTIFKAN RENDER MODAL EDIT --- */}
            {itemToEdit && isEditModalOpen && (
                <EditBudget
                    isOpen={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    onSave={handleEditSave}
                    initialData={itemToEdit}
                />
            )}
        </>
    );
};

export default Budget;