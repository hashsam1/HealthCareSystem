import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaUserInjured,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaSignInAlt,
} from "react-icons/fa";
import { useAuth } from "../AuthContext";


export default function NavBar({ children, darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (menu) =>
    setOpenMenu(openMenu === menu ? null : menu);

  const { logout } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, []);

  const handleLogout = () => {
    logout()
    navigate("/"); //back to login
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-r from-teal-600 to-blue-600 text-white w-64 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-64"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-700 h-20">
          <h2 className="text-lg font-bold">HealthCare System</h2>
          <button onClick={toggleSidebar} className="text-xl">
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/dashboard"
            className="block py-2 px-3 rounded hover:bg-blue-700"
            onClick={toggleSidebar}
          >
            Dashboard
          </Link>
          <Link
            to="/claimsdashboard"
            className="block py-2 px-3 rounded hover:bg-blue-700"
            onClick={toggleSidebar}
          >
            Claim Dashboard
          </Link>

          {/* Patients */}
          <div>
            <button
              className="flex items-center justify-between w-full py-2 px-3 rounded hover:bg-blue-700"
              onClick={() => toggleSubmenu("patients")}
            >
              <span className="flex items-center gap-2">
                <FaUserInjured /> Patients
              </span>
              <span>{openMenu === "patients" ? "▲" : "▼"}</span>
            </button>
            {openMenu === "patients" && (
              <div className="ml-6 mt-1 space-y-1">
                {isAdmin ? (
                  <>
                    <Link to="/patients" onClick={toggleSidebar} className="block py-1 px-2 rounded hover:bg-blue-700">
                      List Patients
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/patients/add" onClick={toggleSidebar} className="block py-1 px-2 rounded hover:bg-blue-700">
                      Add Details
                    </Link>
                    <Link to={`/patients/${localStorage.getItem("patientId")}`} onClick={toggleSidebar} className="block py-1 px-2 rounded hover:bg-blue-700">
                      Patient Details
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Appointments */}
          <div>
            <button
              className="flex items-center justify-between w-full py-2 px-3 rounded hover:bg-blue-700"
              onClick={() => toggleSubmenu("appointments")}
            >
              <span className="flex items-center gap-2">
                <FaCalendarCheck /> Appointments
              </span>
              <span>{openMenu === "appointments" ? "▲" : "▼"}</span>
            </button>
            {openMenu === "appointments" && (
              <div className="ml-6 mt-1 space-y-1">
                {isAdmin ? (
                  <>
                    <Link to="/appointments" onClick={toggleSidebar} className="block py-1 px-2 rounded hover:bg-blue-700">
                      Appointment List
                    </Link>
                    <Link to="/appointments" onClick={toggleSidebar} className="block py-1 px-2 rounded hover:bg-blue-700">
                      View Appointment
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/appointments/add" onClick={toggleSidebar} className="block py-1 px-2 rounded hover:bg-blue-700">
                      Book Appointment
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Billing */}
          <Link
            to="/billing"
            className="flex items-center gap-2 py-2 px-3 rounded hover:bg-blue-700"
            onClick={toggleSidebar}
          >
            <FaFileInvoiceDollar /> Billing
          </Link>

          {/* Login */}
          <Link
            to="/"
            className="flex items-center gap-2 py-2 px-3 rounded hover:bg-blue-700"
            onClick={handleLogout}
          >
            <FaSignInAlt /> Logout
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"} h-20`}>
        {/* Top bar */}
        <div className="p-4 bg-gradient-to-r from-teal-600 to-blue-600 dark:bg-gray-800 text-white shadow h-20 flex justify-between items-center">
          <div className="flex justify-start">
            <button onClick={toggleSidebar} className="text-2xl mr-5">
              <FaBars />
            </button>
            <h1 className="text-3xl font-bold">Hello, {localStorage.getItem("username")} - ID:{localStorage.getItem("patientId")}</h1>
          </div>
          <h1 className="text-4xl font-bold">HealthCare</h1>

        </div>

        {/* Render children */}
        <main className="p-0">{children}</main>
      </div>
    </div>
  );
}
