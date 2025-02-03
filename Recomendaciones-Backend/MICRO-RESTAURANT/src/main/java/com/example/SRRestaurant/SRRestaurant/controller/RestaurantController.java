package com.example.SRRestaurant.SRRestaurant.controller;

import com.example.SRRestaurant.SRRestaurant.entity.RestaurantEntity;
import com.example.SRRestaurant.SRRestaurant.service.RestaurantService;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant/v1")
@Log4j2
public class RestaurantController {

    private final RestaurantService restaurantService;
    // Constructor con la inyección de dependencias
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping()
    public List<RestaurantEntity> getAll(){
        List<RestaurantEntity> restaurants = restaurantService.getAll();
        restaurants.forEach(System.out::println); // Imprimir cada restaurante
        return restaurants;
    }

    @GetMapping("/{id}")
    public RestaurantEntity getRestaurantById(@PathVariable Long id){
        return restaurantService.getRestaurantById(id);
    }

}
