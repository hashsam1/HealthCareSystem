package com.example.HMS.billings.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.HMS.billings.model.Bill;
import com.example.HMS.billings.repository.BillRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bill")
public class BillController {

    @Autowired
    BillRepository billRepository;

    //get all bill
    @GetMapping
    public List<Bill> getBills() {

        return billRepository.findAll();
    }
    // get bill details
    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBillDetails(@PathVariable int id) {
        Optional<Bill> bill = billRepository.findById(id);
        if (bill.isPresent()) {
            return ResponseEntity.ok(bill.get());  // Return Bill as JSON
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // 404 if bill not found
        }
    }

//    @GetMapping("/{id}")
//    public String getBillDetails(@PathVariable int id) {
//        return billRepository.findById(id).toString();
//    }
    
    // create bill
    @PostMapping("/create")
//    public String postBill(@RequestBody Bill bill) {
//        return billRepository.save(bill).toString();
//    }
    public ResponseEntity<Bill> postBill(@RequestBody Bill bill) {
        if (bill == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);  // 400 if request body is null
        }
        Bill savedBill = billRepository.save(bill);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBill);  // 201 if created successfully
    }

}