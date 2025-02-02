package com.example.service;

import com.example.entity.RestaurantEntity;

import java.util.List;

public interface RestaurantService {

    List<RestaurantEntity> getAll();
    RestaurantEntity getRestaurantById(Long Id);
}
