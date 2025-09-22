package com.example.HMS.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import jakarta.annotation.PostConstruct;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class TruststoreConfig {

    @PostConstruct
    public void init() throws IOException {
        // Load truststore from resources
        ClassPathResource resource = new ClassPathResource("client.truststore.jks");

        // Copy to temporary file
        File tempFile = File.createTempFile("client-truststore", ".jks");
        try (InputStream in = resource.getInputStream();
             FileOutputStream out = new FileOutputStream(tempFile)) {
            in.transferTo(out);
        }

        // Set system property so Kafka picks it up
        System.setProperty("spring.kafka.properties.ssl.truststore.location", tempFile.getAbsolutePath());
        System.setProperty("spring.kafka.properties.ssl.truststore.password", "changeit");
        System.setProperty("spring.kafka.properties.ssl.truststore.type", "JKS");

        System.out.println("✅ Truststore loaded from classpath and copied to: " + tempFile.getAbsolutePath());
    }
}
