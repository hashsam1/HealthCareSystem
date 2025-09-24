import React, { useState } from "react";

export default function ViewPatient() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!patientId) {
      setError("Please enter a patient ID");
      return;
    }

    setLoading(true);
    setError(null);
    setPatient(null);

    try {
      const res = await fetch(`http://localhost:9090/api/patients/${patientId}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Patient not found");
        }
        throw new Error("Failed to fetch patient");
      }

      const data = await res.json();
      setPatient(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Patient</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="number"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Enter patient ID"
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {patient && (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md">
          <h3 className="text-xl font-semibold mb-2">{patient.name}</h3>
          <p><strong>ID:</strong> {patient.id}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Phone:</strong> {patient.phoneNumber}</p>
        </div>
      )}
    </div>
  );
}
