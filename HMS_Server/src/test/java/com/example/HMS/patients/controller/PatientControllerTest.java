package com.example.HMS.patients.controller;

import com.example.HMS.patients.model.Patient;
import com.example.HMS.patients.service.PatientService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PatientControllerTest {

    @Mock
    private PatientService patientService;

    @InjectMocks
    private PatientController patientController;

    @Test
    void testCreatePatient() {
        Patient patient = new Patient();
        patient.setName("John");

        when(patientService.createPatient(patient)).thenReturn(patient);

        ResponseEntity<Patient> response = patientController.createPatient(patient);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("John", response.getBody().getName());
        verify(patientService).createPatient(patient);
    }

    @Test
    void testGetAllPatients() {
        Patient p1 = new Patient();
        p1.setName("Alice");

        Patient p2 = new Patient();
        p2.setName("Bob");

        when(patientService.getAllPatients()).thenReturn(Arrays.asList(p1, p2));

        List<Patient> result = patientController.getAllPatients();

        assertEquals(2, result.size());
        assertEquals("Alice", result.get(0).getName());
        assertEquals("Bob", result.get(1).getName());
        verify(patientService).getAllPatients();
    }

    @Test
    void testGetPatientById_Found() {
        Patient patient = new Patient();
        patient.setName("Jane");

        when(patientService.getPatientById(1L)).thenReturn(Optional.of(patient));

        ResponseEntity<Patient> response = patientController.getPatientById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Jane", response.getBody().getName());
        verify(patientService).getPatientById(1L);
    }

    @Test
    void testGetPatientById_NotFound() {
        when(patientService.getPatientById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Patient> response = patientController.getPatientById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(patientService).getPatientById(1L);
    }

    @Test
    void testUpdatePatient_Success() {
        Patient updated = new Patient();
        updated.setName("Updated Name");

        when(patientService.updatePatient(eq(1L), any(Patient.class))).thenReturn(updated);

        ResponseEntity<Patient> response = patientController.updatePatient(1L, updated);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Updated Name", response.getBody().getName());
        verify(patientService).updatePatient(1L, updated);
    }

    @Test
    void testUpdatePatient_NotFound() {
        when(patientService.updatePatient(eq(1L), any(Patient.class)))
                .thenThrow(new RuntimeException("Not found"));

        ResponseEntity<Patient> response = patientController.updatePatient(1L, new Patient());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
        verify(patientService).updatePatient(eq(1L), any(Patient.class));
    }

    @Test
    void testDeletePatient() {
        when(patientService.existsById(1L)).thenReturn(true); 
        doNothing().when(patientService).deletePatient(1L);

        ResponseEntity<Void> response = patientController.deletePatient(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
        verify(patientService).existsById(1L);  
        verify(patientService).deletePatient(1L);
    }
}
