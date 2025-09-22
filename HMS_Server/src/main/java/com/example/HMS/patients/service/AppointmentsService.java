

package com.example.HMS.patients.service;

import com.example.HMS.patients.model.Appointments;

import java.util.List;

public interface AppointmentsService {
    Appointments createAppointment(Appointments appointment);

    List<Appointments> getAllAppointments();

    Appointments getAppointmentById(Long id);
<<<<<<< HEAD

    Appointments updateAppointment(Long id, Appointments updatedDetails);
=======
    Appointments completeAppointment(Long id);

>>>>>>> 62d5d28dd19cb15f75a2a9b7b0c5f30a8d7ac0ff
}

