package com.example.notesApp.controller;

import com.example.notesApp.model.AppUser;
import com.example.notesApp.model.Note;
import com.example.notesApp.repository.UserRepository;
import com.example.notesApp.repository.Noterepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/debug")
public class DebugController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Noterepository noteRepository;

    @GetMapping("/users")
    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/notes")
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    @GetMapping("/count")
    public String getDataCount() {
        long userCount = userRepository.count();
        long noteCount = noteRepository.count();
        return "Users: " + userCount + ", Notes: " + noteCount;
    }
}