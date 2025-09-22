import React, { useEffect, useState } from "react";

export default function AppointmentList({ onSelect }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // 🔍 Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:9090/api/appointments");
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();
      setAppointments(data);
      setFilteredAppointments(data); // initialize filtered list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id) => {
    try {
      const res = await fetch(`http://localhost:9090/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update appointment");

      await fetchAppointments(); // refresh list
      setEditingId(null); // close edit mode
    } catch (err) {
      alert(err.message);
    }
  };

  // 🔍 Search appointments by patient ID
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredAppointments(appointments); // reset to all
      return;
    }
    const result = appointments.filter(
      (appt) =>
        appt.patient &&
        String(appt.patient.id) === searchTerm.trim() // match exact patient id
    );
    setFilteredAppointments(result);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Appointments List
        </h2>
        <p className="text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Appointments List
        </h2>
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!filteredAppointments || filteredAppointments.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Appointments List
        </h2>

        {/* 🔍 Search Bar */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search by Patient ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
          >
            Search
          </button>
        </div>

        <p className="text-gray-600">No appointments available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Appointments List
      </h2>

      {/* 🔍 Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search by Patient ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
        >
          Search
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredAppointments.map((appt) => (
          <div
            key={appt.appointment_id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            {/* ✅ Appointment ID */}
            <p className="text-sm text-gray-500 mb-1">
              Appointment ID: {appt.appointment_id}
            </p>

            {/* ✅ Patient Details */}
            <h3 className="text-lg font-semibold">
              Patient: {appt.patient?.name || "Unknown"} (ID: {appt.patient?.id})
            </h3>
            <p className="text-gray-600">
              Age: {appt.patient?.age} | Gender: {appt.patient?.gender}
            </p>
            <p className="text-gray-600">Phone: {appt.patient?.phoneNumber}</p>

            {/* ✅ Appointment Details */}
            <p className="text-gray-800 font-medium mt-2">
              Doctor: {appt.doctor_name}
            </p>
            <p className="text-gray-600">
              Time: {appt.time_of_appointment}
            </p>
            <p
              className={`mt-1 font-semibold ${
                appt.status === "COMPLETED"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              Status: {appt.status}
            </p>

            {/* ✅ Edit Mode */}
            {editingId === appt.appointment_id ? (
              <div className="mt-3 flex gap-2">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">-- Select Status --</option>
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
                <button
                  onClick={() => handleUpdateStatus(appt.appointment_id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setEditingId(appt.appointment_id);
                  setNewStatus(appt.status);
                }}
                className="mt-3 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Edit Status
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
