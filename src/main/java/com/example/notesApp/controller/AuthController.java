package com.example.notesApp.controller;

import com.example.notesApp.model.User;
import com.example.notesApp.services.UserService;
import com.example.notesApp.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

   // new user 
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User savedUser = userService.save(user);
        savedUser.setPassword(null); // 
        return ResponseEntity.ok(savedUser);
    }

    // login with jwt token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> optionalUser = userService.findByUsername(user.getUsername());
        if (optionalUser.isEmpty())
            return ResponseEntity.status(401).body("Invalid username or password");

        User existingUser = optionalUser.get();
        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        String token = jwtUtil.generateToken(existingUser);

        return ResponseEntity.ok(
                new LoginResponse(token, existingUser.getId(), existingUser.getUsername(),
                        existingUser.getRole(), existingUser.getEmail()));
    }

    // example
    public static class LoginResponse {
        public String accessToken;
        public long id;
        public String username;
        public String role;
        public String email;

        public LoginResponse(String accessToken, long id, String username, String role, String email) {
            this.accessToken = accessToken;
            this.id = id;
            this.username = username;
            this.role = role;
            this.email = email;
        }
    }
}
