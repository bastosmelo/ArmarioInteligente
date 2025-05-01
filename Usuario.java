package com.tokseg.armario.model;

import jakarta.persistence.*;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String tipo; // morador, entregador, admin

    // Getters e Setters
}
