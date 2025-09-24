// App.jsx
import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./components/Dashboard.jsx";

import AddPatient from "./components/Patients/AddPatient.jsx";
import PatientList from "./components/Patients/PatientList.jsx";
import ViewPatient from "./components/Patients/ViewPatient.jsx";

import AddAppointment from "./components/Appointments/AddAppointment.jsx";
import AppointmentList from "./components/Appointments/AppointmentList.jsx";
import ViewAppointment from "./components/Appointments/ViewAppointment.jsx";

import GenerateBill from "./components/Billing/GenerateBill.jsx";
import Login from "./components/Login.jsx";
import ClaimsDashboard from "./components/ClaimsDashboard.jsx";


// ProtectedRoute wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

// Layout with Nav + Footer
function AppLayout({ children }) {
  return (
    <>
      <NavBar>{children}</NavBar>
      <Footer />
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth on load
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuthenticated(auth === "true");
  }, []);

  // Listen for storage changes (login/logout updates)
  useEffect(() => {
    const handleStorageChange = () => {
      const auth = localStorage.getItem("auth");
      setIsAuthenticated(auth === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route → Login */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />

          {/* Protected routes → wrapped in layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          

          <Route
            path="/claimsdashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <ClaimsDashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/add"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <AddPatient />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <PatientList />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <ViewPatient />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments/add"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <AddAppointment />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <AppointmentList />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <ViewAppointment />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/billing"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <GenerateBill />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all → redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
