package com.example.HMS.patients.model;
import com.example.HMS.billings.model.Bill;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "Patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Patient ID

    private String name;
    private String gender;
    private int age;
    @Column(unique = true)
    private String phoneNumber;
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Appointments> appointment;
    // Default constructor
    public Patient() {}

    // Constructor
    public Patient(String name, String phoneNumber, String gender , int age) {

        this.name = name;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.age = age;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name =name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGender(){
        return gender;
    }
    public void setGender(String gender){
        this.gender=gender;
    }
    public int getAge(){
        return age;
    }
    public void setAge(int age){
        this.age= age;
    }
}


