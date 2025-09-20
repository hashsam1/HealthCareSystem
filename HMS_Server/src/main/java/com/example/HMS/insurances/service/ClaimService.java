package com.example.HMS.insurances.service;

import com.example.HMS.billings.model.Bill;
import com.example.HMS.billings.repository.BillRepository;
import com.example.HMS.insurances.events.ClaimRequestEvent;
import com.example.HMS.insurances.model.Claim;
import com.example.HMS.insurances.repository.PostRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

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

    public void createAndSendClaim(double amount, String policyId) {
        // Create Bill
        Bill bill = new Bill();
        bill.setAmount(amount);
        bill.setStatus(Bill.BillStatus.UNPAID);
        billRepository.save(bill);

        // Create Claim
        Claim claim = new Claim();
        claim.setPolicyId(policyId);
        claim.setClaimAmount(amount);
        claim.setClaimStatus(Claim.ClaimStatus.PENDING);
        claim = claimRepository.save(claim);

        // Send Claim Request event
        ClaimRequestEvent event = new ClaimRequestEvent(
                claim.getClaimId(),
                policyId,
                amount,
                UUID.randomUUID().toString()
        );
        kafkaTemplate.send("claims.requests", event);
    }
}
