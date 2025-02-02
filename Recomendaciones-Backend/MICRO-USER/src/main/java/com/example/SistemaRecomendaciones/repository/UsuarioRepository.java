package com.example.SistemaRecomendaciones.repository;

import com.example.SistemaRecomendaciones.entity.Usuario;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    Optional<Usuario>  findByEmail(String email);
}
