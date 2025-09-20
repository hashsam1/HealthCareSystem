

package com.example.HMS.patients.service;

import com.example.HMS.patients.model.Appointments;

import java.util.List;

public interface AppointmentsService {
    Appointments createAppointment(Appointments appointment);
    List<Appointments> getAllAppointments();
    Appointments getAppointmentById(Long id);
}

