package com.example.HMS.insurances.service;

import com.example.HMS.billings.model.Bill;
import com.example.HMS.billings.repository.BillRepository;
import com.example.HMS.insurances.events.ClaimRequestEvent;
import com.example.HMS.insurances.model.Claim;
import com.example.HMS.insurances.repository.PostRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ClaimService {

    private final BillRepository billRepository;
    private final PostRepository claimRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public ClaimService(BillRepository billRepository,
                        PostRepository claimRepository,
                        KafkaTemplate<String, Object> kafkaTemplate) {
        this.billRepository = billRepository;
        this.claimRepository = claimRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public Claim getClaimById(String claimId) {
        return claimRepository.findById(claimId).orElse(null);
    }
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public Claim createAndSendClaim(double amount, String policyId,int billId) {
        Claim existingClaim = claimRepository.findByBillId(billId);
        if (existingClaim != null) {
            throw new IllegalStateException("A claim already exists for this billId: " + billId);
        }

        // Fetch the bill
        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new IllegalArgumentException("Bill not found with id: " + billId));


        // Create Claim
        Claim claim = new Claim();
        claim.setPolicyId(policyId);
        claim.setClaimAmount(amount);
        claim.setBillId(billId);                  // ✅ set billId
        claim.setClaimDate(new java.util.Date());
        claim.setClaimStatus(Claim.ClaimStatus.PENDING);
        claim = claimRepository.save(claim);

        // Send Claim Request event
        ClaimRequestEvent event = new ClaimRequestEvent(
                claim.getClaimId(),
                policyId,
                amount,
                UUID.randomUUID().toString()
        );
        System.out.println(" Sending claim request event for claimId: " + claim.getClaimId());

        kafkaTemplate.send("claims.requests", event);
        System.out.println(" Sent claim request: " + event.getClaimId());
        return claim;
    }
}
