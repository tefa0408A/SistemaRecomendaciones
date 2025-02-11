package com.example.SRRestaurant.SRRestaurant.repository;

import com.example.SRRestaurant.SRRestaurant.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<RestaurantEntity,Long> {
}
