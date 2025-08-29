package com.example.notesApp.controller;

import com.example.notesApp.model.AppUser;
import com.example.notesApp.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserController userController;

    public UserControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetProfileFound() {
        AppUser user = new AppUser();
        user.setId(1L);
        user.setUsername("john");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        ResponseEntity<AppUser> response = userController.getProfile(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("john", response.getBody().getUsername());
    }

    @Test
    void testGetProfileNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<AppUser> response = userController.getProfile(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testUpdateProfileSuccess() {
        AppUser existingUser = new AppUser();
        existingUser.setId(1L);
        existingUser.setUsername("old");

        AppUser updatedUser = new AppUser();
        updatedUser.setUsername("new");
        updatedUser.setPassword("123");

        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.encode("123")).thenReturn("encodedPass");
        when(userRepository.save(any(AppUser.class))).thenReturn(existingUser);

        ResponseEntity<AppUser> response = userController.updateProfile(1L, updatedUser);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("new", response.getBody().getUsername());
        assertEquals("encodedPass", response.getBody().getPassword());
    }

    @Test
    void testUpdateProfileNotFound() {
        AppUser updatedUser = new AppUser();
        updatedUser.setUsername("new");

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<AppUser> response = userController.updateProfile(1L, updatedUser);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testDeleteProfileSuccess() {
        when(userRepository.existsById(1L)).thenReturn(true);
        doNothing().when(userRepository).deleteById(1L);

        ResponseEntity<Void> response = userController.deleteProfile(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteProfileNotFound() {
        when(userRepository.existsById(1L)).thenReturn(false);

        ResponseEntity<Void> response = userController.deleteProfile(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
