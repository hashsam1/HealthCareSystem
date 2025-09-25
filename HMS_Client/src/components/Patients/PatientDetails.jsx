import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PatientDetails() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:9090/api/patients/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load patient");
                return res.json();
            })
            .then((data) => {
                setPatient(data);
                setFormData(data);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:9090/api/patients/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update patient");

            const updated = await res.json();
            setPatient(updated);
            setFormData(updated);
            setIsEditing(false);
            alert("Patient details updated successfully!");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {patient && (
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
                    <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
                        Patient Details
                    </h2>

                    <div className="space-y-4 text-gray-700">
                        {/* Name */}
                        <div>
                            <label className="block font-semibold">Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            ) : (
                                <p className="p-2 bg-gray-200 rounded-lg">{patient.name}</p>
                            )}
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block font-semibold">Age</label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age || ""}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-200  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            ) : (
                                <p className="p-2 bg-gray-200 rounded-lg">{patient.age}</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block font-semibold">Gender</label>
                            {isEditing ? (
                                <select
                                    name="gender"
                                    value={formData.gender || ""}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-200  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <p className="p-2 bg-gray-200 rounded-lg">{patient.gender}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block font-semibold">Phone</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber || ""}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-gray-200  rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            ) : (
                                <p className="p-2 bg-gray-200 rounded-lg">{patient.phoneNumber}</p>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-end gap-3">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
