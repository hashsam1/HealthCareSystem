import React from 'react';
import { useParams } from 'react-router-dom';

export default function ViewPatient() {
  const { id } = useParams();
  // fetch details by id later
  return (
    <div>
      <h2>View Patient #{id}</h2>
      <p>Details will come from API</p>
    </div>
  );
}
