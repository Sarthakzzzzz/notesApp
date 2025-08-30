package com.example.notesApp.security;

import com.example.notesApp.model.AppUser;
import com.example.notesApp.services.UserService;
import com.example.notesApp.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    public JwtRequestFilter(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @Override

    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // Extract JWT token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            username = jwtUtil.extractUsername(token);
        }


        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<AppUser> optionalUser = userService.findByUsername(username);

            if (optionalUser.isPresent()) {
                AppUser user = optionalUser.get();

                UserDetails userDetails = org.springframework.security.core.userdetails.User
                        .withUsername(user.getUsername())
                        .password(user.getPassword())
                        .authorities("ROLE_" + user.getRole()) // Add ROLE_ prefix
                        .build();

                if (jwtUtil.validateToken(token, userDetails)) {
                    // Set user ID in request for UserController
                    request.setAttribute("userId", user.getId());
                    
                    System.out.println("User role: " + user.getRole());
                    System.out.println("Authorities: " + userDetails.getAuthorities());
                    
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                            null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}