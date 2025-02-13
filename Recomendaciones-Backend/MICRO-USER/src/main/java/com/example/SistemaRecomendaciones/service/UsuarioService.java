package com.example.SistemaRecomendaciones.service;

import com.example.SistemaRecomendaciones.entity.Usuario;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UsuarioService {
    UserDetailsService userDetailsService ();
    String getUserDetails();

    Optional<Usuario> findByEmail(String username);
}