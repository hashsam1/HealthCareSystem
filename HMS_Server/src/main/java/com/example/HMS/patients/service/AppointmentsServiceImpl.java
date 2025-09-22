
package com.example.HMS.patients.service;
import com.example.HMS.patients.events.AppointmentCompletedEvent;
import org.springframework.kafka.core.KafkaTemplate;
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
    private final KafkaTemplate<String, AppointmentCompletedEvent> kafkaTemplate;

    public AppointmentsServiceImpl(AppointmentsRepository appointmentsRepository, PatientRepository patientRepository,KafkaTemplate<String, AppointmentCompletedEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
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

    @Override
    public Appointments completeAppointment(Long id) {
        // 1. Find appointment
        Appointments appointment = appointmentsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        // 2. If already completed, just return
        if (Appointments.AppointmentStatus.COMPLETED.equals(appointment.getStatus())) {
            return appointment;
        }

        appointment.setStatus(Appointments.AppointmentStatus.COMPLETED);
        Appointments saved = appointmentsRepository.save(appointment);

        // 4. Build event (static consultation fee for now)
        AppointmentCompletedEvent event = new AppointmentCompletedEvent(
                saved.getAppointment_id(),
                saved.getPatient() != null ? saved.getPatient().getId() : null,
                500.0
        );

        // 5. Send event to Kafka
        kafkaTemplate.send("appointments.completed", event);

        return saved;
    }

}
