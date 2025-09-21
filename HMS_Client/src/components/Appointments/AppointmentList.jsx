import React, { useEffect, useState } from "react";

export default function AppointmentList({ onSelect }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:9090/api/appointments"); // ✅ matches backend
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

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

  if (!appointments || appointments.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Appointments List
        </h2>
        <p className="text-gray-600">No appointments available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Appointments List
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {appointments.map((appt) => (
          <div
            key={appt.appointment_id}
            onClick={() => onSelect && onSelect(appt)}
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
          >
            {/* ✅ Patient Details */}
            <h3 className="text-lg font-semibold">
              Patient: {appt.patient?.name || "Unknown"}
            </h3>
            <p className="text-gray-600">
              Age: {appt.patient?.age} | Gender: {appt.patient?.gender}
            </p>
            <p className="text-gray-600">
              Phone: {appt.patient?.phoneNumber}
            </p>

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
          </div>
        ))}
      </div>
    </div>
  );
}
