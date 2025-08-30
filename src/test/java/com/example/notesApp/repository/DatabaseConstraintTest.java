package com.example.notesApp.repository;

import com.example.notesApp.model.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class DatabaseConstraintTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testUniqueUsernameConstraint() {
        AppUser user1 = new AppUser();
        user1.setUsername("duplicate");
        user1.setPassword("pass1");
        user1.setEmail("user1@test.com");
        user1.setRole("USER");

        AppUser user2 = new AppUser();
        user2.setUsername("duplicate");
        user2.setPassword("pass2");
        user2.setEmail("user2@test.com");
        user2.setRole("USER");

        userRepository.save(user1);
        
        assertThrows(DataIntegrityViolationException.class, () -> {
            userRepository.save(user2);
            userRepository.flush();
        });
    }

    @Test
    void testUniqueEmailConstraint() {
        AppUser user1 = new AppUser();
        user1.setUsername("user1");
        user1.setPassword("pass1");
        user1.setEmail("duplicate@test.com");
        user1.setRole("USER");

        AppUser user2 = new AppUser();
        user2.setUsername("user2");
        user2.setPassword("pass2");
        user2.setEmail("duplicate@test.com");
        user2.setRole("USER");

        userRepository.save(user1);
        
        assertThrows(DataIntegrityViolationException.class, () -> {
            userRepository.save(user2);
            userRepository.flush();
        });
    }
}