import React, { useState, useEffect } from 'react';

interface NewActivityData {
  time: 'Morning' | 'Afternoon' | 'Evening';
  placeName: string;
  description: string;
}

interface AddItineraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewActivityData) => void;
  dayNumber?: number; // Untuk menampilkan "Add Activity to Day X"
}

// Placeholder Icons (ganti dengan SVG atau library jika perlu)
const MorningIcon = () => <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/></svg></span>;
const AfternoonIcon = () => <span>☀️</span>;
const EveningIcon = () => <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span>;

// Nama komponen bisa AddItineraryModal atau AddItineraryPage sesuai nama file
const AddItinerary: React.FC<AddItineraryProps> = ({
  isOpen,
  onClose,
  onSave,
  dayNumber,
}) => {
  const [selectedTime, setSelectedTime] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [placeName, setPlaceName] = useState('');
  const [description, setDescription] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedTime('Morning');
      setPlaceName('');
      setDescription('');
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!placeName.trim()) {
      alert('Please enter the name of the place.');
      return;
    }
    onSave({ time: selectedTime, placeName: placeName.trim(), description: description.trim() });
    onClose(); // Close modal after saving
  };

  if (!isOpen) {
    return null; // Don't render anything if modal is closed
  }

  return (
    // Modal Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
      onClick={onClose} // Close on overlay click
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing on content click
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {/* Display day number in title if provided */}
            {dayNumber ? `Add Activity to Day ${dayNumber}` : 'Add New Activity'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Modal Body (Form) */}
        <div className="p-6 space-y-5">
          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time of Day</label>
            <div className="flex space-x-2">
              {(['Morning', 'Afternoon', 'Evening'] as const).map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
                    selectedTime === time
                      ? 'bg-blue-100 border-blue-300 text-blue-700' // Active style
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50' // Inactive style
                  }`}
                >
                  {time === 'Morning' && <MorningIcon />}
                  {time === 'Afternoon' && <AfternoonIcon />}
                  {time === 'Evening' && <EveningIcon />}
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Place Name Input */}
          <div>
            <label htmlFor="placeNameModal" className="block text-sm font-medium text-gray-700 mb-1">
              Name of the Place
            </label>
            <input
              type="text"
              id="placeNameModal" // Use unique ID if needed
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              placeholder="e.g., Tanah Lot Temple"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              autoFocus // Autofocus on this field when modal opens
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="descriptionModal" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              id="descriptionModal" // Use unique ID if needed
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="How would you describe it? Any notes?"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
            />
          </div>
        </div>

        {/* Modal Footer (Actions) */}
        <div className="flex justify-end items-center p-4 bg-gray-50 border-t border-gray-200 space-x-3">
           <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          >
            Save Place
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItinerary; // Export sesuai nama file