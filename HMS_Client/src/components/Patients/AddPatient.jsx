import React, { useState } from "react";

export default function AddPatient() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phoneNumber: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("patientId", data.patientId)
        console.log("Patient added successfully:", data);
        alert("Patient added successfully!");
        setForm({ name: "", age: "", gender: "", phoneNumber: "" });
      } else {
        console.error("Failed to add patient");
        alert("Error while adding patient (phone number must be unique)");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error while adding patient");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Add Patient Details
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Name
          </label>
          <input
            name="name"
            placeholder="Enter patient name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Age
          </label>
          <input
            name="age"
            type="number"
            placeholder="Enter patient age"
            value={form.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="Enter phone number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
}
