package com.learn.Hotelbooking.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.learn.Hotelbooking.security.jwt.AuthEntryPointJwt;
import com.learn.Hotelbooking.security.jwt.AuthTokenFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private AuthEntryPointJwt authEntryPointJwt;

    @Autowired
    private AuthTokenFilter authTokenFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowCredentials(true);
                config.addAllowedOrigin("http://localhost:5173");
                config.addAllowedHeader("*");
                config.addAllowedMethod("*");
                return config;
            }))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/users/register",
                    "/auth/login",
                    "/users/*/check",
                    "/hotels/**",
                    "/rooms/**",
                    "/bookings",               // ✅ allow booking creation
                    "/bookings/confirm-payment", // ✅ allow payment confirmation
                    "/payments/create-order"   // ✅ allow Razorpay order creation
                ).permitAll()
                .anyRequest().authenticated()
            )
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint(authEntryPointJwt)
            )
            .addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
