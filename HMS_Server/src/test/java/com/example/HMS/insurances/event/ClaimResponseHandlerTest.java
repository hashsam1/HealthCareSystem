package com.example.HMS.insurances.event;

import com.example.HMS.billings.model.Bill;
import com.example.HMS.billings.repository.BillRepository;
import com.example.HMS.insurances.events.ClaimResponseEvent;
import com.example.HMS.insurances.model.Claim;
import com.example.HMS.insurances.repository.PostRepository;
import com.example.HMS.insurances.service.ClaimResponseHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ClaimResponseHandlerTest {

    @Mock
    private PostRepository claimRepository;

    @Mock
    private BillRepository billRepository;

    @InjectMocks
    private ClaimResponseHandler handler;

    private Claim claim;
    private Bill bill;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Dummy claim + bill
        claim = new Claim();
        claim.setClaimId("CID123");
        claim.setBillId(1);

        bill = new Bill();
        bill.setStatus(Bill.BillStatus.UNPAID);
    }

    @Test
    void testHandleApprovedClaimResponse() {
        ClaimResponseEvent event = new ClaimResponseEvent("CID123", "CORR1", "APPROVED", "INS001");

        when(claimRepository.findById("CID123")).thenReturn(Optional.of(claim));
        when(billRepository.findById(1)).thenReturn(Optional.of(bill));

        handler.handleClaimResponse(event);

        // Verify claim status updated
        ArgumentCaptor<Claim> claimCaptor = ArgumentCaptor.forClass(Claim.class);
        verify(claimRepository).save(claimCaptor.capture());
        assertEquals(Claim.ClaimStatus.APPROVED, claimCaptor.getValue().getClaimStatus());

        // Verify bill status updated
        ArgumentCaptor<Bill> billCaptor = ArgumentCaptor.forClass(Bill.class);
        verify(billRepository).save(billCaptor.capture());
        assertEquals(Bill.BillStatus.PAID, billCaptor.getValue().getStatus());
    }

    @Test
    void testHandleRejectedClaimResponse() {
        ClaimResponseEvent event = new ClaimResponseEvent("CID123", "CORR2", "REJECTED", "INS002");

        when(claimRepository.findById("CID123")).thenReturn(Optional.of(claim));

        handler.handleClaimResponse(event);

        // Verify claim status updated to REJECTED
        ArgumentCaptor<Claim> claimCaptor = ArgumentCaptor.forClass(Claim.class);
        verify(claimRepository).save(claimCaptor.capture());
        assertEquals(Claim.ClaimStatus.REJECTED, claimCaptor.getValue().getClaimStatus());

        // Bill should not be updated
        verify(billRepository, never()).save(any());
    }

    @Test
    void testHandleClaimResponse_ClaimNotFound() {
        ClaimResponseEvent event = new ClaimResponseEvent("CID999", "CORR3", "APPROVED", "INS003");

        when(claimRepository.findById("CID999")).thenReturn(Optional.empty());

        handler.handleClaimResponse(event);

        // Nothing should be saved if claim not found
        verify(claimRepository, never()).save(any());
        verify(billRepository, never()).save(any());
    }
}
