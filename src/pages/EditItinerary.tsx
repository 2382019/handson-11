// EditItineraryPage.tsx
import React, { useState, useEffect } from 'react';

// --- Interface/Type (Pastikan sama dengan Itinerary.tsx) ---
interface Activity {
  id: string;
  time: 'Morning' | 'Afternoon' | 'Evening';
  location: string;
  description?: string;
}

interface EditedActivityData {
  id: string;
  time: 'Morning' | 'Afternoon' | 'Evening';
  location: string;
  description?: string;
}

interface EditItineraryPageProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditedActivityData) => void;
  initialData: Activity;
}

// --- Placeholder Icons (Pastikan Anda memiliki SVG atau ikon yang sesuai) ---
const MorningIcon = () => <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/></svg></span>;
const AfternoonIcon = () => <span>☀️</span>; // Ganti dengan SVG jika perlu konsistensi
const EveningIcon = () => <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span>;

// --- Komponen Utama ---
const EditItineraryPage: React.FC<EditItineraryPageProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [selectedTime, setSelectedTime] = useState<'Morning' | 'Afternoon' | 'Evening'>(initialData.time);
  const [location, setLocation] = useState(initialData.location);
  const [description, setDescription] = useState(initialData.description || '');

  // Update state internal jika initialData berubah
  useEffect(() => {
    if (initialData) {
      setSelectedTime(initialData.time);
      setLocation(initialData.location);
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSave = () => {
    if (!location.trim()) {
        alert("Location cannot be empty.");
        return;
    }
    onSave({
      id: initialData.id,
      time: selectedTime,
      location: location.trim(),
      description: description.trim(),
    });
    // onClose akan dipanggil di parent setelah state update
  };

  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
      onClick={onClose} // Tutup jika klik di luar
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Cegah penutupan jika klik di dalam
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Edit Activity</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close edit modal"
          >
            × {/* Karakter 'x' untuk tombol close */}
          </button>
        </div>

        {/* Modal Body (Form) */}
        <div className="p-6 space-y-5">

          {/* === PERBAIKAN TAMPILAN DI SINI === */}
          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time of Day</label>
            {/* Gunakan Grid untuk kolom yang sama lebar */}
            <div className="grid grid-cols-3 gap-2"> {/* <-- Menggunakan grid 3 kolom dengan jarak antar kolom */}
              {(['Morning', 'Afternoon', 'Evening'] as const).map((time) => (
                <button
                  key={time}
                  type="button" // Pastikan tipe button agar tidak submit form
                  onClick={() => setSelectedTime(time)}
                  // Hapus 'flex-1', grid akan mengatur lebarnya
                  className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
                    selectedTime === time
                      ? 'bg-blue-100 border-blue-300 text-blue-700' // Style aktif
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50' // Style non-aktif
                  }`}
                >
                  {/* Tampilkan ikon sesuai waktu */}
                  {time === 'Morning' && <MorningIcon />}
                  {time === 'Afternoon' && <AfternoonIcon />}
                  {time === 'Evening' && <EveningIcon />}
                  {/* Tampilkan teks waktu */}
                  {time}
                </button>
              ))}
            </div>
          </div>
          {/* === AKHIR PERBAIKAN TAMPILAN === */}


          {/* Place Name Input */}
          <div>
            <label htmlFor="editPlaceNameModal" className="block text-sm font-medium text-gray-700 mb-1">
              Name of the Place
            </label>
            <input
              type="text"
              id="editPlaceNameModal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Eiffel Tower" // Contoh placeholder
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              autoFocus // Otomatis fokus ke field ini
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="editDescriptionModal" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="editDescriptionModal"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes or details..." // Contoh placeholder
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none" // `resize-none` opsional
            />
          </div>
        </div>

        {/* Modal Footer (Actions) */}
        <div className="flex justify-end items-center p-4 bg-gray-50 border-t border-gray-200 space-x-3">
           <button
            type="button" // Tipe button agar tidak submit form
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="button" // Tipe button agar tidak submit form
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItineraryPage;