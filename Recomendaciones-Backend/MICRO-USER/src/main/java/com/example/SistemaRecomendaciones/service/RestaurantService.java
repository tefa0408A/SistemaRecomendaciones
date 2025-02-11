package com.example.SistemaRecomendaciones.service;

import com.example.SistemaRecomendaciones.entity.Restaurant;
import com.example.SistemaRecomendaciones.entity.Review;

import java.util.List;
import java.util.Optional;

public interface RestaurantService {

    List<Restaurant> getAllRestaurantes();
    Optional<Restaurant> getRestaurantById(Long id);
}
