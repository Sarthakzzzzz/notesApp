package com.example.notesApp.controller;

import com.example.notesApp.model.Note;
import com.example.notesApp.repository.Noterepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NoteControllerTest {

    @Mock
    private Noterepository noterepository;

    @InjectMocks
    private NoteController noteController;

    public NoteControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetNotesByUserId() {
        Note note = new Note();
        note.setTitle("Test");

        when(noterepository.findByUserId(1L)).thenReturn(Arrays.asList(note));

        ResponseEntity<List<Note>> response = noteController.getNotesByUserId(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void testGetAllNotes() {
        Note n1 = new Note();
        n1.setTitle("N1");
        Note n2 = new Note();
        n2.setTitle("N2");

        when(noterepository.findAll()).thenReturn(Arrays.asList(n1, n2));

        ResponseEntity<List<Note>> response = noteController.getNotesByUserId(null);

        assertEquals(2, response.getBody().size());
    }

    @Test
    void testCreateNote() {
        Note note = new Note();
        note.setTitle("Test Note");

        when(noterepository.save(note)).thenReturn(note);

        ResponseEntity<Note> response = noteController.createNote(note);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Test Note", response.getBody().getTitle());
    }

    @Test
    void testGetNoteByIdFound() {
        Note note = new Note();
        note.setId(1L);
        note.setTitle("Note 1");

        when(noterepository.findById(1L)).thenReturn(Optional.of(note));

        ResponseEntity<Note> response = noteController.getNoteById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Note 1", response.getBody().getTitle());
    }

    @Test
    void testGetNoteByIdNotFound() {
        when(noterepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Note> response = noteController.getNoteById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testUpdateNoteSuccess() {
        Note existing = new Note();
        existing.setId(1L);
        existing.setTitle("Old");

        Note updated = new Note();
        updated.setTitle("New");
        updated.setContent("New Content");

        when(noterepository.findById(1L)).thenReturn(Optional.of(existing));
        when(noterepository.save(any(Note.class))).thenReturn(existing);

        ResponseEntity<Note> response = noteController.updateNote(1L, updated);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("New", response.getBody().getTitle());
    }

    @Test
    void testUpdateNoteNotFound() {
        when(noterepository.findById(1L)).thenReturn(Optional.empty());

        Note updated = new Note();
        updated.setTitle("Doesn't matter");

        ResponseEntity<Note> response = noteController.updateNote(1L, updated);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testDeleteNoteSuccess() {
        when(noterepository.existsById(1L)).thenReturn(true);
        doNothing().when(noterepository).deleteById(1L);

        ResponseEntity<Void> response = noteController.deleteNote(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(noterepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteNoteNotFound() {
        when(noterepository.existsById(1L)).thenReturn(false);

        ResponseEntity<Void> response = noteController.deleteNote(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
