package com.example.SRRestaurant.SRRestaurant.service.impl;

import com.example.SRRestaurant.SRRestaurant.entity.RestaurantEntity;
import com.example.SRRestaurant.SRRestaurant.repository.RestaurantRepository;
import com.example.SRRestaurant.SRRestaurant.service.RestaurantService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantServiceImpl(RestaurantRepository restaurantRepository){
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public List<RestaurantEntity> getAll() {
        return restaurantRepository.findAll();
    }

    @Override
    public RestaurantEntity getRestaurantById(Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }
}
