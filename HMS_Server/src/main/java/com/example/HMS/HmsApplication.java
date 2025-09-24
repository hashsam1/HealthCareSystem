package com.example.HMS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.GetMapping;

@EntityScan(basePackages = {
        "com.example.HMS.billings.model",
        "com.example.HMS.patients.model"
})
@SpringBootApplication
@EnableJpaRepositories(
        basePackages = {"com.example.HMS.billings.repository",
                "com.example.HMS.patients.repository"}// JPA repos
)
@EnableMongoRepositories(
        basePackages = "com.example.HMS.insurances.repository" // Mongo repos
)
public class HmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HmsApplication.class, args);
	}


    @GetMapping("/")
    public String home() {
        return "HMS Backend is Running ";
    }
}
