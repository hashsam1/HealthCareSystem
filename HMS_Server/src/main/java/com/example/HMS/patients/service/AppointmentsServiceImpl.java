
package com.example.HMS.patients.service;

import com.example.HMS.patients.model.Appointments;
import com.example.HMS.patients.model.Patient;
import com.example.HMS.patients.repository.AppointmentsRepository;
import com.example.HMS.patients.repository.PatientRepository;
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

    @Override
    public Appointments updateAppointment(Long id, Appointments updatedDetails) {
        Appointments existing = appointmentsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        existing.setDoctor_name(updatedDetails.getDoctor_name());
        existing.setTime_of_appointment(updatedDetails.getTime_of_appointment());
        existing.setStatus(updatedDetails.getStatus());
        // If patient info needs to be updated
        if (updatedDetails.getPatient() != null) {
            existing.setPatient(updatedDetails.getPatient());
        }
        return appointmentsRepository.save(existing);
    }




}
