package com.example.SRRestaurant.SRRestaurant.service;

import com.example.SRRestaurant.SRRestaurant.entity.RestaurantEntity;

import java.util.List;

public interface RestaurantService {

    List<RestaurantEntity> getAll();
    RestaurantEntity getRestaurantById(Long Id);
}
