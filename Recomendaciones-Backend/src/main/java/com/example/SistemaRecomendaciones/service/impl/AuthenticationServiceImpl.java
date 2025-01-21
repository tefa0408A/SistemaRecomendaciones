package com.example.SistemaRecomendaciones.service.impl;

import com.example.SistemaRecomendaciones.aggregates.constants.Constants;
import com.example.SistemaRecomendaciones.aggregates.request.SignUpRequest;
import com.example.SistemaRecomendaciones.entity.Rol;
import com.example.SistemaRecomendaciones.entity.Role;
import com.example.SistemaRecomendaciones.entity.Usuario;
import com.example.SistemaRecomendaciones.repository.RolRepository;
import com.example.SistemaRecomendaciones.repository.UsuarioRepository;
import com.example.SistemaRecomendaciones.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;

    @Override
    public Usuario signUpUser(SignUpRequest signUpRequest) {
        Usuario usuario = getUsuarioEntity(signUpRequest);
        usuario.setRoles(Collections.singleton(getRoles(Role.USER)));
        return usuarioRepository.save(usuario);
    }

    private Usuario getUsuarioEntity(SignUpRequest signUpRequest){
        return Usuario.builder()
                .nombres(signUpRequest.getNombres())
                .apellidos(signUpRequest.getApellidos())
                .email(signUpRequest.getEmail())
                .password(signUpRequest.getPassword())
                .isAccountNonExpired(Constants.STATUS_ACTIVE)
                .isAccountNonLocked(Constants.STATUS_ACTIVE)
                .isCredentialsNonExpired(Constants.STATUS_ACTIVE)
                .isEnabled(Constants.STATUS_ACTIVE)
                .build();
    }

    @Override
    public Usuario signUpAdmin(SignUpRequest signUpRequest) {
        Usuario usuario = getUsuarioEntity(signUpRequest);
        usuario.setRoles(Collections.singleton(getRoles(Role.ADMIN)));
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> todos() {
        return usuarioRepository.findAll();
    }


    private Rol getRoles (Role rolBuscado){
        return rolRepository.findByNombreRol(rolBuscado.name())
                .orElseThrow(()-> new RuntimeException("ERROS NO SE ENCONTRO ROL"));
    }
}
