package com.example.notesApp.services;

import com.example.notesApp.model.AppUser;
import com.example.notesApp.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindByUsernameFound() {
        AppUser user = new AppUser();
        user.setUsername("john");

        when(userRepository.findByUsername("john")).thenReturn(Optional.of(user));

        Optional<AppUser> result = userService.findByUsername("john");

        assertTrue(result.isPresent());
        assertEquals("john", result.get().getUsername());
    }

    @Test
    void testFindByUsernameNotFound() {
        when(userRepository.findByUsername("jane")).thenReturn(Optional.empty());

        Optional<AppUser> result = userService.findByUsername("jane");

        assertFalse(result.isPresent());
    }

    @Test
    void testSaveUser() {
        AppUser user = new AppUser();
        user.setPassword("plain");

        when(passwordEncoder.encode("plain")).thenReturn("hashed");
        when(userRepository.save(any(AppUser.class))).thenAnswer(inv -> inv.getArgument(0));

        AppUser saved = userService.save(user);

        assertEquals("hashed", saved.getPassword());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testRegisterUser() {
        when(passwordEncoder.encode("1234")).thenReturn("hashed1234");
        when(userRepository.save(any(AppUser.class))).thenAnswer(inv -> inv.getArgument(0));

        AppUser saved = userService.registerUser("alice", "1234", "alice@mail.com");

        assertEquals("alice", saved.getUsername());
        assertEquals("hashed1234", saved.getPassword());
        assertEquals("alice@mail.com", saved.getEmail());
    }
}
