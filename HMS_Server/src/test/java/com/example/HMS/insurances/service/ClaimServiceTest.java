package com.example.HMS.insurances.service;

import com.example.HMS.billings.model.Bill;
import com.example.HMS.billings.repository.BillRepository;
import com.example.HMS.insurances.events.ClaimRequestEvent;
import com.example.HMS.insurances.model.Claim;
import com.example.HMS.insurances.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClaimServiceTest {

    @Mock
    private BillRepository billRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private KafkaTemplate<String, Object> kafkaTemplate;

    @InjectMocks
    private ClaimService claimService;

    @Test
    void testCreateAndSendClaim_Success() {
        Bill bill = new Bill();
        bill.setAmount(500.0);

        when(billRepository.findById(1)).thenReturn(Optional.of(bill));
        when(postRepository.findByBillId(1)).thenReturn(null);

        Claim savedClaim = new Claim();
        savedClaim.setClaimId(UUID.randomUUID().toString());
        savedClaim.setBillId(1);
        savedClaim.setPolicyId("POL123");
        savedClaim.setClaimAmount(500.0);

        when(postRepository.save(any(Claim.class))).thenReturn(savedClaim);

        Claim result = claimService.createAndSendClaim(500.0, "POL123", 1);

        assertNotNull(result);
        assertEquals("POL123", result.getPolicyId());
        verify(kafkaTemplate).send(eq("claims.requests"), any(ClaimRequestEvent.class));
    }

    @Test
    void testCreateAndSendClaim_BillNotFound() {
        when(billRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> claimService.createAndSendClaim(500.0, "POL123", 1));
    }

    @Test
    void testCreateAndSendClaim_DuplicateClaim() {
        Claim existingClaim = new Claim();
        when(postRepository.findByBillId(1)).thenReturn(existingClaim);

        assertThrows(IllegalStateException.class,
                () -> claimService.createAndSendClaim(500.0, "POL123", 1));
    }
}
