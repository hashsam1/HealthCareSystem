package com.example.HMS.insurances.controller;

import com.example.HMS.insurances.model.Claim;
import com.example.HMS.insurances.service.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/claims")
public class InsuranceController {

    private final ClaimService claimService;

    public InsuranceController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @GetMapping
    public List<Claim> getAllClaims() {
        return claimService.getAllClaims();
    }

    // Get claim details
    @GetMapping("/{id}")
    public Claim getInsuranceDetails(@PathVariable("id") String claimId) {
        return claimService.getClaimById(claimId);
    }

    // Create insurance claim (use Claim directly)
    @PostMapping
    public Claim postInsuranceClaim(@RequestBody Claim claim) {
        return claimService.createAndSendClaim(
                claim.getClaimAmount(),
                claim.getPolicyId(),
                claim.getBillId()
        );
    }
}
