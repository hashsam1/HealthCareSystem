import React from 'react';
import { useParams } from 'react-router-dom';

export default function ViewAppointment() {
  const { id } = useParams();
  return (
    <div>
      <h2>View Appointment #{id}</h2>
      <p>Details will come from API</p>
    </div>
  );
}
