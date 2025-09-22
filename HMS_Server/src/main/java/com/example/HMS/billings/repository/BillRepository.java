package com.example.HMS.billings.repository;


import jdk.jfr.Registered;

import org.springframework.stereotype.Repository;

import com.example.HMS.billings.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {
    // You can add custom query methods here if needed
    // Find Bill directly using appointment_id
    @Query("SELECT b FROM Bill b WHERE b.appointment.appointment_id = :appointmentId")
    Optional<Bill> findByAppointmentId(@Param("appointmentId") Long appointmentId);

}
