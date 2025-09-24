
package com.example.HMS.insurances.service;


import com.example.HMS.insurances.events.ClaimRequestEvent;
import com.example.HMS.insurances.events.ClaimResponseEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InsurerClaimProcessor {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public InsurerClaimProcessor(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }


    @KafkaListener(topics = "claims.requests", groupId = "insurer")
    public void handleClaimRequest(ClaimRequestEvent request) {
        System.out.println("Insurer received claim: " + request);

        String status;
        if (request.getPolicyId() == null || request.getPolicyId().isBlank()) {
            status = "REJECTED";
        } else if (request.getClaimAmount() <= 50000) {
            status = "APPROVED";
        } else {
            status = "REJECTED";
        }

        ClaimResponseEvent response = new ClaimResponseEvent(
                request.getClaimId(),
                request.getCorrelationId(),
                status,
                UUID.randomUUID().toString()
        );

        kafkaTemplate.send("claims.responses", response);
        //System.out.println("📥 Insurer received claim: " + request.getClaimId() + " -> " + request.getClaimAmount());

    }
}
