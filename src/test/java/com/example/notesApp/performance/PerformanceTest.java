package com.example.notesApp.performance;

import com.example.notesApp.model.Note;
import com.example.notesApp.repository.Noterepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.StopWatch;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PerformanceTest {

    @Autowired
    private Noterepository noteRepository;

    @Test
    void testBulkNoteCreationPerformance() {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        List<Note> notes = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            Note note = new Note();
            note.setTitle("Performance Test Note " + i);
            note.setContent("Content for note " + i);
            note.setUserId(1L);
            note.setUsername("testuser");
            note.setEmail("test@example.com");
            notes.add(note);
        }

        noteRepository.saveAll(notes);
        stopWatch.stop();

        assertTrue(stopWatch.getTotalTimeMillis() < 5000);
    }

    @Test
    void testNoteSearchPerformance() {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        List<Note> results = noteRepository.findByUserId(1L);
        stopWatch.stop();

        assertTrue(stopWatch.getTotalTimeMillis() < 1000);
        // Results may be empty in test environment
        assertNotNull(results);
    }
}