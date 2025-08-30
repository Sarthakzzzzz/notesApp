package com.example.notesApp.config;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.notesApp.security.JwtRequestFilter;

import static org.junit.jupiter.api.Assertions.*;

class SecurityConfigTest {

    private final SecurityConfig securityConfig;

    public SecurityConfigTest() {
        this.securityConfig = new SecurityConfig(Mockito.mock(JwtRequestFilter.class));
    }

    @Test
    void testPasswordEncoderBean() {
        BCryptPasswordEncoder encoder = securityConfig.passwordEncoder();
        assertNotNull(encoder);
        assertTrue(encoder.encode("test").length() > 0);
    }

    @Test
    void testFilterChainBean() throws Exception {
        HttpSecurity http = Mockito.mock(HttpSecurity.class, Mockito.RETURNS_DEEP_STUBS);
        SecurityFilterChain chain = securityConfig.filterChain(http);

        assertNotNull(chain);
    }
}
