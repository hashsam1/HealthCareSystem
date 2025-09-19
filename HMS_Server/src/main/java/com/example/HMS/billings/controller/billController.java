package com.example.HMS.billings.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.HMS.billings.model.Bill;
import com.example.HMS.billings.repository.BillRepository;

@RestController
public class BillController {

    @Autowired
    BillRepository billRepository;

    // get bill details
    @GetMapping("/bill/{id}")
    public String getBillDetails(@PathVariable int id) {
        return billRepository.findById(id).toString();
    }
    
    // create bill
    @PostMapping("/bill/create")
    public String postBill(@RequestBody Bill bill) {
        return billRepository.save(bill).toString();
    }
}