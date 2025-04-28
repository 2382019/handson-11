import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Pastikan path ini benar


const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  // --- Event Handlers (Tetap sama) ---
  const handleNext = () => console.log('Next clicked');
  const handlePrevious = () => console.log('Previous clicked');
  const handleCancel = () => console.log('Cancel clicked');
  const handleProfileClick = () => console.log('Profile clicked');
  const handleCloseClick = () => console.log('Close clicked');
  const handleDashboardClick = (e: React.MouseEvent) => { e.preventDefault(); console.log('Dashboard clicked'); }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Gunakan Komponen Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header (Tanpa Ikon) */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shrink-0">
            <div></div> {/* Bagian kiri kosong */}
            <div className="flex items-center space-x-4">
                {/* Link Dashboard */}
                <a
                    href="#"
                    onClick={handleDashboardClick}
                    className="text-blue-600 hover:underline text-sm font-medium"
                >
                    Dashboard
                </a>
                {/* Tombol Profile (Teks) */}
                <button
                    onClick={handleProfileClick}
                    className="px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                    aria-label="User Profile"
                >
                   {/* Ganti dengan Inisial atau Nama User jika tersedia, atau "Profile" */}
                   Profile
                </button>
                 {/* Tombol Close (Simbol Teks) */}
                 <button
                    onClick={handleCloseClick}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl leading-none font-semibold px-1" // Styling untuk 'X'
                    aria-label="Close"
                >
                   × {/* HTML entity untuk simbol 'X' */}
                </button>
            </div>
        </header>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet /> {/* Halaman akan dirender di sini */}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;