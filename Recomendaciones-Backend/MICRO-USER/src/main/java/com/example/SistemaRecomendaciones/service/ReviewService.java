package com.example.SistemaRecomendaciones.service;

import com.example.SistemaRecomendaciones.entity.Review;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ReviewService {

    Review createComentario(Review review);
    List<Review> getComentariosByRestaurante(Long restaurantId);
}
