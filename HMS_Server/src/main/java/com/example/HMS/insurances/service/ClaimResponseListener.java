package com.example.HMS.insurances.service;
import com.example.HMS.billings.repository.BillRepository;
import com.example.HMS.insurances.events.ClaimResponseEvent;
import com.example.HMS.insurances.repository.PostRepository;
import org.springframework.stereotype.Service;

import com.example.HMS.insurances.model.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.HMS.billings.model.Bill;
import org.springframework.kafka.annotation.KafkaListener;


@Service
public class ClaimResponseListener {

    private final PostRepository claimRepository;
    private final BillRepository billRepository;

    public ClaimResponseListener(PostRepository claimRepository, BillRepository billRepository) {
        this.claimRepository = claimRepository;
        this.billRepository = billRepository;
    }

    @KafkaListener(topics = "claims.responses", groupId = "hospital")
    public void onClaimResponse(ClaimResponseEvent resp) {
        Claim claim = claimRepository.findById(resp.getClaimId()).orElse(null);
        if (claim == null) return;

        if ("APPROVED".equalsIgnoreCase(resp.getStatus())) {
            claim.setClaimStatus(Claim.ClaimStatus.APPROVED);

            // mark bill as paid
            Bill bill = billRepository.findAll().stream()
                    .filter(b -> b.getAmount() == claim.getClaimAmount())
                    .findFirst().orElse(null);
            if (bill != null) {
                bill.setStatus(Bill.BillStatus.PAID);
                billRepository.save(bill);
            }
        } else {
            claim.setClaimStatus(Claim.ClaimStatus.REJECTED);
        }

        claimRepository.save(claim);
    }
}
