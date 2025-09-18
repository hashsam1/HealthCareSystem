// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './components/Dashboard.jsx';

import AddPatient from './components/Patients/AddPatient.jsx';
import PatientList from './components/Patients/PatientList.jsx';
import ViewPatient from './components/Patients/ViewPatient.jsx';

import AddAppointment from './components/Appointments/AddAppointment.jsx';
import AppointmentList from './components/Appointments/AppointmentList.jsx';
import ViewAppointment from './components/Appointments/ViewAppointment.jsx';

import GenerateBill from './components/Billing/GenerateBill.jsx';
import Login from './components/Login.jsx';

import './App.css';

function App() {
  return (
    <div>
    
    <Router>
      
      <NavBar>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Patients */}
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patients/:id" element={<ViewPatient />} />
          

          {/* Appointments */}
          <Route path="/appointments/add" element={<AddAppointment />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/appointments/:id" element={<ViewAppointment />} />

          {/* Billing */}
          <Route path="/billing" element={<GenerateBill />} />

          {/* Login */}
          <Route path="/" element={<Login />} />
        </Routes>
      </NavBar>
      <Footer />
    </Router>
    
    </div>
  );
}

export default App;
