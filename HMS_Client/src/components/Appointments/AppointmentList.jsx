import React from "react";

export default function AppointmentList({ appointments, onSelect }) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Appointments List</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {appointments.map((appt, index) => (
          <div
            key={index}
            onClick={() => onSelect(appt)}
            className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{appt.patient}</h3>
            <p className="text-gray-600">{appt.appointmentType}</p>
            <p className="text-gray-600">{appt.timeSlot}</p>
            <p className="text-gray-600">Fee: ${appt.consultationFee}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
