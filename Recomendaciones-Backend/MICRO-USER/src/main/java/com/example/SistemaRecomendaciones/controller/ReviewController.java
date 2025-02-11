package com.example.SistemaRecomendaciones.controller;

import com.example.SistemaRecomendaciones.entity.Review;
import com.example.SistemaRecomendaciones.repository.ReviewRepository;
import com.example.SistemaRecomendaciones.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review/v1/")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{restaurantId}")
    public ResponseEntity<List<Review>> getReviewByRestaurante(@PathVariable Long restaurantId) {
        List<Review> comentarios = reviewService.getComentariosByRestaurante(restaurantId);
        if (comentarios.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(comentarios, HttpStatus.OK);
    }
}
