
package com.example.HMS.insurances.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.HMS.insurances.model.Claim;
import com.example.HMS.insurances.repository.PostRepository;


@RestController

public class InsuranceController {


    @Autowired
    PostRepository postRepository;

    // get claim details
    @GetMapping("/claim/{id}")
    public String getInsuranceDetails(@PathVariable("id") String claimId) {
        return postRepository.findById(claimId).toString();
    }

    // create insurance claim
    @PostMapping("/claim/create")
    public String postInsuranceClaim(@RequestBody Claim claim) {
        return postRepository.save(claim).toString();
    }


} 