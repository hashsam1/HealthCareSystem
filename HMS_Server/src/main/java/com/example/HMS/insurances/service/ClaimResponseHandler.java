package com.example.HMS.insurances.service;

import com.example.HMS.billings.model.Bill;
import com.example.HMS.billings.repository.BillRepository;
import com.example.HMS.insurances.events.ClaimResponseEvent;
import com.example.HMS.insurances.model.Claim;
import com.example.HMS.insurances.repository.PostRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ClaimResponseHandler {

    private final PostRepository claimRepository;
    private final BillRepository billRepository;

    public ClaimResponseHandler(PostRepository claimRepository, BillRepository billRepository) {
        this.claimRepository = claimRepository;
        this.billRepository = billRepository;
    }

    @KafkaListener(topics = "claims.responses", groupId = "claims-service")
    public void handleClaimResponse(ClaimResponseEvent response) {
        System.out.println("Received claim response: " + response.getClaimId() + " -> " + response.getStatus());

        claimRepository.findById(response.getClaimId()).ifPresent(
                claim -> {
            if ("APPROVED".equalsIgnoreCase(response.getStatus())) {
                claim.setClaimStatus(Claim.ClaimStatus.APPROVED);

                // ✅ Update bill to PAID
                billRepository.findById(claim.getBillId()).ifPresent(bill -> {
                    bill.setStatus(Bill.BillStatus.PAID);
                    billRepository.save(bill);
                });

            } else {
                claim.setClaimStatus(Claim.ClaimStatus.REJECTED);
            }

            claimRepository.save(claim);
        });
    }
}
