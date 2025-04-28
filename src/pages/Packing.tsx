import React from 'react';

const Packing: React.FC = () => {
    const checklistItems = [
        'paspor', 'tiket pesawat', 'topi pantai', 'oleh-oleh', 'handuk', 'obat-obatan'
    ];

    // Handler for checkbox interaction (implement state logic later)
    const handleCheckboxClick = (item: string) => {
        console.log(`Checkbox clicked for: ${item}`);
    };

    return (
        <div>
            {/* Page Title */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Packing Checklist</h2>
            </div>

            {/* Checklist Content Box */}
            <div className="border border-gray-300 rounded-lg p-6 bg-white min-h-[300px] shadow-sm">
                <ul className="space-y-3">
                    {checklistItems.map((item, index) => (
                        <li key={index} className="flex items-center space-x-3 cursor-pointer group" onClick={() => handleCheckboxClick(item)}>
                            {/* Simple checkbox representation */}
                            <span className="inline-block w-4 h-4 border-2 border-red-600 rounded-sm flex-shrink-0" aria-hidden="true"></span>
                            <span className="text-red-600 group-hover:text-red-800">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Packing;