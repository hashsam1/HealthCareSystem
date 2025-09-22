package com.example.HMS.patients.service;

import com.example.HMS.patients.model.Patient;
import com.example.HMS.patients.repository.PatientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PatientServiceTest {

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientService patientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreatePatient() {
        Patient patient = new Patient("John", "12345", "Male", 30);
        when(patientRepository.save(patient)).thenReturn(patient);

        Patient result = patientService.createPatient(patient);

        assertEquals("John", result.getName());
        verify(patientRepository, times(1)).save(patient);
    }

    @Test
    void testGetAllPatients() {
        List<Patient> patients = Arrays.asList(
                new Patient("Alice", "98765", "Female", 25)
        );
        when(patientRepository.findAll()).thenReturn(patients);

        List<Patient> result = patientService.getAllPatients();

        assertEquals(1, result.size());
        assertEquals("Alice", result.get(0).getName());
    }

    @Test
    void testGetPatientById() {
        Patient patient = new Patient("Bob", "55555", "Male", 40);
        when(patientRepository.findById(1L)).thenReturn(Optional.of(patient));

        Optional<Patient> result = patientService.getPatientById(1L);

        assertTrue(result.isPresent());
        assertEquals("Bob", result.get().getName());
    }

    @Test
    void testUpdatePatient() {
        Patient existing = new Patient("Old", "11111", "Male", 30);
        Patient updates = new Patient("New", "22222", "Male", 35);

        when(patientRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(patientRepository.save(any(Patient.class))).thenReturn(updates);

        Patient result = patientService.updatePatient(1L, updates);

        assertEquals("New", result.getName());
        verify(patientRepository, times(1)).save(existing);
    }

    @Test
    void testDeletePatient() {
        doNothing().when(patientRepository).deleteById(1L);

        patientService.deletePatient(1L);

        verify(patientRepository, times(1)).deleteById(1L);
    }
}
