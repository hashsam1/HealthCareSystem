package com.example.HMS.patients.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.HMS.patients.model.Patient;
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{

    Patient findByPhoneNumber(String phoneNumber);
}