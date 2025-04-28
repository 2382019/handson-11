import React from 'react';

const Culinary: React.FC = () => {
    const savoryDishes = ['Ayam Betutu', 'Sate Lilit', 'Nasi Campur'];
    const sweetDishes = ['Smoothies', 'Pie Susu', 'Pia Legong', 'Pisang Rai'];

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center md:text-left">Culinary & Local Cuisine</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-center mb-3 text-gray-700">Savory</h3>
                    <div className="border border-gray-300 rounded-lg p-4 bg-white min-h-[200px] shadow-sm">
                        <ol className="list-decimal list-inside space-y-2 text-gray-800">
                            {savoryDishes.map((dish, index) => (
                                <li key={index}>{dish}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-center mb-3 text-gray-700">Sweet</h3>
                    <div className="border border-gray-300 rounded-lg p-4 bg-white min-h-[200px] shadow-sm">
                        <ol className="list-decimal list-inside space-y-2 text-gray-800">
                            {sweetDishes.map((dish, index) => (
                                <li key={index}>{dish}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Culinary;