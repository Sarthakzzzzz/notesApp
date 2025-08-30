package com.example.notesApp.integration;

import com.example.notesApp.model.AppUser;
import com.example.notesApp.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AdminRoleTest {

    @Autowired
    private UserService userService;

    @Test
    void testSarthakHelloGetsAdminRole() {
        AppUser admin = new AppUser();
        admin.setUsername("sarthakhello");
        admin.setPassword("password123");
        admin.setEmail("admin@test.com");

        AppUser saved = userService.save(admin);
        assertEquals("ADMIN", saved.getRole());
    }

    @Test
    void testOtherUsersGetUserRole() {
        AppUser user = new AppUser();
        user.setUsername("regularuser");
        user.setPassword("password123");
        user.setEmail("user@test.com");

        AppUser saved = userService.save(user);
        assertEquals("USER", saved.getRole());
    }
}