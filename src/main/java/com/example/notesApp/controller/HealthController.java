package com.example.notesApp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "message", "NotesApp Backend is running!");
    }

    @GetMapping("/healthz")
    public String healthz() {
        return "OK";
    }

    @GetMapping("/")
    public String root() {
        return "NotesApp API is running";
    }
}