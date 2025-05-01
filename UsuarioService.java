package com.tokseg.armario.service;

import com.tokseg.armario.model.Usuario;
import com.tokseg.armario.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Optional<Usuario> autenticar(String username, String password) {
        return repository.findByUsernameAndPassword(username, password);
    }
}
