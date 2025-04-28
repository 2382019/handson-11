// src/components/EditActivityModal.tsx
import React, { useState, useEffect } from 'react';

// Interface/Type (Impor atau definisikan ulang jika perlu)
interface Activity { id: string; time: string; location: string; description?: string; }
interface UpdatedActivityData { time: string; placeName: string; description: string; } // Data yg dikirim saat save

interface EditActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activityId: string, data: UpdatedActivityData) => void; // Kirim ID dan data baru
  activity: Activity | null; // Aktivitas yang diedit
  dayNumber?: number;
}

// Placeholder Icons (Sama seperti Add modal)
const MorningIcon = () => <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/></svg></span>;
const AfternoonIcon = () => <span>☀️</span>;
const EveningIcon = () => <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span>;


const EditActivityModal: React.FC<EditActivityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  activity,
  dayNumber,
}) => {
  const [selectedTime, setSelectedTime] = useState<'Morning' | 'Afternoon' | 'Evening' | string>('Morning'); // Izinkan string awal
  const [placeName, setPlaceName] = useState('');
  const [description, setDescription] = useState('');

  // Isi form saat modal dibuka atau activity berubah
  useEffect(() => {
    if (isOpen && activity) {
      setSelectedTime(activity.time || 'Morning'); // Default jika time tidak valid
      setPlaceName(activity.location || '');
      setDescription(activity.description || '');
    } else if (!isOpen) {
        // Reset saat ditutup (opsional)
        // setSelectedTime('Morning');
        // setPlaceName('');
        // setDescription('');
    }
  }, [isOpen, activity]);

  const handleSave = () => {
    if (!activity) return; // Jika tidak ada activity yg diedit
    if (!placeName.trim()) {
      alert('Please enter the name of the place.');
      return;
    }
    // Pastikan selectedTime adalah tipe yang benar
    const finalTime = ['Morning', 'Afternoon', 'Evening'].includes(selectedTime)
                        ? selectedTime as 'Morning' | 'Afternoon' | 'Evening'
                        : 'Morning'; // Default jika tidak valid

    onSave(activity.id, { time: finalTime, placeName: placeName.trim(), description: description.trim() });
    onClose();
  };

  if (!isOpen || !activity) { // Jangan render jika tidak terbuka atau tidak ada data activity
    return null;
  }

  return (
    // --- Struktur Modal (Sama seperti AddItineraryPage) ---
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Edit Activity {dayNumber ? `on Day ${dayNumber}` : ''}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close modal">×</button>
        </div>
        {/* Body (Form) */}
        <div className="p-6 space-y-5">
           {/* Time Selection */}
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Time of Day</label>
             <div className="flex space-x-2">
               {(['Morning', 'Afternoon', 'Evening'] as const).map((time) => (
                 <button key={time} onClick={() => setSelectedTime(time)} className={`... ${ selectedTime === time ? 'bg-blue-100 ...' : 'bg-white ...' }`}>
                    {/* ... Ikon dan teks ... */}
                    {time === 'Morning' && <MorningIcon />} {time === 'Afternoon' && <AfternoonIcon />} {time === 'Evening' && <EveningIcon />} {time}
                 </button>
               ))}
             </div>
           </div>
           {/* Place Name */}
           <div>
             <label htmlFor="editPlaceName" className="block text-sm font-medium text-gray-700 mb-1">Name of the Place</label>
             <input type="text" id="editPlaceName" value={placeName} onChange={(e) => setPlaceName(e.target.value)} placeholder="e.g., Tanah Lot Temple" className="block w-full ..."/>
           </div>
           {/* Description */}
           <div>
             <label htmlFor="editDescription" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
             <textarea id="editDescription" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="How would you describe it? Any notes?" className="block w-full ..."/>
           </div>
        </div>
        {/* Footer (Actions) */}
        <div className="flex justify-end items-center p-4 bg-gray-50 border-t border-gray-200 space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 ...">Cancel</button>
            <button type="button" onClick={handleSave} className="px-4 py-2 bg-blue-600 ...">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditActivityModal;