package com.example.HMS.patients.model;
import com.example.HMS.billings.model.Bill;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToOne;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.persistence.Column;
@Document(collection = "patients")
public class Patient {

    @Id

    private Long id; // Patient ID

    private String name;
    private String gender;
    private int age;
    @Column(unique = true)
    private String phoneNumber;
    @OneToOne(mappedBy = "patient", cascade = CascadeType.ALL)
    private Bill bill;
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

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }


    public void setName(String firstName) {
        this.name = firstName;
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


