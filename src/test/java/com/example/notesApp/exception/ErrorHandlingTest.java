package com.example.notesApp.exception;

import com.example.notesApp.controller.NoteController;
import com.example.notesApp.repository.Noterepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ErrorHandlingTest {

    @Mock
    private Noterepository noteRepository;

    @InjectMocks
    private NoteController noteController;

    public ErrorHandlingTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testDatabaseConnectionFailure() {
        when(noteRepository.findAll()).thenThrow(new RuntimeException("Database connection failed"));

        assertThrows(RuntimeException.class, () -> {
            noteController.getNotesByUserId(null);
        });
    }

    @Test
    void testInvalidNoteId() {
        ResponseEntity<?> response = noteController.getNoteById(-1L);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testNullPointerHandling() {
        when(noteRepository.findById(1L)).thenReturn(java.util.Optional.empty());
        
        ResponseEntity<?> response = noteController.getNoteById(1L);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}