
package com.example.HMS.patients.service;

import com.example.HMS.patients.model.Appointments;
import com.example.HMS.patients.model.Patient;
import com.example.HMS.patients.repository.AppointmentsRepository;
import com.example.HMS.patients.repository.PatientRepository;
import com.example.HMS.patients.service.AppointmentsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentsServiceImpl implements AppointmentsService {

    private final AppointmentsRepository appointmentsRepository;
    private final PatientRepository patientRepository;

    public AppointmentsServiceImpl(AppointmentsRepository appointmentsRepository, PatientRepository patientRepository) {
        this.appointmentsRepository = appointmentsRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public Appointments createAppointment(Appointments appointment) {
        if (appointment.getPatient() == null || appointment.getPatient().getId() == null) {
            throw new IllegalArgumentException("Patient ID is required");
        }

        Patient patient = patientRepository.findById(appointment.getPatient().getId())
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));

        appointment.setPatient(patient);
        return appointmentsRepository.save(appointment);
    }

    @Override
    public List<Appointments> getAllAppointments() {
        return appointmentsRepository.findAll();
    }

    @Override
    public Appointments getAppointmentById(Long id) {
        return appointmentsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
    }
}
