import React, { useState } from "react";

export default function AddAppointment({ onAdd }) {
  const [form, setForm] = useState({
    patient: "",
    timeSlot: "",
    appointmentType: "",
    consultationFee: 500,
    hasInsurance: "no",
    insuranceProvider: "",
    policyNumber: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      patient: "",
      timeSlot: "",
      appointmentType: "",
      consultationFee: 500,
      hasInsurance: "no",
      insuranceProvider: "",
      policyNumber: "",
    });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Book Appointment
        </h2>

        {/* Patient Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">
            Patient Name
          </label>
          <input
            name="patient"
            placeholder="Enter patient name"
            value={form.patient}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Time Slot Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Time Slot</label>
          <select
            name="timeSlot"
            value={form.timeSlot}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select a time slot</option>
            <option>09:00 AM - 10:00 AM</option>
            <option>10:00 AM - 11:00 AM</option>
            <option>11:00 AM - 12:00 PM</option>
            <option>02:00 PM - 03:00 PM</option>
            <option>03:00 PM - 04:00 PM</option>
          </select>
        </div>

        {/* Appointment Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">
            Appointment Type
          </label>
          <select
            name="appointmentType"
            value={form.appointmentType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select appointment type</option>
            <option>Consultation</option>
            <option>Surgery</option>
            <option>Operation</option>
            <option>Blood Test</option>
            <option>Other</option>
          </select>
        </div>

        {/* Consultation Fee */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">
            Consultation Fee
          </label>
          <input
            name="consultationFee"
            value={`$${form.consultationFee}`}
            readOnly
            className="w-full px-4 py-2 border rounded-xl bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

      

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Add Appointment
        </button>
      </form>
    </div>
  );
}
