import React, { useState } from "react";

export default function AddAppointment() {
  const [form, setForm] = useState({
    patientId: "",
    doctor_name: "",
    time_of_appointment: "",
    status: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // payload for appointment
    const payload = {
      doctor_name: form.doctor_name,
      time_of_appointment: form.time_of_appointment,
      status: form.status,
      patient: { patientId: Number(form.patientId) }, // ✅ backend expects patientId
    };

    try {
      // Step 1: create appointment
      const response = await fetch("http://localhost:9090/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const appointment = await response.json();
        console.log("✅ Appointment created:", appointment);

        // Step 2: create bill for this appointment
        const billPayload = {
          appointment: { appointment_id: appointment.appointment_id },
          amount: 500,
          status: "PAID",
        };

        const billResponse = await fetch(
          "http://localhost:9090/bill/create",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(billPayload),
          }
        );

        if (billResponse.ok) {
          const billText = await billResponse.text(); // 👈 plain text
          console.log("✅ Bill created (raw):", billText);

          // Step 3: fetch structured JSON bill via byAppointment endpoint
          const billJsonRes = await fetch(
            `http://localhost:9090/byAppointment/${appointment.appointment_id}`
          );
          if (billJsonRes.ok) {
            const billJson = await billJsonRes.json();
            console.log("📦 Bill fetched as JSON:", billJson);
            alert("Appointment & Bill created successfully!");
          } else {
            alert("Appointment created, but error fetching bill JSON");
          }
        } else {
          console.error("❌ Failed to create bill");
          alert("Appointment created, but error creating bill");
        }

        // reset form
        setForm({
          patientId: "",
          doctor_name: "",
          time_of_appointment: "",
          status: "",
        });
      } else {
        console.error("❌ Failed to create appointment");
        alert("Error creating appointment");
      }
    } catch (err) {
      console.error("⚠️ Error:", err);
      alert("Server error");
    }
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

        {/* Patient ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Patient ID</label>
          <input
            name="patientId"
            placeholder="Enter patient ID"
            value={form.patientId}
            onChange={handleChange}
            type="number"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Doctor Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Doctor Name</label>
          <input
            name="doctor_name"
            placeholder="Enter doctor name"
            value={form.doctor_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Appointment Time */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">
            Time of Appointment
          </label>
          <input
            name="time_of_appointment"
            type="time"
            value={form.time_of_appointment}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
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
