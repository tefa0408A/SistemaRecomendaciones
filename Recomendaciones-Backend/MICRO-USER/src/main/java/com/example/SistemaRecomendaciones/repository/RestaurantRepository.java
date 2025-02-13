package com.example.SistemaRecomendaciones.repository;

import com.example.SistemaRecomendaciones.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {
    Optional<Restaurant> findById(Long id);
    List<Restaurant> findByDistrito(String distrito);
}
