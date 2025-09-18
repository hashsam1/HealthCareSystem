import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaUserInjured,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaSignInAlt,
} from "react-icons/fa";

export default function NavBar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (menu) =>
    setOpenMenu(openMenu === menu ? null : menu);

  return (
    <div>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-900 text-white w-64 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-64"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
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
                <Link
                  to="/patients"
                  className="block py-1 px-2 rounded hover:bg-blue-700"
                  onClick={toggleSidebar}
                >
                  Patient List
                </Link>
                <Link
                  to="/patients/add"
                  className="block py-1 px-2 rounded hover:bg-blue-700"
                  onClick={toggleSidebar}
                >
                  Add Patient
                </Link>
                <Link
                  to="/patients/1"
                  className="block py-1 px-2 rounded hover:bg-blue-700"
                  onClick={toggleSidebar}
                >
                  View Patient
                </Link>
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
                <Link
                  to="/appointments"
                  className="block py-1 px-2 rounded hover:bg-blue-700"
                  onClick={toggleSidebar}
                >
                  Appointment List
                </Link>
                <Link
                  to="/appointments/add"
                  className="block py-1 px-2 rounded hover:bg-blue-700"
                  onClick={toggleSidebar}
                >
                  Add Appointment
                </Link>
                <Link
                  to="/appointments/1"
                  className="block py-1 px-2 rounded hover:bg-blue-700"
                  onClick={toggleSidebar}
                >
                  View Appointment
                </Link>
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
            onClick={toggleSidebar}
          >
            <FaSignInAlt /> Login
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"
          }`}
      >
        {/* Top bar with Hamburger */}
        <div className="p-4 bg-white shadow">
          <button onClick={toggleSidebar} className="text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Render children (pages) */}
        <main className="p-6">{children}</main>
      </div>
     
    </div>
    
    </div>
  );
}
