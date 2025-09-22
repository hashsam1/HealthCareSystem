package com.example.HMS.patients.service;

import com.example.HMS.patients.model.Appointments;
import com.example.HMS.patients.model.Patient;
import com.example.HMS.patients.repository.AppointmentsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AppointmentsServiceImplTest {

    @Mock
    private AppointmentsRepository appointmentsRepository;

    @InjectMocks
    private AppointmentsServiceImpl appointmentsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateAppointment() {
        Appointments appointment = new Appointments(
                1L, "Dr. Smith", new Patient(), LocalTime.of(10, 0),
                Appointments.AppointmentStatus.SCHEDULED
        );
        when(appointmentsRepository.save(appointment)).thenReturn(appointment);

        Appointments result = appointmentsService.createAppointment(appointment);

        assertEquals("Dr. Smith", result.getDoctor_name());
        verify(appointmentsRepository, times(1)).save(appointment);
    }

    @Test
    void testGetAllAppointments() {
        List<Appointments> appointments = Arrays.asList(
                new Appointments(1L, "Dr. A", new Patient(), LocalTime.of(9, 0), Appointments.AppointmentStatus.SCHEDULED),
                new Appointments(2L, "Dr. B", new Patient(), LocalTime.of(10, 0), Appointments.AppointmentStatus.COMPLETED)
        );
        when(appointmentsRepository.findAll()).thenReturn(appointments);

        List<Appointments> result = appointmentsService.getAllAppointments();

        assertEquals(2, result.size());
        assertEquals("Dr. A", result.get(0).getDoctor_name());
    }

    @Test
    void testGetAppointmentById_Found() {
        Appointments appointment = new Appointments(
                1L, "Dr. John", new Patient(), LocalTime.of(11, 0),
                Appointments.AppointmentStatus.SCHEDULED
        );
        when(appointmentsRepository.findById(1L)).thenReturn(Optional.of(appointment));

        Appointments result = appointmentsService.getAppointmentById(1L);

        assertEquals("Dr. John", result.getDoctor_name());
    }

    @Test
    void testGetAppointmentById_NotFound() {
        when(appointmentsRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> appointmentsService.getAppointmentById(1L));
    }

    @Test
    void testCompleteAppointment() {
        Appointments appointment = new Appointments(
                1L, "Dr. Alex", new Patient(), LocalTime.of(12, 0),
                Appointments.AppointmentStatus.SCHEDULED
        );
        when(appointmentsRepository.findById(1L)).thenReturn(Optional.of(appointment));
        when(appointmentsRepository.save(appointment)).thenReturn(appointment);

        Appointments result = appointmentsService.completeAppointment(1L);

        assertEquals(Appointments.AppointmentStatus.COMPLETED, result.getStatus());
        verify(appointmentsRepository, times(1)).save(appointment);
    }
}
