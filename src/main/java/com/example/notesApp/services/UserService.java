package com.example.notesApp.services;

import com.example.notesApp.model.AppUser;
import com.example.notesApp.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<AppUser> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public AppUser save(AppUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Only sarthakhello can be admin, everyone else is USER
        if ("sarthakhello".equals(user.getUsername())) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }
        return userRepository.save(user);
    }

    public AppUser registerUser(String username, String password, String email) {
        AppUser user = new AppUser();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        // Only sarthakhello can be admin, everyone else is USER
        if ("sarthakhello".equals(username)) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }
        return userRepository.save(user);
    }
}
