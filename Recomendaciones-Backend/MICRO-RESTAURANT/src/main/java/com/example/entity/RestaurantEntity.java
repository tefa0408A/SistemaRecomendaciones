package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="restaurant")
@Getter
@Setter
public class RestaurantEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String imagenUrl;
    private String ubicacion;
    private String opinion;

    @Override
    public String toString() {
        return "RestaurantEntity{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", imagenUrl='" + imagenUrl + '\'' +
                ", ubicacion='" + ubicacion + '\'' +
                ", opinion='" + opinion + '\'' +
                '}';
    }
}
