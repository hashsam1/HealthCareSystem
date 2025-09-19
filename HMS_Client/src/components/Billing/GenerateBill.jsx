import React, { useState } from "react";

export default function GenerateBill() {
  const [form, setForm] = useState({
    patient: "",
    consultationFee: 500, // hardcoded fee
    hasInsurance: "no",
    insuranceProvider: "",
    policyNumber: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Generating bill", form);
    // call your API here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Generate Bill
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

        {/* Consultation Fee (hardcoded) */}
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

        {/* Insurance Question */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">
            Does the patient have insurance?
          </label>
          <select
            name="hasInsurance"
            value={form.hasInsurance}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Show insurance fields only if Yes */}
        {form.hasInsurance === "yes" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1">
                Insurance Provider
              </label>
              <input
                name="insuranceProvider"
                placeholder="Enter insurance provider"
                value={form.insuranceProvider}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required={form.hasInsurance === "yes"}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-1">
                Policy Number
              </label>
              <input
                name="policyNumber"
                placeholder="Enter policy number"
                value={form.policyNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required={form.hasInsurance === "yes"}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Generate Bill
        </button>
      </form>
    </div>
  );
}
