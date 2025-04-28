import React from 'react';

interface SelectDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableDays: number[]; // Daftar nomor hari yang bisa dipilih
  onDaySelect: (dayNumber: number) => void; // Fungsi yg dipanggil saat hari dipilih
}

const SelectDayModal: React.FC<SelectDayModalProps> = ({
  isOpen,
  onClose,
  availableDays,
  onDaySelect,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleDayClick = (day: number) => {
    onDaySelect(day); // Panggil callback dengan hari yang dipilih
    onClose(); // Tutup modal ini
  };

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Kontainer Modal */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-md font-semibold text-gray-800">Select Day</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close selection"
          >
            ×
          </button>
        </div>
        {/* Body (List Hari) */}
        <div className="p-4 max-h-60 overflow-y-auto">
          {availableDays.length > 0 ? (
            <ul className="space-y-2">
              {availableDays.map((day) => (
                <li key={day}>
                  <button
                    onClick={() => handleDayClick(day)}
                    className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-blue-400"
                  >
                    Day {day}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 text-center">
              No days available. Add a day column first.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectDayModal;