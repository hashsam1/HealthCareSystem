import React, { useState } from 'react';

export default function AddPatient() {
  const [form, setForm] = useState({ name: '', age: '', disease: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Adding patient', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Patient</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="disease" placeholder="Disease" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}
