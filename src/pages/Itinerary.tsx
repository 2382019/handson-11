// Itinerary.tsx
import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import AddItineraryPage from './AddItinerary';
import EditItineraryPage from './EditItinerary';

// --- Interface/Type ---
interface Activity {
  id: string;
  time: 'Morning' | 'Afternoon' | 'Evening';
  location: string;
  description?: string;
}
interface DayPlan {
  day: number;
  activities: Activity[];
}
interface NewActivityData {
  time: 'Morning' | 'Afternoon' | 'Evening';
  placeName: string;
  description: string;
}
interface EditedActivityData {
    id: string;
    time: 'Morning' | 'Afternoon' | 'Evening';
    location: string;
    description?: string;
}

const Itinerary: React.FC = () => {
  // --- State ---
  const [itineraryData, setItineraryData] = useState<DayPlan[]>([
     {
      day: 1,
      activities: [
        { id: 'act1-1', time: 'Morning', location: 'Tanah Lot Temple', description: 'Sunrise view and temple visit.' },
        { id: 'act1-2', time: 'Afternoon', location: 'Ubud Monkey Forest', description: 'Interact with monkeys.' },
        { id: 'act1-3', time: 'Evening', location: 'Jimbaran Bay Seafood', description: 'Dinner on the beach.' }
      ]
    },
    {
      day: 2,
      activities: [
        { id: 'act2-1', time: 'Morning', location: 'Tegalalang Rice Terrace', description: 'Walk through the scenic rice paddies.' },
        { id: 'act2-2', time: 'Afternoon', location: 'Campuhan Ridge Walk', description: 'Easy trek with beautiful views.' },
        { id: 'act2-3', time: 'Evening', location: 'Kecak Dance Performance', description: 'Traditional Balinese dance.' }
      ]
    },
    {
      day: 3,
      activities: [
        { id: 'act3-1', time: 'Morning', location: 'Mount Batur Sunrise Trek', description: 'Early morning hike (optional).' },
        { id: 'act3-2', time: 'Afternoon', location: 'Tirta Empul Temple', description: 'Holy water temple purification.' },
        { id: 'act3-3', time: 'Evening', location: 'Local Warung Dinner', description: 'Try authentic Balinese food.' }
      ]
    }
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDaySelectorOpen, setIsDaySelectorOpen] = useState(false);
  const [targetDayForAddActivity, setTargetDayForAddActivity] = useState<number | null>(null);
  const daySelectorRef = useRef<HTMLDivElement>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<Activity | null>(null);
  const [dayNumberOfActivityToEdit, setDayNumberOfActivityToEdit] = useState<number | null>(null);

  // --- Event Handlers ---
  const handleEditClick = (activity: Activity, dayNumber: number) => {
    setActivityToEdit(activity);
    setDayNumberOfActivityToEdit(dayNumber);
    setIsEditModalOpen(true);
  };

  const handleDeleteActivity = (activityId: string, dayNumber: number, activityLocation: string) => {
    const confirmDelete = window.confirm(
        `Are you sure you want to delete the activity "${activityLocation}"?`
    );

    if (confirmDelete) {
      console.log('Confirmed delete for activity:', activityId, 'from day:', dayNumber);
      setItineraryData(currentData => {
        const dayIndex = currentData.findIndex(d => d.day === dayNumber);
        if (dayIndex === -1) {
          console.error("Day not found for deletion.");
          return currentData;
        }

        const dayToUpdate = { ...currentData[dayIndex] };
        const initialActivityCount = dayToUpdate.activities.length;
        dayToUpdate.activities = dayToUpdate.activities.filter(act => act.id !== activityId);

        if (dayToUpdate.activities.length === initialActivityCount) {
          console.error("Activity ID not found for deletion within the day.");
          return currentData;
        }

        const newData = [...currentData];
        newData[dayIndex] = dayToUpdate;

        alert(`Activity "${activityLocation}" deleted successfully!`);
        return newData;
      });
    } else {
      console.log('Deletion cancelled for activity:', activityId);
    }
  };

  const handleDateSelect = (date: Date | undefined) => setSelectedDate(date);

  const toggleDaySelector = () => {
    if (itineraryData.length === 0 && !isDaySelectorOpen) {
      alert("Please add a day column first before adding activities.");
      return;
    }
    setIsDaySelectorOpen(prev => !prev);
    if (!isDaySelectorOpen) {
      setIsAddModalOpen(false);
      setTargetDayForAddActivity(null);
    }
  };

  const handleDaySelectedForAddActivity = (dayNumber: number) => {
    setTargetDayForAddActivity(dayNumber);
    setIsDaySelectorOpen(false);
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setTargetDayForAddActivity(null);
  };

  const handleAddModalSave = (data: NewActivityData) => {
    if (targetDayForAddActivity === null) return;

    setItineraryData(currentItineraryData => {
      const dayIndex = currentItineraryData.findIndex(d => d.day === targetDayForAddActivity);
      if (dayIndex === -1) return currentItineraryData;

      const dayToUpdate = currentItineraryData[dayIndex];
      const newActivity: Activity = {
        id: `act${dayToUpdate.day}-${Date.now()}`,
        time: data.time,
        location: data.placeName,
        description: data.description || undefined
      };

      const updatedActivities = [...dayToUpdate.activities, newActivity];
      const updatedDayPlan = { ...dayToUpdate, activities: updatedActivities };
      const newData = [...currentItineraryData];
      newData[dayIndex] = updatedDayPlan;
      return newData;
    });

    handleAddModalClose();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setActivityToEdit(null);
    setDayNumberOfActivityToEdit(null);
  };

  const handleEditModalSave = (editedData: EditedActivityData) => {
    if (dayNumberOfActivityToEdit === null) {
      console.error("Cannot save edit: day number is missing.");
      return;
    }

    setItineraryData(currentData => {
      const dayIndex = currentData.findIndex(d => d.day === dayNumberOfActivityToEdit);
      if (dayIndex === -1) {
        console.error("Cannot save edit: Day not found.");
        return currentData;
      }

      const dayToUpdate = { ...currentData[dayIndex] };
      const activityIndex = dayToUpdate.activities.findIndex(act => act.id === editedData.id);
      if (activityIndex === -1) {
        console.error("Cannot save edit: Activity not found.");
        return currentData;
      }

      const updatedActivities = [...dayToUpdate.activities];
      updatedActivities[activityIndex] = {
        ...editedData,
        description: editedData.description || undefined
      };

      dayToUpdate.activities = updatedActivities;
      const newData = [...currentData];
      newData[dayIndex] = dayToUpdate;
      return newData;
    });

    handleEditModalClose();
  };

  const handleAddNewDayColumn = () => {
     setItineraryData(currentData => {
       const nextDayNumber = currentData.length > 0 ? Math.max(...currentData.map(d => d.day)) + 1 : 1;
       if (currentData.some(d => d.day === nextDayNumber)) {
         console.warn(`Day ${nextDayNumber} already exists.`);
         return currentData;
       }
       return [...currentData, { day: nextDayNumber, activities: [] }];
     });
   };

  // --- Effects ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (daySelectorRef.current && !daySelectorRef.current.contains(event.target as Node)) {
        setIsDaySelectorOpen(false);
      }
    };
    if (isDaySelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDaySelectorOpen]);

  // --- JSX Structure ---
  return (
    <>
      <div className="space-y-6 p-4 md:p-6">
        {/* Destination & Calendar Section */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
            <h2 className="text-base font-semibold mb-3 text-gray-700 border-b border-gray-200 pb-2">Destination</h2>
            <img src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Destination" className="w-full h-48 object-cover rounded-md"/>
          </div>
          <div className="w-full md:w-auto p-4 border border-gray-300 rounded-lg bg-white shadow-sm shrink-0 flex justify-center">
              <DayPicker
                mode="single" selected={selectedDate} onSelect={handleDateSelect}
                showOutsideDays fixedWeeks captionLayout="dropdown"
                fromYear={new Date().getFullYear() - 5} toYear={new Date().getFullYear() + 5}
                classNames={{
                    caption_label: 'text-sm font-medium',
                    nav_button: 'h-6 w-6 p-1',
                    head_cell: 'text-xs font-medium text-gray-500 w-8',
                    day: 'h-8 w-8 text-sm',
                    day_selected: 'bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:bg-blue-700',
                    day_today: 'font-bold text-blue-600',
                    day_outside: 'text-gray-400 opacity-50',
                }}
              />
          </div>
        </section>

        {/* Itinerary Details Section */}
        <section className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm relative">
          <h2 className="text-base font-semibold mb-4 text-gray-700 border-b border-gray-200 pb-2">Itinerary</h2>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start pb-8">
            {/* Itinerary Day Columns */}
            {itineraryData.map((dayPlan, dayIndex) => (
              <div key={`day-${dayPlan.day}`} className="w-full md:flex-1 relative pt-1">
                {/* Vertical Timeline Line (Desktop) */}
                {dayIndex < itineraryData.length && (
                    <div className="absolute left-2.5 top-4 bottom-0 w-0.5 bg-gray-200 -z-0 md:block hidden"></div>
                )}
                {/* Day Header */}
                <div className="flex justify-between items-center mb-4 relative">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-700 rounded-full border-2 border-white z-10 flex-shrink-0"></div>
                    <h3 className="font-semibold text-gray-800">Day {dayPlan.day}</h3>
                  </div>
                </div>
                {/* Activities List */}
                <div className="space-y-3 pl-10 relative">
                  {dayPlan.activities.length === 0 && (
                      <p className="text-xs text-gray-500 pl-2 italic">No activities added yet.</p>
                  )}
                  {dayPlan.activities.map((activity) => (
                    <div key={activity.id} className="relative">
                      <div className="absolute left-[-30px] top-3 w-2.5 h-2.5 bg-gray-400 rounded-full border border-white z-10"></div>
                      {/* Activity Card */}
                      <div className="border border-gray-300 rounded-md p-3 bg-white hover:shadow-md transition-shadow duration-150">
                        <div className="flex justify-between items-start gap-2">
                          {/* Activity Details */}
                          <div className="flex-grow">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{activity.time}</p>
                            <p className="text-sm text-gray-800 mt-0.5 font-medium">{activity.location}</p>
                            {activity.description && (
                              <p className="text-xs text-gray-600 mt-1 italic">{activity.description}</p>
                            )}
                          </div>
                          {/* Action Buttons */}
                          <div className="flex space-x-2 text-xs flex-shrink-0 pt-1">
                            <button
                              onClick={() => handleEditClick(activity, dayPlan.day)}
                              className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                              aria-label={`Edit ${activity.location}`}
                              title="Edit"
                            >
                              (Edit)
                            </button>
                            <button
                              onClick={() => handleDeleteActivity(activity.id, dayPlan.day, activity.location)}
                              className="text-red-600 hover:text-red-800 hover:underline focus:outline-none"
                              aria-label={`Delete ${activity.location}`}
                              title="Delete"
                            >
                              (Delete)
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Action Buttons Column */}
            <div className="w-full md:w-auto flex flex-col items-center justify-start gap-4 pt-1 md:pt-1 md:pl-4 mt-4 md:mt-0 relative">
              {/* Add Activity Button & Popover */}
              <div className="relative">
                <button
                  onClick={toggleDaySelector}
                  className="flex flex-col items-center text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg p-2 border border-gray-300 bg-gray-100 hover:bg-gray-200 w-[76px]"
                  aria-haspopup="true"
                  aria-expanded={isDaySelectorOpen}
                  aria-label="Add new activity to a specific day"
                  title="Add Activity"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300 mb-1 font-bold text-xl text-gray-700">+</div>
                  <span className="text-xs font-medium">Add Activity</span>
                </button>
                {/* Day Selector Popover */}
                {isDaySelectorOpen && (
                  <div
                    ref={daySelectorRef}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-36 bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto"
                  >
                    {itineraryData.length > 0 ? (
                      <>
                        <p className="text-xs font-semibold p-2 border-b text-gray-600 text-center">Select Day:</p>
                        <ul>
                          {itineraryData.map((dayPlan) => (
                            <li key={`select-day-${dayPlan.day}`}>
                              <button
                                onClick={() => handleDaySelectedForAddActivity(dayPlan.day)}
                                className="block w-full text-center px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Day {dayPlan.day}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="p-2 text-xs text-gray-500 text-center">Add a day column first.</p>
                    )}
                  </div>
                )}
              </div>
              {/* Add New Day Button */}
              <button
                onClick={handleAddNewDayColumn}
                className="flex flex-col items-center text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg p-2 border border-dashed border-gray-400 hover:bg-gray-50 w-[76px]"
                aria-label="Add a new day column"
                title="Add New Day"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-dashed border-gray-400 mb-1 font-bold text-xl text-gray-500">+</div>
                <span className="text-xs font-medium">Add New Day</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      <AddItineraryPage
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onSave={handleAddModalSave}
        dayNumber={targetDayForAddActivity ?? undefined}
      />
      {activityToEdit && isEditModalOpen && (
        <EditItineraryPage
            isOpen={isEditModalOpen}
            onClose={handleEditModalClose}
            onSave={handleEditModalSave}
            initialData={activityToEdit}
        />
      )}
    </>
  );
};

export default Itinerary;