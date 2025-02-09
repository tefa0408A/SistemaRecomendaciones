package com.example.SistemaRecomendaciones.service.impl;

import com.example.SistemaRecomendaciones.entity.Restaurant;
import com.example.SistemaRecomendaciones.entity.Review;
import com.example.SistemaRecomendaciones.repository.RestaurantRepository;
import com.example.SistemaRecomendaciones.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Override
    public List<Restaurant> getAllRestaurantes() {
        return restaurantRepository.findAll();
    }

    @Override
    public Optional<Restaurant> getRestaurantById(Long id) {
        return restaurantRepository.findById(id);
    }
}
