// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/patients">Patients</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/billing">Billing</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
