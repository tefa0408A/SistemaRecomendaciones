package com.example.SistemaRecomendaciones.config;

import com.example.SistemaRecomendaciones.service.JwtService;
import com.example.SistemaRecomendaciones.service.UsuarioService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UsuarioService usuarioService;

    //genera un filtro por cada solicitud llegada a la api
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String tokenExtraidoHeader = request.getHeader("Authorization");
        final String tokenLimpio;
        final String userEmail;

        //Validar el encabezado de la solicitud, validamos el token
        if(!StringUtils.hasText(tokenExtraidoHeader)
                || !StringUtils.startsWithIgnoreCase(tokenExtraidoHeader, "Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        //limpiamos el token de la palabra bearer
        tokenLimpio = tokenExtraidoHeader.substring(7);
        //extraermos el usuario del token
        userEmail = jwtService.extractUsername(tokenLimpio);

        //validamos si el usuario es correcto o no y no se encuentre autenticado
        if(Objects.nonNull(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null){

            //contexto de seguridad vacio
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

            //recuperando detalles del usuario desde base de datos
            UserDetails userDetails = usuarioService.userDetailsService().loadUserByUsername(userEmail);
            //validamos que el token no este expirado y pertenezca al susuario
            if (jwtService.validateToken(tokenLimpio,userDetails)){
                //creamos un token de autenticacion mediante UsernamePassword....
                //s e colocan usuario, credenciales, roles /permisos
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

                //asignando detalles de la solicitud del request al token de auth
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                //asignando la autenticacion al contexto creado anteriormente
                securityContext.setAuthentication(authenticationToken);
                //asigna el contexto de seguridad al holder de seguridad
                SecurityContextHolder.setContext(securityContext);
            }
        }
        // todo ok , continua con a ejecucion de la solicitud
        filterChain.doFilter(request,response);

    }
}
