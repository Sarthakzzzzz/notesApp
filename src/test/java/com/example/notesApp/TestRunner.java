package com.example.notesApp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TestRunner {

    @Test
    void contextLoads() {
        // Simple test to verify Spring context loads
        assertTrue(true);
        System.out.println("✅ Spring Boot context loaded successfully!");
    }

    @Test
    void basicAssertions() {
        assertEquals(2, 1 + 1);
        assertNotNull("NotesApp");
        assertTrue("NotesApp".contains("Notes"));
        System.out.println("✅ Basic assertions passed!");
    }

    @Test
    void testEnvironment() {
        String javaVersion = System.getProperty("java.version");
        assertNotNull(javaVersion);
        System.out.println("✅ Java version: " + javaVersion);
        System.out.println("✅ Test environment ready!");
    }
}