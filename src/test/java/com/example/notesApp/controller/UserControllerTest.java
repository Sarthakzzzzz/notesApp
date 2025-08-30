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
import jakarta.servlet.http.HttpServletRequest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private HttpServletRequest request;

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

        when(request.getAttribute("userId")).thenReturn(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        ResponseEntity<AppUser> response = userController.getProfile(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("john", response.getBody().getUsername());
    }

    @Test
    void testGetProfileNotFound() {
        when(request.getAttribute("userId")).thenReturn(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<AppUser> response = userController.getProfile(request);

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

        when(request.getAttribute("userId")).thenReturn(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.encode("123")).thenReturn("encodedPass");
        when(userRepository.save(any(AppUser.class))).thenReturn(existingUser);

        ResponseEntity<AppUser> response = userController.updateProfile(request, updatedUser);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("new", response.getBody().getUsername());
        assertNull(response.getBody().getPassword());
    }

    @Test
    void testUpdateProfileNotFound() {
        AppUser updatedUser = new AppUser();
        updatedUser.setUsername("new");

        when(request.getAttribute("userId")).thenReturn(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<AppUser> response = userController.updateProfile(request, updatedUser);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testDeleteProfileSuccess() {
        when(request.getAttribute("userId")).thenReturn(1L);
        when(userRepository.existsById(1L)).thenReturn(true);
        doNothing().when(userRepository).deleteById(1L);

        ResponseEntity<Void> response = userController.deleteProfile(request);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteProfileNotFound() {
        when(request.getAttribute("userId")).thenReturn(1L);
        when(userRepository.existsById(1L)).thenReturn(false);

        ResponseEntity<Void> response = userController.deleteProfile(request);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}