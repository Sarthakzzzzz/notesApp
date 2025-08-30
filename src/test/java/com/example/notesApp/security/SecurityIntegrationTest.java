package com.example.notesApp.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
class SecurityIntegrationTest {

    @Autowired
    private WebApplicationContext context;

    @Test
    void testUnauthorizedAccessToProtectedEndpoint() throws Exception {
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        
        mockMvc.perform(get("/api/notes"))
                .andExpect(status().isForbidden());
    }

    @Test
    void testPublicEndpointsAccessible() throws Exception {
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        
        mockMvc.perform(get("/health"))
                .andExpect(status().isOk());
                
        mockMvc.perform(get("/"))
                .andExpect(status().isOk());
    }

    @Test
    void testH2ConsoleAccessible() throws Exception {
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        
        mockMvc.perform(get("/h2-console"))
                .andExpect(status().isNotFound());
    }
}