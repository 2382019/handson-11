import React from 'react';

const Budget: React.FC = () => {
    const budgetItems = [
        { id: 1, description: 'Banana Inn', category: 'Accommodation', quantity: 3, unitCost: 550000, amount: 1650000 }, // Corrected amount calculation
    ];
    const emptyRowsCount = 6;

    // Placeholder handler for editing a budget item
    const handleEditBudget = (itemId: number) => {
        console.log(`Edit budget item: ${itemId}`);
    };

    // Utility function to format numbers as Indonesian Rupiah
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
    }

    return (
        <div>
             <div className="mb-6">
                 <h2 className="text-2xl font-semibold text-gray-800">Budget Trip</h2>
             </div>

            <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unit Cost</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {budgetItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{item.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{formatNumber(item.unitCost)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">{formatNumber(item.amount)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                    <button onClick={() => handleEditBudget(item.id)} className="text-blue-600 hover:underline focus:outline-none">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* Render empty rows for consistent table height */}
                        {Array.from({ length: Math.max(0, emptyRowsCount - budgetItems.length) }).map((_, index) => (
                            <tr key={`empty-${index}`} className="h-14">
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Budget;