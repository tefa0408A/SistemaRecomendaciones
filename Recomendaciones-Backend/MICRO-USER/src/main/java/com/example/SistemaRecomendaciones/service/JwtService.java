package com.example.SistemaRecomendaciones.service;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JwtService {
    String extractUsername(String token);
    String generateToken(UserDetails userDetails);
    String generateRefreshToken(Map<String,Object> extraClaim,UserDetails userDetails);
    boolean validateToken(String token, UserDetails userDetails);
}
