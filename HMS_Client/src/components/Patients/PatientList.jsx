import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 search input
  const [filteredPatients, setFilteredPatients] = useState([]); // 🔍 search result
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all patients from backend
    fetch("http://localhost:9090/api/patients")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
        setFilteredPatients(data); // initialize search results with all patients
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle search by phone number
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredPatients(patients); // if empty search, reset to all patients
      return;
    }
    const result = patients.filter((p) =>
      p.phoneNumber.includes(searchTerm.trim())
    );
    setFilteredPatients(result);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
        <button
          onClick={() => navigate("/patients/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Patient
        </button>
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search by phone number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
        >
          Search
        </button>
      </div>

      {/* Patients List */}
      {filteredPatients.length === 0 ? (
        <p className="text-gray-600">No patients found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredPatients.map((p) => (
            <li
              key={p.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-800">
                {p.name}{" "}
                <span className="text-sm text-gray-500">(ID: {p.id})</span>
              </p>
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
