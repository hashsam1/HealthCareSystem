package com.example.HMS.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // ✅ new style for disabling CSRF
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // ✅ new style for permitAll
                )
                .httpBasic(Customizer.withDefaults()); // optional, can remove

        return http.build();
    }
}
