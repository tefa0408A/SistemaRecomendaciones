package com.example.SistemaRecomendaciones.controller;

import com.example.SistemaRecomendaciones.entity.Photo;
import com.example.SistemaRecomendaciones.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/photo/v1")
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoService photoService;

    @GetMapping("/{restaurantId}")
    public ResponseEntity<List<Photo>> getPhotoByRestaurante(@PathVariable Long restaurantId) {

        List<Photo> fotos = photoService.getFotosByRestaurante(restaurantId);
        if (fotos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(fotos, HttpStatus.OK);
    }
}
