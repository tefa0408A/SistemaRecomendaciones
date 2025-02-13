package com.example.SistemaRecomendaciones.repository;

import com.example.SistemaRecomendaciones.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findByRestauranteId(Long restauranteId);
}
