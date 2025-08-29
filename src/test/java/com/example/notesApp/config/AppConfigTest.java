package com.example.notesApp.config;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class AppConfigTest {

    private final AppConfig appConfig = new AppConfig();

    @Test
    void testPasswordEncoderBean() {
        BCryptPasswordEncoder encoder = appConfig.passwordEncoder();
        String raw = "secret";
        String encoded = encoder.encode(raw);

        assertNotNull(encoded);
        assertTrue(encoder.matches(raw, encoded));
    }
}
