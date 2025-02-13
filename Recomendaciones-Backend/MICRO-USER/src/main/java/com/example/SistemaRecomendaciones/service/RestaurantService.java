package com.example.SistemaRecomendaciones.service;

import com.example.SistemaRecomendaciones.entity.Restaurant;

import java.util.List;
import java.util.Optional;

public interface RestaurantService {

    List<Restaurant> getAllRestaurantes();
    Optional<Restaurant> getRestaurantById(Long id);
    List<Restaurant> getRestaurantByDistrito(String distrito);
}
