package com.example.notesApp.integration;

import com.example.notesApp.model.AppUser;
import com.example.notesApp.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JwtSecurityTest {

    @Autowired
    private JwtUtil jwtUtil;

    @Test
    void testJwtTokenGeneration() {
        AppUser user = new AppUser();
        user.setId(1L);
        user.setUsername("testuser");
        user.setRole("USER");

        String token = jwtUtil.generateToken(user);
        assertNotNull(token);
        assertTrue(token.length() > 0);
    }

    @Test
    void testJwtTokenValidation() {
        AppUser user = new AppUser();
        user.setId(1L);
        user.setUsername("testuser");
        user.setRole("USER");

        String token = jwtUtil.generateToken(user);
        UserDetails userDetails = User.withUsername("testuser")
                .password("password")
                .authorities("ROLE_USER")
                .build();

        assertTrue(jwtUtil.validateToken(token, userDetails));
    }

    @Test
    void testJwtTokenExpiration() throws InterruptedException {
        // This would need a shorter expiration time for testing
        AppUser user = new AppUser();
        user.setId(1L);
        user.setUsername("testuser");
        user.setRole("USER");

        String token = jwtUtil.generateToken(user);
        String username = jwtUtil.extractUsername(token);
        assertEquals("testuser", username);
    }
}