package com.example.SistemaRecomendaciones.service.impl;

import com.example.SistemaRecomendaciones.entity.Restaurant;
import com.example.SistemaRecomendaciones.entity.Review;
import com.example.SistemaRecomendaciones.repository.ReviewRepository;
import com.example.SistemaRecomendaciones.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public Review createComentario(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getComentariosByRestaurante(Long restaurantId) {
        return reviewRepository.findByRestauranteId(restaurantId);
    }
}
