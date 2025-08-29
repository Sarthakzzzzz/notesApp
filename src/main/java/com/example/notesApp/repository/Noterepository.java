package com.example.notesApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.notesApp.model.Note; // adjust package/class if your entity is elsewhere

@Repository
public interface Noterepository extends JpaRepository<Note, Long> {
    List<Note> findByUserId(Long userId);
}
