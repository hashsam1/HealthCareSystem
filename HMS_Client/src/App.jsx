// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './components/Dashboard.jsx';

import AddPatient from './components/Patients/AddPatient.jsx';
import PatientList from './components/Patients/PatientList.jsx';
import ViewPatient from './components/Patients/ViewPatient.jsx';

import AppointmentsPage from './pages/AppointmentsPage.jsx';

import GenerateBill from './components/Billing/GenerateBill.jsx';
import Login from './components/Login.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* Patients */}
        <Route path="/patients/add" element={<AddPatient />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/:id" element={<ViewPatient />} />

        {/* Appointments */}
       <Route path="/appointments" element={<AppointmentsPage />} />
      

        {/* Billing */}
        <Route path="/billing" element={<GenerateBill />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
