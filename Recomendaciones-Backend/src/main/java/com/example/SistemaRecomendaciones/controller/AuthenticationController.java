package com.example.SistemaRecomendaciones.controller;

import com.example.SistemaRecomendaciones.aggregates.request.SignInRequest;
import com.example.SistemaRecomendaciones.aggregates.request.SignUpRequest;
import com.example.SistemaRecomendaciones.aggregates.response.SignInResponse;
import com.example.SistemaRecomendaciones.entity.Usuario;
import com.example.SistemaRecomendaciones.service.AuthenticationService;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/authentication/v1/")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signupuser")
    public ResponseEntity<Usuario> signUser(@RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(authenticationService.signUpUser(signUpRequest));
    }

    @PostMapping("/signupadmin")
    public ResponseEntity<Usuario> signAdmin(@RequestBody SignUpRequest signUpRequest){
        return ResponseEntity.ok(authenticationService.signUpAdmin(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest signInRequest){
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Usuario>> getAll(){
        return ResponseEntity.ok(authenticationService.todos());
    }

    @GetMapping("/clave")
    public ResponseEntity<String> getClaveFirma(){
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        String dato = Base64.getEncoder().encodeToString(key.getEncoded());
        return ResponseEntity.ok(dato);
    }

}
