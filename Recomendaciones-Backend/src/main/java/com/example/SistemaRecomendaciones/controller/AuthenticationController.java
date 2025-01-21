package com.example.SistemaRecomendaciones.controller;

import com.example.SistemaRecomendaciones.aggregates.request.SignUpRequest;
import com.example.SistemaRecomendaciones.entity.Usuario;
import com.example.SistemaRecomendaciones.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/authentication/v1/")
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

    @GetMapping("/all")
    public ResponseEntity<List<Usuario>> getAll(){
        return ResponseEntity.ok(authenticationService.todos());
    }

}
