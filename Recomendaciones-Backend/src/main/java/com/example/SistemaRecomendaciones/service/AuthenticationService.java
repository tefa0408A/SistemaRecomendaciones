package com.example.SistemaRecomendaciones.service;

import com.example.SistemaRecomendaciones.aggregates.request.SignUpRequest;
import com.example.SistemaRecomendaciones.entity.Usuario;

import java.util.List;

public interface AuthenticationService {

    //SIGNUP ---- REGISTRARSE
    Usuario signUpUser(SignUpRequest signUpRequest);
    Usuario signUpAdmin(SignUpRequest signUpRequest);
    List<Usuario> todos();

}
