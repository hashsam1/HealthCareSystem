package com.example.HMS.insurances.event;

import com.example.HMS.insurances.events.ClaimResponseEvent;
import com.example.HMS.insurances.model.Claim;
import com.example.HMS.billings.model.Bill;
import com.example.HMS.insurances.repository.PostRepository;
import com.example.HMS.billings.repository.BillRepository;
import com.example.HMS.insurances.service.ClaimResponseListener;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

class ClaimResponseListenerTest {

    @Test
    void testOnClaimResponse_Approved() {
        // Mock repos
        PostRepository claimRepository = Mockito.mock(PostRepository.class);
        BillRepository billRepository = Mockito.mock(BillRepository.class);

        ClaimResponseListener listener = new ClaimResponseListener(claimRepository, billRepository);

        // Prepare Claim with billId = 1
        Claim claim = new Claim();
        claim.setClaimId("CID2");
        claim.setBillId(1);

        // Prepare Bill (no need to set ID, JPA handles it)
        Bill bill = new Bill(200.0, Bill.BillStatus.UNPAID);

        // Stub mocks
        Mockito.when(claimRepository.findById("CID2")).thenReturn(Optional.of(claim));
        Mockito.when(billRepository.findById(1)).thenReturn(Optional.of(bill));

        // Event with APPROVED
        ClaimResponseEvent event = new ClaimResponseEvent(
                "CID2",
                "CORR999",
                "APPROVED",
                "INSURER123"
        );

        // Execute
        listener.onClaimResponse(event);

        // Verify side effects
        Mockito.verify(claimRepository).save(claim);
        Mockito.verify(billRepository).save(bill);
        assert bill.getStatus() == Bill.BillStatus.PAID;
    }

    @Test
    void testOnClaimResponse_Rejected() {
        PostRepository claimRepository = Mockito.mock(PostRepository.class);
        BillRepository billRepository = Mockito.mock(BillRepository.class);

        ClaimResponseListener listener = new ClaimResponseListener(claimRepository, billRepository);

        Claim claim = new Claim();
        claim.setClaimId("CID3");
        claim.setBillId(2);

        Mockito.when(claimRepository.findById("CID3")).thenReturn(Optional.of(claim));

        ClaimResponseEvent event = new ClaimResponseEvent(
                "CID3",
                "CORR123",
                "REJECTED",
                "INSURER456"
        );

        listener.onClaimResponse(event);

        Mockito.verify(claimRepository).save(claim);
        Mockito.verifyNoInteractions(billRepository);
        assert claim.getClaimStatus() == Claim.ClaimStatus.REJECTED;
    }
}
