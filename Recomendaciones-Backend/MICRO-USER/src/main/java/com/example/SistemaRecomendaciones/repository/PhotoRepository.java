package com.example.SistemaRecomendaciones.repository;

import com.example.SistemaRecomendaciones.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo,Long> {
    List<Photo> findByRestauranteId(Long photoId);
}
