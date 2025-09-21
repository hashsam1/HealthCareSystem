package com.example.HMS.patients.controller;

import com.example.HMS.patients.model.Appointments;
import com.example.HMS.patients.model.Patient;
import com.example.HMS.patients.service.AppointmentsService;
import com.example.HMS.patients.service.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentsService appointmentsService;
    private final PatientService patientService;




    public AppointmentController(AppointmentsService appointmentsService, PatientService patientService) {
        this.appointmentsService = appointmentsService;
        this.patientService = patientService;
    }

    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody Appointments appointment) {
        //**//
        Long patientId = appointment.getPatient().getPatientId();

        Optional<Patient> patientOptional = patientService.getPatientById(patientId);

        // If the patient is not found, return a 404 error
        if (!patientOptional.isPresent()) {
            return ResponseEntity.status(404).body("Patient not found with id " + patientId);
        }

        // Get the patient object from the Optional
        Patient patient = patientOptional.get();

        // Set the patient to the appointment
        appointment.setPatient(patient);

        // Create and save the appointment
        Appointments saved = appointmentsService.createAppointment(appointment);
        return ResponseEntity.ok(saved);
    }


    @GetMapping
    public List<Appointments> getAllAppointments() {
        return appointmentsService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(appointmentsService.getAppointmentById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Appointments> updatePatient(@PathVariable Long id, @RequestBody Appointments appointmentDetails) {
        try {
            Appointments updateAppointmentStatus = appointmentsService.updateAppointment(id, appointmentDetails);
            return ResponseEntity.ok(updateAppointmentStatus);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

