package com.example.HMS.billings.controller;
import com.example.HMS.billings.model.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.HMS.billings.repository.BillRepository;

import java.util.List;

@RestController
public class BillController {

    @Autowired
    BillRepository billRepository;

    //get all bill
    @GetMapping("/bill")
    public List<Bill> getBills() {
        return billRepository.findAll();
    }

    // get bill details
    @GetMapping("/bill/{id}")
    public String getBillDetails(@PathVariable int id) {

        return billRepository.findById(id).toString();
    }
    //  Fetch Bill by appointmentId directly
    @GetMapping("/byAppointment/{appointmentId}")
    public ResponseEntity<Bill> getBillByAppointmentId(@PathVariable Long appointmentId) {
        return billRepository.findByAppointmentId(appointmentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // create bill
    @PostMapping("/bill/create")
    public String postBill(@RequestBody Bill bill) {
        return billRepository.save(bill).toString();
    }
}