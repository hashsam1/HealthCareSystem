
package com.example.HMS.insurances.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.HMS.insurances.model.Claim;
import com.example.HMS.insurances.repository.PostRepository;

import java.util.Optional;


@RestController
@RequestMapping("/api/claims")
public class InsuranceController {


    @Autowired
    PostRepository postRepository;

    // get claim details

    @GetMapping("/{id}")
    public ResponseEntity<Claim> getInsuranceDetails(@PathVariable("id") String claimId) {
        Optional<Claim> claim = postRepository.findById(claimId);

        if (claim.isPresent()) {
            return ResponseEntity.ok(claim.get());  // Spring Boot automatically serializes to JSON
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // If claim not found
        }
    }
    // create insurance claim
    @PostMapping("/create")
    public ResponseEntity<Claim> postInsuranceClaim(@RequestBody Claim claim) {
        Claim savedClaim = postRepository.save(claim);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedClaim);  // Return saved claim as JSON
    }

} 