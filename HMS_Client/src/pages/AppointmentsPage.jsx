// import React, { useState } from 'react';
// import AddAppointment from '../components/Appointments/AddAppointment';
// import AppointmentList from '../components/Appointments/AppointmentList';
// import ViewAppointment from '../components/Appointments/ViewAppointment';

// export default function AppointmentsPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   const handleAdd = (appt) => setAppointments([...appointments, appt]);

//   if (selectedAppointment)
//     return (
//       <ViewAppointment
//         appointment={selectedAppointment}
//         onBack={() => setSelectedAppointment(null)}
//       />
//     );

//   return (
//     <>
//       <AddAppointment onAdd={handleAdd} />
//       <AppointmentList
//         appointments={appointments}
//         onSelect={setSelectedAppointment}
//       />
//     </>
//   );
// }
