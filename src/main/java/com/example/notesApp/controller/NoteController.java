package com.example.notesApp.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.notesApp.model.Note;
import com.example.notesApp.repository.Noterepository;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final Noterepository noterepository;

    public NoteController(Noterepository noterepository) {
        this.noterepository = noterepository;
    }

    @GetMapping
    public ResponseEntity<List<Note>> getNotesByUserId(@RequestParam(required = false) Long userId) {
        List<Note> notes;
        if (userId != null) {
            notes = noterepository.findByUserId(userId);
        } else {
            notes = noterepository.findAll();
        }
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    // POST /api/notes -> create new note
    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        LocalDateTime now = LocalDateTime.now();
        note.setCreatedAt(now);
        note.setUpdatedAt(now);
        Note createdNote = noterepository.save(note);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
    }

    // GET /api/notes/{id} -> get note by id
    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        return noterepository.findById(id)
                .map(note -> new ResponseEntity<>(note, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // PUT /api/notes/{id} -> update note
    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {
        return noterepository.findById(id)
                .map(note -> {
                    note.setTitle(updatedNote.getTitle());
                    note.setContent(updatedNote.getContent());
                    Note savedNote = noterepository.save(note);
                    return new ResponseEntity<>(savedNote, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // DELETE /api/notes/{id} -> delete note
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        if (noterepository.existsById(id)) {
            noterepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}