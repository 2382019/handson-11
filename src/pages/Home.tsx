// src/pages/Home.tsx
import React, { useState } from 'react';
import TravelPlanCard from '../components/TravelPlanCard'; // Sesuaikan path jika perlu

// Komponen ikon sederhana (bisa diganti SVG jika mau)
const SearchIcon = () => <span className="text-gray-400">🔍</span>;
const CreateIcon = () => <span className="mr-1">➕</span>; // Atau ikon bangunan 🏢

const Home: React.FC = () => {
  const [travelPlans, setTravelPlans] = useState([
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=800&auto=format&fit=crop', location: 'Bali, Indonesia', startDate: '2025-05-05', endDate: '2025-05-09' },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop', location: 'Lake Como, Italy', startDate: '2025-06-10', endDate: '2025-06-17' },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop', location: 'Kyoto, Japan', startDate: '2025-09-20', endDate: '2025-09-28' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Implementasi logika filter jika diperlukan
  };

  const handleCreatePlan = () => {
    console.log("Create Travel Plan button clicked");
    // Implementasi aksi (misalnya buka modal atau navigasi)
  };

  // Filter plans berdasarkan search term (contoh sederhana)
  const filteredPlans = travelPlans.filter(plan =>
    plan.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Kontainer utama halaman Home
    <div className="p-4 md:p-6 space-y-6">

      {/* Search Bar dan Create Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-2/3 lg:w-1/2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search Travel Plan..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <button
          onClick={handleCreatePlan}
          className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
        >
          <CreateIcon /> Create Travel Plan
        </button>
      </div>

      {/* Grid Travel Plans */}
      {filteredPlans.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlans.map(plan => (
              <TravelPlanCard
                key={plan.id}
                imageUrl={plan.imageUrl}
                location={plan.location}
                startDate={plan.startDate}
                endDate={plan.endDate}
              />
            ))}
          </div>
       ) : (
        <p className="text-center text-gray-500 mt-10">No travel plans found matching your search.</p>
       )}

       {/* Placeholder jika tidak ada plan sama sekali */}
       {travelPlans.length === 0 && (
           <p className="text-center text-gray-500 mt-10">You haven't created any travel plans yet. Start by clicking "Create Travel Plan".</p>
       )}

    </div>
  );
};

export default Home;