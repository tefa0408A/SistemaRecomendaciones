package com.example.SistemaRecomendaciones.service.impl;

import com.example.SistemaRecomendaciones.entity.Photo;
import com.example.SistemaRecomendaciones.repository.PhotoRepository;
import com.example.SistemaRecomendaciones.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService {

    @Autowired
    private PhotoRepository photoRepository;

    @Override
    public Photo subirFoto(Photo photo) {
        return photoRepository.save(photo);
    }

    @Override
    public List<Photo> getFotosByRestaurante(Long restaurantId) {
        return photoRepository.findByRestauranteId(restaurantId);
    }
}
