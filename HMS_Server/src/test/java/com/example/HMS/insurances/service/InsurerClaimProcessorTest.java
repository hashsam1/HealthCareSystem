package com.example.HMS.insurances.service;

import com.example.HMS.insurances.events.ClaimRequestEvent;
import com.example.HMS.insurances.events.ClaimResponseEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InsurerClaimProcessorTest {

    private KafkaTemplate<String, Object> kafkaTemplate;
    private InsurerClaimProcessor processor;

    @BeforeEach
    void setUp() {
        kafkaTemplate = mock(KafkaTemplate.class);
        processor = new InsurerClaimProcessor(kafkaTemplate);
    }

    @Test
    void testHandleClaimRequest_Approved() {
        // Arrange
        ClaimRequestEvent request = new ClaimRequestEvent("CID123", "POL123", 20000.0, "CORR123");

        // Act
        processor.handleClaimRequest(request);

        // Assert
        ArgumentCaptor<Object> captor = ArgumentCaptor.forClass(Object.class);
        verify(kafkaTemplate).send(eq("claims.responses"), captor.capture());

        ClaimResponseEvent response = (ClaimResponseEvent) captor.getValue();
        assertEquals("CID123", response.getClaimId());
        assertEquals("CORR123", response.getCorrelationId());
        assertEquals("APPROVED", response.getStatus());
    }

    @Test
    void testHandleClaimRequest_RejectedWhenNoPolicyId() {
        ClaimRequestEvent request = new ClaimRequestEvent("CID124", "", 10000.0, "CORR124");

        processor.handleClaimRequest(request);

        ArgumentCaptor<Object> captor = ArgumentCaptor.forClass(Object.class);
        verify(kafkaTemplate).send(eq("claims.responses"), captor.capture());

        ClaimResponseEvent response = (ClaimResponseEvent) captor.getValue();
        assertEquals("CID124", response.getClaimId());
        assertEquals("CORR124", response.getCorrelationId());
        assertEquals("REJECTED", response.getStatus());
    }

    @Test
    void testHandleClaimRequest_RejectedWhenAmountTooHigh() {
        ClaimRequestEvent request = new ClaimRequestEvent("CID125", "POL125", 100000.0, "CORR125");

        processor.handleClaimRequest(request);

        ArgumentCaptor<Object> captor = ArgumentCaptor.forClass(Object.class);
        verify(kafkaTemplate).send(eq("claims.responses"), captor.capture());

        ClaimResponseEvent response = (ClaimResponseEvent) captor.getValue();
        assertEquals("CID125", response.getClaimId());
        assertEquals("CORR125", response.getCorrelationId());
        assertEquals("REJECTED", response.getStatus());
    }
}
