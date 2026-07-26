import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "../auth/pages/LoginPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";

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
              <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
                <div className="w-full max-w-3xl rounded-[32px] bg-white p-10 shadow-[0_30px_60px_rgba(15,23,42,0.12)]">
                  <h1 className="text-3xl font-semibold text-slate-900">Owner Dashboard</h1>
                  <p className="mt-4 text-sm text-slate-600">
                    You are logged in and ready to manage Mahii.
                  </p>
                </div>
              </div>
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
