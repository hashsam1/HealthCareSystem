import React from "react";

export default function ViewAppointment({ appointment, onBack }) {
  if (!appointment) return null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={onBack}
        className="mb-4 bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400"
      >
        Back
      </button>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Appointment Details
        </h2>
        <p><strong>Patient:</strong> {appointment.patient}</p>
        <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
        <p><strong>Type:</strong> {appointment.appointmentType}</p>
        <p><strong>Fee:</strong> ${appointment.consultationFee}</p>
        <p><strong>Insurance:</strong> {appointment.hasInsurance}</p>
        {appointment.hasInsurance === "yes" && (
          <>
            <p><strong>Provider:</strong> {appointment.insuranceProvider}</p>
            <p><strong>Policy Number:</strong> {appointment.policyNumber}</p>
          </>
        )}
      </div>
    </div>
  );
}
