package com.example.notesApp.integration;

import com.example.notesApp.model.AppUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
class ApiIntegrationTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @Test
    void testHealthEndpoint() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        
        mockMvc.perform(get("/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.message").value("NotesApp Backend is running!"));
    }

    @Test
    void testUserRegistrationFlow() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        
        AppUser user = new AppUser();
        user.setUsername("integrationtest");
        user.setPassword("password123");
        user.setEmail("test@integration.com");

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("integrationtest"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    void testAdminUserRegistration() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        
        AppUser admin = new AppUser();
        admin.setUsername("sarthakhello");
        admin.setPassword("admin123");
        admin.setEmail("admin@test.com");

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(admin)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("sarthakhello"));
    }
}