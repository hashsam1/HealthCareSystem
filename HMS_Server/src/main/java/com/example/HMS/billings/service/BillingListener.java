package com.example.HMS.billings.service;

import com.example.HMS.billings.model.Bill;
import com.example.HMS.billings.repository.BillRepository;
import com.example.HMS.patients.events.AppointmentCompletedEvent;
import com.example.HMS.patients.model.Appointments;
import com.example.HMS.patients.repository.AppointmentsRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
//thi  is consumer
@Service
public class BillingListener {

    private final BillRepository billRepository;
    private final AppointmentsRepository appointmentsRepository;

    public BillingListener(BillRepository billRepository, AppointmentsRepository appointmentsRepository) {
        this.billRepository = billRepository;
        this.appointmentsRepository = appointmentsRepository;
    }

    @KafkaListener(topics = "appointments.completed", groupId = "billing")
    public void handleAppointmentCompleted(AppointmentCompletedEvent event) {
        Appointments appointment = appointmentsRepository.findById(event.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found for billing"));

        Bill bill = new Bill();
        bill.setAppointment(appointment);
        bill.setAmount(event.getConsultationFee());
        bill.setStatus(Bill.BillStatus.UNPAID);

        billRepository.save(bill);

        System.out.println("✅ Bill generated for appointment " + event.getAppointmentId());
    }
}
