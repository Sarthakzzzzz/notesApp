package com.example.notesApp.controller;

import com.example.notesApp.model.AppUser;
import com.example.notesApp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    private Long getCurrentUserId(@RequestHeader("X-User-Id") Long userId) {
        return userId;
    }

    // GET/me -> get profile
    @GetMapping
    public ResponseEntity<AppUser> getProfile(@RequestHeader("X-User-Id") Long userId) {
        return userRepository.findById(getCurrentUserId(userId)).map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    // GET/me -> update profile
    @PutMapping
    public ResponseEntity<AppUser> updateProfile(@RequestHeader("X-User-Id") Long userId, @RequestBody AppUser updatedUser) {
        Optional<AppUser> optionalUser = userRepository.findById(getCurrentUserId(userId));
        if (optionalUser.isEmpty())
            return ResponseEntity.notFound().build();

        AppUser user = optionalUser.get();
        user.setUsername(updatedUser.getUsername());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    // DELETE /me -> delete profile
    @DeleteMapping
    public ResponseEntity<Void> deleteProfile(@RequestHeader("X-User-Id") Long userId) {
        if (userRepository.existsById(getCurrentUserId(userId))) {
            userRepository.deleteById(getCurrentUserId(userId));
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}