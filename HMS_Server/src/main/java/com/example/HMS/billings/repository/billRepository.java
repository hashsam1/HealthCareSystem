package com.example.HMS.billings.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.HMS.billings.model.Bill;

public interface BillRepository extends JpaRepository<Bill, Integer> {
	// You can add custom query methods here if needed
}
