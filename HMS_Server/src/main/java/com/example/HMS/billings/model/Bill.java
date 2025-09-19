

package com.example.HMS.billings.model;

import java.time.LocalDate;

import com.example.HMS.patients.model.Patient;
import jakarta.persistence.*;

import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "Bills")
public class Bill {


    public enum BillStatus {
        PAID,
        UNPAID
        }

        @Id
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        private int billId;


    //one patient one many bill
        @OneToOne
        @JoinColumn(name="patientId")
       private Patient patient;

        private int amount;
        private LocalDate billingDate;
        @Enumerated(EnumType.STRING)
        private BillStatus status;

    @PrePersist
    protected void onCreate() {
        this.billingDate = LocalDate.now();
    }    

    public Bill() {
        // Default constructor
    }


    public Bill(Patient patient, int amount, BillStatus status) {
        this.patient = patient;
        this.amount = amount;
        this.status = status;
    }

    @Override
    public String toString() {
        return "Bill{" +
                "billId=" + billId +
                ", patientId=" + (patient != null ? patient.getId() : null) +
                ", amount=" + amount +
                ", billingDate=" + billingDate +
                ", status=" + status +
                '}';
    }

    public int getBillId() {
        return billId;
    }



    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public BillStatus getStatus() {
        return status;
    }

    public void setStatus(BillStatus status) {
        this.status = status;
    }

    public LocalDate getBillingDate() {
        return billingDate;
    }

    

}
