package com.example.SistemaRecomendaciones.config;

import com.example.SistemaRecomendaciones.aggregates.constants.Constants;
import com.example.SistemaRecomendaciones.entity.Role;
import com.example.SistemaRecomendaciones.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UsuarioService usuarioService;

    //rutaas que se vana proteger y rutas que se van a permitir,a que podemos acceder
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        // todas las solicitudes deben authenicarse, por que se usa API REST O JWT. para authentication con cookies s ele habilita
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests( request ->
                        request.requestMatchers(Constants.ENDPOINTS_PERMIT).permitAll()
                                .requestMatchers(Constants.ENDPOINTS_USER).hasAnyAuthority(Role.USER.name())
                                .requestMatchers(Constants.ENDPOINTS_ADMIN).hasAnyAuthority(Role.ADMIN.name())
                                .requestMatchers(Constants.ENDPOINTS_ALL_RESTAURANT).permitAll()
                                .requestMatchers(Constants.ENPOINTS_REVIEW_CREATED).hasAuthority(Role.USER.name())
                                .requestMatchers(Constants.ENPOINTS_REVIEWBYRESTAURANT).permitAll()
                                .requestMatchers(Constants.ENDPOINTS_RESTAURANTBYID).permitAll()
                                .requestMatchers(Constants.ENPOINTS_RESTAURANT_DISTRICT).permitAll()
                                .anyRequest().authenticated())
                .sessionManagement(manager ->
                        manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()) //DaoAuthenticationProvider
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        //rutas par aacceder sin token
        return httpSecurity.build();

    }

    //proveedor de autenticacion
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(usuarioService.userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source= new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
