// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate
} from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import BaseLayout from "./layouts/BaseLayout";

// Pages
import Home from "./pages/Home";
import Itinerary from "./pages/Itinerary";
import Culinary from "./pages/Culinary";
import Packing from "./pages/Packing";
import Budget from "./pages/Budget";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Providers
import { AuthProvider } from "./utils/AuthProvider"; // Ensure this path is correct

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />

        {/* Planner routes wrapped in MainLayout (includes Sidebar) */}
        <Route path="/planner" element={<MainLayout />}>
           <Route index element={<Navigate to="itinerary" replace />} />
           <Route path="itinerary" element={<Itinerary />} />
           <Route path="culinary" element={<Culinary />} />
           <Route path="packing-checklist" element={<Packing />} />
           <Route path="budget" element={<Budget />} />
        </Route>

        {/* Authentication routes (optional, using BaseLayout) */}
        <Route path="/auth" element={<BaseLayout/>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}

      </Route>
    )
  );

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;