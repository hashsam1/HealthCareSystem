

package com.example.HMS.billings.model;

import java.time.LocalDate;

import com.example.HMS.patients.model.Appointments;
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
        @JoinColumn(name="appointment_id")
       private Appointments appointment;

        private double amount;
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


    public Bill( double amount, BillStatus status) {

        this.amount = amount;
        this.status = status;
    }

    @Override
    public String toString() {
        return "Bill{" +
                "billId=" + billId +
                ", amount=" + amount +
                ", billingDate=" + billingDate +
                ", status=" + status +
                ", appointment=" +  (appointment != null ? appointment.getAppointment_id() : null) +
                '}';
    }

    public int getBillId() {
        return billId;
    }


    public Appointments getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointments appointment) {
        this.appointment = appointment;
    }


    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
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
