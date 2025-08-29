package com.example.notesApp.services;

import com.example.notesApp.model.Note;
import com.example.notesApp.repository.Noterepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NoteServiceTest {

    @Mock
    private Noterepository noterepository;

    @InjectMocks
    private NoteService noteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllNotes() {
        Note n1 = new Note();
        n1.setTitle("N1");
        Note n2 = new Note();
        n2.setTitle("N2");

        when(noterepository.findAll()).thenReturn(Arrays.asList(n1, n2));

        List<Note> notes = noteService.getAllNotes();

        assertEquals(2, notes.size());
        verify(noterepository, times(1)).findAll();
    }

    @Test
    void testGetNoteByIdFound() {
        Note note = new Note();
        note.setId(1L);
        note.setTitle("Test Note");

        when(noterepository.findById(1L)).thenReturn(Optional.of(note));

        Optional<Note> result = noteService.getNoteById(1L);

        assertTrue(result.isPresent());
        assertEquals("Test Note", result.get().getTitle());
    }

    @Test
    void testGetNoteByIdNotFound() {
        when(noterepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Note> result = noteService.getNoteById(1L);

        assertFalse(result.isPresent());
    }

    @Test
    void testSaveNote() {
        Note note = new Note();
        note.setTitle("Save Me");

        when(noterepository.save(note)).thenReturn(note);

        Note result = noteService.saveNote(note);

        assertEquals("Save Me", result.getTitle());
        verify(noterepository, times(1)).save(note);
    }

    @Test
    void testDeleteNoteById() {
        doNothing().when(noterepository).deleteById(1L);

        noteService.deleteNoteById(1L);

        verify(noterepository, times(1)).deleteById(1L);
    }

    @Test
    void testGetNotesByUserId() {
        Note note = new Note();
        note.setTitle("User Note");

        when(noterepository.findByUserId(1L)).thenReturn(Arrays.asList(note));

        List<Note> notes = noteService.getNotesByUserId(1L);

        assertEquals(1, notes.size());
        assertEquals("User Note", notes.get(0).getTitle());
    }

    @Test
    void testUpdateNote() {
        Note updated = new Note();
        updated.setTitle("Updated Title");

        when(noterepository.save(updated)).thenReturn(updated);

        Note result = noteService.updateNote(1L, updated);

        assertEquals("Updated Title", result.getTitle());
        assertEquals(1L, result.getId());
        verify(noterepository, times(1)).save(updated);
    }
}
