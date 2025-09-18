import React, { useState } from 'react';

export default function GenerateBill() {
  const [form, setForm] = useState({ patient: '', amount: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Generating bill', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Generate Bill</h2>
      <input name="patient" placeholder="Patient Name" onChange={handleChange} />
      <input name="amount" placeholder="Amount" onChange={handleChange} />
      <button type="submit">Generate</button>
    </form>
  );
}
