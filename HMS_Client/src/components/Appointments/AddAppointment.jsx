import React, { useState } from 'react';

export default function AddAppointment() {
  const [form, setForm] = useState({ patient: '', doctor: '', date: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Adding appointment', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Appointment</h2>
      <input name="patient" placeholder="Patient Name" onChange={handleChange} />
      <input name="doctor" placeholder="Doctor Name" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}
