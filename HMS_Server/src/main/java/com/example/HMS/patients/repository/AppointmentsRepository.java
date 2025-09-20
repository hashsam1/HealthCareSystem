
package com.example.HMS.patients.repository;

import com.example.HMS.patients.model.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentsRepository extends JpaRepository<Appointments, Long> {
}

