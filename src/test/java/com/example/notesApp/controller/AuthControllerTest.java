package com.example.notesApp.controller;

import com.example.notesApp.model.AppUser;
import com.example.notesApp.services.UserService;
import com.example.notesApp.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthControllerTest {
        @Mock
        private UserService userService;

        @Mock
        private PasswordEncoder passwordEncoder;

        @Mock
        private JwtUtil jwtUtil;

        @InjectMocks
        private AuthController authController;

        @BeforeEach
        void setUp() {
                MockitoAnnotations.openMocks(this);
        }

        @Test
        void testRegister() {
                AppUser user = new AppUser();
                user.setUsername("john");
                user.setPassword("pass");

                when(userService.save(any(AppUser.class))).thenReturn(user);

                ResponseEntity<AppUser> response = authController.register(user);
                assertEquals(HttpStatus.OK, response.getStatusCode());
                assertNull(response.getBody().getPassword()); // password should be null in response
        }

        @Test
        void testLoginSuccess() {
                AppUser user = new AppUser();
                user.setId(1L);
                user.setUsername("john");
                user.setPassword("encodedPass");
                user.setRole("USER");
                user.setEmail("john@example.com");

                when(userService.findByUsername("john")).thenReturn(Optional.of(user));
                when(passwordEncoder.matches("rawPass", "encodedPass")).thenReturn(true);
                when(jwtUtil.generateToken(user)).thenReturn("fake-jwt");

                AppUser loginRequest = new AppUser();
                loginRequest.setUsername("john");
                loginRequest.setPassword("rawPass");

                ResponseEntity<?> response = authController.login(loginRequest);

                assertEquals(HttpStatus.OK, response.getStatusCode());
                assertTrue(response.getBody() instanceof AuthController.LoginResponse);
        }

        @Test
        void testLoginInvalidPassword() {
                AppUser user = new AppUser();
                user.setUsername("john");
                user.setPassword("encodedPass");

                when(userService.findByUsername("john")).thenReturn(Optional.of(user));
                when(passwordEncoder.matches("wrongPass", "encodedPass")).thenReturn(false);

                AppUser loginRequest = new AppUser();
                loginRequest.setUsername("john");
                loginRequest.setPassword("wrongPass");

                ResponseEntity<?> response = authController.login(loginRequest);

                assertEquals(HttpStatus.OK, response.getStatusCode());
                assertEquals("Invalid username or password", response.getBody());
        }
}
