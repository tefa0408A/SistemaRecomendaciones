package com.example.SistemaRecomendaciones.service;

import com.example.SistemaRecomendaciones.entity.Photo;

import java.util.List;

public interface PhotoService {
    Photo subirFoto(Photo photo);
    List<Photo> getFotosByRestaurante(Long restaurantId);
}
