package com.example.SistemaRecomendaciones.repository;

import com.example.SistemaRecomendaciones.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
}
