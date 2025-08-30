package com.example.notesApp.controller;

import com.example.notesApp.model.AppUser;
import com.example.notesApp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/me")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private Long getCurrentUserId(HttpServletRequest request) {
        return (Long) request.getAttribute("userId");
    }

    // GET/me -> get profile
    @GetMapping
    public ResponseEntity<AppUser> getProfile(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        return userRepository.findById(userId).map(user -> {
            user.setPassword(null); // Hide password response
            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.notFound().build());
    }

    // PUT/me -> update profile
    @PutMapping
    public ResponseEntity<AppUser> updateProfile(HttpServletRequest request, @RequestBody AppUser updatedUser) {
        Long userId = getCurrentUserId(request);
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        Optional<AppUser> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty())
            return ResponseEntity.notFound().build();

        AppUser user = optionalUser.get();
        user.setUsername(updatedUser.getUsername());
        if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
            user.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        userRepository.save(user);
        user.setPassword(null); // Hide password response
        return ResponseEntity.ok(user);
    }

    // DELETE /me -> delete profile
    @DeleteMapping
    public ResponseEntity<Void> deleteProfile(HttpServletRequest request) {
        Long userId = getCurrentUserId(request);
        if (userId == null) {
            return ResponseEntity.status(401).build();
        }
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // GET /me/all -> get all users (admin only)
    @GetMapping("/all")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        List<AppUser> users = userRepository.findAll();
        users.forEach(user -> user.setPassword(null)); // Hide passwords
        return ResponseEntity.ok(users);
    }
}