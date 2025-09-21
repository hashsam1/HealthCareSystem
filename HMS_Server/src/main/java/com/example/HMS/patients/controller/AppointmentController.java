package com.example.HMS.patients.controller;

import com.example.HMS.patients.model.Appointments;
import com.example.HMS.patients.service.AppointmentsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")  // allow React dev server
public class AppointmentController {

    private final AppointmentsService appointmentsService;

    public AppointmentController(AppointmentsService appointmentsService) {
        this.appointmentsService = appointmentsService;
    }

    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody Appointments appointment) {
        try {
            Appointments saved = appointmentsService.createAppointment(appointment);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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
}
