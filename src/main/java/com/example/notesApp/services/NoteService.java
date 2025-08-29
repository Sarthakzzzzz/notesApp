package com.example.notesApp.services;

import com.example.notesApp.model.Note;
import com.example.notesApp.repository.Noterepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
    private final Noterepository noterepository;

    public NoteService(Noterepository noterepository) {
        this.noterepository = noterepository;
    }

    public List<Note> getAllNotes() {
        return noterepository.findAll();
    }

    public Optional<Note> getNoteById(Long id) {
        return noterepository.findById(id);
    }

    public Note saveNote(Note note) {
        return noterepository.save(note);
    }

    public void deleteNoteById(Long id) {
        noterepository.deleteById(id);
    }

    public List<Note> getNotesByUserId(Long userId) {
        return noterepository.findByUserId(userId);
    }

    public Note updateNote(Long id, Note updatedNote) {
        updatedNote.setId(id);
        return noterepository.save(updatedNote);
    }
}
