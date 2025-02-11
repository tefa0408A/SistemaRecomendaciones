package com.example.SistemaRecomendaciones.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="restaurant")
@Getter
@Setter
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int calificacion;
    private String distrito;
    private String nombre;
    private String imagenUrl;
    private String ubicacion;
    private int promedio;
}
