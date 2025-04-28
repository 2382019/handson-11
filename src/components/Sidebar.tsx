// src/components/Sidebar.tsx (Direkomendasikan pindah ke components)
import { NavLink } from "react-router-dom";
import React, { JSX } from 'react';

interface NavigationItem {
  name: string;
  to: string;
}

const navigation: NavigationItem[] = [
  { name: 'Itinerary Management', to: '/planner/itinerary' },
  { name: "Culinary", to: "/planner/culinary" },
  { name: "Packing Checklist", to: "/planner/packing-checklist" }, // Pastikan path ini konsisten dengan App.tsx
  { name: "Budget", to: "/planner/budget" },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = (): JSX.Element => {
  return (
    <aside className="w-60 flex-shrink-0 bg-white border-r border-gray-200 p-5 flex flex-col">
      {/* Judul Aplikasi di Sidebar */}
      <h1 className="text-xl font-semibold mb-6 text-gray-800">WanderPath</h1>

      {/* Navigasi */}
      <nav className="flex flex-col space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              classNames(
                isActive
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "block rounded-md px-3 py-2 text-sm font-medium" 
              )
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;