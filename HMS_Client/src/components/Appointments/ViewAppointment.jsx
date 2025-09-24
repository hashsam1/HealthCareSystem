// SearchAppointment.jsx
import React, { useState } from "react";

export default function SearchAppointment() {
  const [searchId, setSearchId] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!searchId) return;

    fetch(`http://localhost:9090/api/appointments/${searchId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Appointment not found");
        return res.json();
      })
      .then((data) => {
        setAppointment(data);
        setError(null);
      })
      .catch((err) => {
        setAppointment(null);
        setError(err.message);
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Search Appointment
        </h2>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Appointment ID"
            className="flex-1 border px-3 py-2 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {appointment && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Appointment Details</h3>
            <p><strong>ID:</strong> {appointment.appointment_id}</p>
            <p><strong>Doctor:</strong> {appointment.doctor_name}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
            <p><strong>Time:</strong> {appointment.time_of_appointment}</p>

            <div className="mt-3">
              <h4 className="font-semibold">Patient Info</h4>
              <p><strong>Name:</strong> {appointment.patient?.name}</p>
              <p><strong>Gender:</strong> {appointment.patient?.gender}</p>
              <p><strong>Age:</strong> {appointment.patient?.age}</p>
              <p><strong>Phone:</strong> {appointment.patient?.phoneNumber}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
