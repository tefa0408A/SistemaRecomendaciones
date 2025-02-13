package com.example.SistemaRecomendaciones.controller;

import com.example.SistemaRecomendaciones.entity.Restaurant;
import com.example.SistemaRecomendaciones.entity.Usuario;
import com.example.SistemaRecomendaciones.service.AuthenticationService;
import com.example.SistemaRecomendaciones.service.RestaurantService;
import com.example.SistemaRecomendaciones.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user/v1/")
@RequiredArgsConstructor
public class UserController {

    private final UsuarioService usuarioService;

    @GetMapping("/saludo")
    public ResponseEntity<String> getSaludo(){
        return ResponseEntity.ok("hola mundo soy user");
    }

}
