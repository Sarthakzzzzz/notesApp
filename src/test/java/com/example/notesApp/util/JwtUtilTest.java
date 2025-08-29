package com.example.notesApp.util;

import com.example.notesApp.model.AppUser;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;

import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Date;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
    }

    @Test
    void testGenerateAndValidateToken() {
        // Arrange
        AppUser appUser = new AppUser();
        appUser.setId(1L);
        appUser.setUsername("john");
        appUser.setPassword("password");
        appUser.setRole("USER");

        String token = jwtUtil.generateToken(appUser);

        UserDetails springUser = User.withUsername("john")
                .password("password")
                .roles("USER")
                .build();

        // Act
        boolean isValid = jwtUtil.validateToken(token, springUser);

        // Assert
        assertTrue(isValid, "Token should be valid for correct user");
        assertEquals("john", jwtUtil.extractUsername(token));
    }

    @Test
    void testValidateTokenWithWrongUser() {
        // Arrange
        AppUser appUser = new AppUser();
        appUser.setId(2L);
        appUser.setUsername("alice");
        appUser.setPassword("pass123");
        appUser.setRole("USER");

        String token = jwtUtil.generateToken(appUser);

        UserDetails wrongUser = User.withUsername("bob")
                .password("diffpass")
                .roles("USER")
                .build();

        // Act
        boolean isValid = jwtUtil.validateToken(token, wrongUser);

        // Assert
        assertFalse(isValid, "Token should be invalid for wrong username");
    }

    @Test
    void testExpiredToken() {
        // Arrange
        AppUser appUser = new AppUser();
        appUser.setId(1L);
        appUser.setUsername("testUser");
        appUser.setPassword("password");
        appUser.setRole("USER");

        // Create an already expired token (expiration set in the past)
        String expiredToken = Jwts.builder()
                .setSubject(appUser.getUsername())
                .claim("role", appUser.getRole())
                .claim("userId", appUser.getId())
                .setIssuedAt(new Date(System.currentTimeMillis())) // issued now
                .setExpiration(new Date(System.currentTimeMillis() - 5000)) // expired 5s ago
                .signWith(jwtUtil.getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

        // Act
        boolean isValid = jwtUtil.validateToken(expiredToken,
                org.springframework.security.core.userdetails.User
                        .withUsername("testUser")
                        .password("password")
                        .roles("USER")
                        .build());

        // Assert
        assertFalse(isValid, "Expired token should not be valid");
    }
}
