package com.tokseg.armario.controller;

import com.tokseg.armario.model.Usuario;
import com.tokseg.armario.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // permite chamadas do frontend
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        String userType = payload.get("userType");

        var usuario = service.autenticar(username, password);
        Map<String, Object> response = new HashMap<>();

        if (usuario.isPresent() && usuario.get().getTipo().equals(userType)) {
            response.put("success", true);
            response.put("userId", usuario.get().getId());
        } else {
            response.put("success", false);
        }

        return response;
    }
}
