import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // fetch from API later
    setPatients([
      { id: 1, name: 'John Doe', age: 30 },
      { id: 2, name: 'Jane Smith', age: 45 }
    ]);
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      <Link to="/patients/add">Add Patient</Link>
      <ul>
        {patients.map(p => (
          <li key={p.id}>
            <Link to={`/patients/${p.id}`}>{p.name} (Age {p.age})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
