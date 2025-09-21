// PatientList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all patients from backend
    fetch("http://localhost:9090/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
        <button
          onClick={() => navigate("/patients/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Patient
        </button>
      </div>

      {patients.length === 0 ? (
        <p className="text-gray-600">No patients found.</p>
      ) : (
        <ul className="space-y-2">
          {patients.map((p) => (
            <li
              key={p.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-800">{p.name}</p>
              <p className="text-gray-600">
                Age: {p.age} | Gender: {p.gender} | Phone: {p.phoneNumber}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
