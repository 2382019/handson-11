import React from 'react';

// Definisikan tipe data untuk props
interface TravelPlanCardProps {
  imageUrl: string;
  location: string;
  startDate: string; // Atau tipe Date jika Anda memprosesnya
  endDate: string;   // Atau tipe Date
}

// Komponen Kalender Kecil (opsional, bisa pakai karakter biasa)
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const TravelPlanCard: React.FC<TravelPlanCardProps> = ({
  imageUrl,
  location,
  startDate,
  endDate,
}) => {
  // Format tanggal (bisa lebih canggih dengan date-fns jika perlu)
  const formattedStartDate = new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md group cursor-pointer transition-transform duration-200 hover:scale-105">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={`Travel plan for ${location}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-bold mb-1">{location}</h3>
        <p className="text-xs flex items-center gap-1.5 opacity-90">
          <CalendarIcon /> {/* Gunakan ikon atau karakter 📅 */}
          {formattedStartDate} - {formattedEndDate}
        </p>
      </div>
    </div>
  );
};

export default TravelPlanCard;