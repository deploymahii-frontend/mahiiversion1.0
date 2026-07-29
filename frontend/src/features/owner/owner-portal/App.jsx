import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "../auth/pages/LoginPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";
import OwnerDashboard from "@/modules/shopOwner/pages/OwnerDashboard.jsx";
import OwnerSettings from "@/modules/shopOwner/pages/OwnerSettings.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <OwnerSettings />
            </ProtectedRoute>
          }
        />
        <Route index element={<Navigate to="login" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
