// src/components/Dashboard.jsx
import React from "react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
      <p className="text-gray-600">
        Select a section from the sidebar to manage patients, appointments, or billing.
      </p>
    </div>
  );
}
