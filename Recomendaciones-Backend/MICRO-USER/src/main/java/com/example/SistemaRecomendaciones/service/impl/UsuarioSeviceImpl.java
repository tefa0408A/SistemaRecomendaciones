package com.example.SistemaRecomendaciones.service.impl;

import com.example.SistemaRecomendaciones.entity.Usuario;
import com.example.SistemaRecomendaciones.repository.UsuarioRepository;
import com.example.SistemaRecomendaciones.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioSeviceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return usuarioRepository.findByEmail(username).orElseThrow(
                        ()-> new UsernameNotFoundException("USUARIO NO ENCONTRADO EN LA BD")
                );
            }
        };
    }

    @Override
    public String getUserDetails() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            Usuario userDetails = (Usuario) principal;
            return "Username: " + userDetails.getUsername() + ", Email: " + userDetails.getEmail();
        }

        return "No authenticated user found";
    }

    @Override
    public Optional<Usuario> findByEmail(String username) {
        return usuarioRepository.findByEmail(username);
    }


}
