package com.example.HMS.billings.repository;

import com.example.HMS.billings.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {
    // You can add custom query methods here if needed
}
