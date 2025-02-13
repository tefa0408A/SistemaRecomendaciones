package com.example.SistemaRecomendaciones.controller;

import com.example.SistemaRecomendaciones.entity.Photo;
import com.example.SistemaRecomendaciones.entity.Restaurant;
import com.example.SistemaRecomendaciones.entity.Review;
import com.example.SistemaRecomendaciones.entity.Usuario;
import com.example.SistemaRecomendaciones.repository.RestaurantRepository;
import com.example.SistemaRecomendaciones.service.PhotoService;
import com.example.SistemaRecomendaciones.service.RestaurantService;
import com.example.SistemaRecomendaciones.service.ReviewService;
import com.example.SistemaRecomendaciones.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurant/v1")
@RequiredArgsConstructor
@Log4j2
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final ReviewService reviewService;
    private final UsuarioService usuarioService;
    private final PhotoService photoService;

    @GetMapping("/all")
    public ResponseEntity<List<Restaurant>> getAll(){
        return ResponseEntity.ok(restaurantService.getAllRestaurantes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestauranteById(@PathVariable Long id) {
        log.info("entra al post para crear comeario");

        // Obtener el usuario autenticado
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info(principal+"---------------------");
        Optional<Restaurant> restaurante = restaurantService.getRestaurantById(id);
        return restaurante.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @PostMapping("/{restauranteId}/comentario")
    public ResponseEntity<Review> createComentario(@PathVariable Long restauranteId, @RequestBody Review review) {
        log.info("entra al post para crear comeario");

        // Obtener el usuario autenticado
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            Usuario userDetails = (Usuario) principal;
            Usuario usuario = usuarioService.findByEmail(userDetails.getUsername()).orElseThrow(
                    () -> new UsernameNotFoundException("Error usuario no encontrado en bd"));
            review.setUsuario(usuario);

            log.info("Usuario autenticado: " + userDetails.getUsername());
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Manejar el caso en que el usuario no esté autenticado
        }

        // Asignar el ID del restaurante al comentario
        Restaurant restaurante = new Restaurant();
        restaurante.setId(restauranteId);
        review.setRestaurante(restaurante);
        review.setFecha(new Date());

        log.info("Creando comentario para el restaurante con ID: " + restauranteId);

        // Guardar el nuevo comentario
        Review nuevoComentario = reviewService.createComentario(review);
        log.info("Comentario creado con éxito: " + nuevoComentario);

        return new ResponseEntity<>(nuevoComentario, HttpStatus.CREATED);
    }

    @PostMapping("/{restauranteId}/photo/up")
    public ResponseEntity<Photo> upPhoto(@PathVariable Long restauranteId, @RequestBody Photo photo) {
        log.info("entra al up");

        // Obtener el usuario autenticado
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            Usuario userDetails = (Usuario) principal;
            Usuario usuario = usuarioService.findByEmail(userDetails.getUsername()).orElseThrow(
                    () -> new UsernameNotFoundException("Error usuario no encontrado en bd"));
            photo.setUsuario(usuario);

            log.info("Usuario autenticado: " + userDetails.getUsername());
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Manejar el caso en que el usuario no esté autenticado
        }

        // Asignar el ID del restaurante al comentario
        Restaurant restaurante = new Restaurant();
        restaurante.setId(restauranteId);
        photo.setRestaurante(restaurante);
        photo.setFecha(new Date());

        log.info("Creando comentario para el restaurante con ID: " + restauranteId);

        // Guardar el nuevo comentario
        Photo newPhoto = photoService.subirFoto(photo);
        log.info("Foto subida con éxito: " + newPhoto);

        return new ResponseEntity<>(newPhoto, HttpStatus.CREATED);
    }

    @GetMapping("/{restauranteId}/comentarios")
    public ResponseEntity<List<Review>> getComentariosByRestaurante(@PathVariable Long restauranteId) {
        List<Review> comentarios = reviewService.getComentariosByRestaurante(restauranteId);
        if (comentarios.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(comentarios, HttpStatus.OK);
    }

    @GetMapping("/distrito/{distrito}")
    public List<Restaurant> getRestaurantByDistrito(@PathVariable String distrito) {
        return restaurantService.getRestaurantByDistrito(distrito);
    }
}
