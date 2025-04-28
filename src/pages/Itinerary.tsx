// src/pages/Itinerary.tsx
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; // Impor CSS default (bisa di-override/custom)
import { format } from 'date-fns'; // Untuk format tanggal

const Itinerary: React.FC = () => {
  // --- Mock Data Itinerary (Tetap) ---
  const itineraryData = [
    { day: 1, activities: [ { time: 'Morning', location: 'Orchid Garden', id: 'act1-1' }, { time: 'Afternoon', location: 'Cimahi', id: 'act1-2' } ] },
    { day: 2, activities: [ { time: 'Afternoon', location: 'Setiabudi', id: 'act2-1' }, { time: 'Evening', location: 'Dago', id: 'act2-2' } ] },
  ];

  // --- Calendar State (Menggunakan react-day-picker) ---
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date()); // Tanggal terpilih, default hari ini

  // --- Event Handlers Itinerary (Tetap) ---
  const handleAddDay = () => console.log('Add Day clicked');
  const handleEditActivity = (activityId: string) => console.log('Edit activity:', activityId);
  const handleDeleteActivity = (activityId: string) => console.log('Delete activity:', activityId);

  // Handler untuk saat tanggal dipilih di DayPicker
  const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date);
      if (date) {
          console.log("Selected Date:", format(date, 'PPP')); // Format tanggal yang lebih mudah dibaca
          // Lakukan aksi lain berdasarkan tanggal yang dipilih
      }
  }

  // Format tanggal terpilih untuk ditampilkan (opsional)
  let selectedDateString = 'Please pick a day.';
  if (selectedDate) {
      selectedDateString = `You picked ${format(selectedDate, 'PPP')}.`; // Contoh format: Sep 14, 2023
  }


  return (
    <div className="space-y-6">
      {/* Destination & Calendar Section */}
      <section className="flex flex-col md:flex-row gap-6">
        {/* Destination Card */}
        <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
          <h2 className="text-base font-semibold mb-3 text-gray-700 border-b border-gray-200 pb-2">Destination</h2>
          <img src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Destination" className="w-full h-48 object-cover rounded-md"/>
           {/* Tampilkan tanggal terpilih (opsional) */}
           {/* <p className="mt-4 text-sm text-gray-600">{selectedDateString}</p> */}
        </div>

        {/* react-day-picker Calendar */}
        <div className="w-full md:w-auto p-4 border border-gray-300 rounded-lg bg-white shadow-sm shrink-0 flex justify-center">
            {/*
               - mode="single": Hanya satu tanggal bisa dipilih
               - selected: State yang menyimpan tanggal terpilih
               - onSelect: Fungsi yang dipanggil saat tanggal dipilih
               - showOutsideDays: Menampilkan tanggal dari bulan sebelum/sesudah
               - fixedWeeks: Membuat kalender selalu menampilkan 6 baris
               - modifiersStyles/classNames: Untuk styling custom (lihat dokumentasi)
            */}
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              showOutsideDays
              fixedWeeks
              // Anda bisa menambahkan props lain sesuai kebutuhan
              // Contoh menambahkan navigasi caption (bulan/tahun)
              captionLayout="dropdown"
              fromYear={new Date().getFullYear() - 5} // Batas tahun minimal dropdown
              toYear={new Date().getFullYear() + 5}   // Batas tahun maksimal dropdown
            />
        </div>
      </section>

      {/* Itinerary Details Section (Tetap Sama) */}
      <section className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm relative">
        {/* ... Konten Itinerary List Anda ... */}
        <h2 className="text-base font-semibold mb-4 text-gray-700 border-b border-gray-200 pb-2">Itinerary</h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start pb-8">
          {itineraryData.map((dayPlan, dayIndex) => (
            <div key={`day-${dayPlan.day}`} className="w-full md:flex-1 relative pt-1">
              {dayIndex < itineraryData.length && (<div className="absolute left-2.5 top-4 bottom-0 w-0.5 bg-gray-200 -z-0"></div>)}
              <div className="flex items-center mb-4 space-x-3 relative">
                <div className="w-5 h-5 bg-gray-700 rounded-full border-2 border-white z-10 flex-shrink-0"></div>
                <h3 className="font-semibold text-gray-800">Day {dayPlan.day}</h3>
              </div>
              <div className="space-y-3 pl-10 relative">
                {dayPlan.activities.map((activity) => (
                  <div key={activity.id} className="relative">
                      <div className="absolute left-[-30px] top-3 w-2.5 h-2.5 bg-gray-400 rounded-full border border-white z-10"></div>
                    <div className="border border-gray-300 rounded-md p-3 bg-white hover:shadow-md transition-shadow duration-150">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{activity.time}</p>
                          <p className="text-sm text-gray-800 mt-0.5">{activity.location}</p>
                        </div>
                        <div className="flex space-x-2 text-xs flex-shrink-0">
                          <button onClick={() => handleEditActivity(activity.id)} className="text-blue-600 hover:underline focus:outline-none" aria-label={`Edit ${activity.location}`}>(Edit)</button>
                          <button onClick={() => handleDeleteActivity(activity.id)} className="text-red-600 hover:underline focus:outline-none" aria-label={`Delete ${activity.location}`}>(Hapus)</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="w-full md:w-auto flex justify-center md:justify-start md:items-start pt-10 md:pt-1 md:pl-4 mt-4 md:mt-0">
              <button onClick={handleAddDay} className="flex flex-col items-center text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg p-2 border border-gray-300 bg-gray-100 hover:bg-gray-200">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300 mb-1 font-bold text-xl">+</div>
                    <span className="text-xs font-medium">Add a day</span>
              </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Itinerary;