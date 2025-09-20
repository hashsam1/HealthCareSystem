package com.example.HMS.patients.model;

import java.time.LocalTime;

import com.example.HMS.billings.model.Bill;
import jakarta.persistence.*;

@Entity
@Table(name = "appointments")

public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointment_id;

    //one patient many appointment
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL)
    private Bill bill;

    private String doctor_name;
    private LocalTime time_of_appointment;
    private String status;

    public Appointments() {}
    public Appointments(Long appointment_id, String doctor_name, Patient patient, LocalTime time_of_appointment, String status) {
        this.appointment_id = appointment_id;
        this.doctor_name = doctor_name;
        this.patient = patient;
        this.time_of_appointment = time_of_appointment;
        this.status = status;
    }

    public Long getAppointment_id() {
        return appointment_id;
    }

    public void setAppointment_id(Long appointment_id) {
        this.appointment_id = appointment_id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getDoctor_name() {
        return doctor_name;
    }

    public void setDoctor_name(String doctor_name) {
        this.doctor_name = doctor_name;
    }

    public LocalTime getTime_of_appointment() {
        return time_of_appointment;
    }

    public void setTime_of_appointment(LocalTime time_of_appointment) {
        this.time_of_appointment = time_of_appointment;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
