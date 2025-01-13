package com.gestionhumana.auth_server.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestionhumana.auth_server.dtos.TokenDTO;
import com.gestionhumana.auth_server.dtos.UserDTO;
import com.gestionhumana.auth_server.services.AuthServices;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/api/v1/auth")
public class AuthController {
    private final AuthServices authServices;

    @Autowired
    public AuthController(AuthServices authServices) {
        this.authServices = authServices;
    }

    @PostMapping
    public ResponseEntity<TokenDTO> jwtCreate(@RequestBody UserDTO userDTO){
        return ResponseEntity.ok(this.authServices.login(userDTO));
    }

    @PostMapping(path = "/jwt")
    public ResponseEntity<TokenDTO> jwtValidate(@RequestHeader String accessToken){
        return ResponseEntity.ok(
                this.authServices.validateToken(
                        TokenDTO.builder()
                                .accessToken(accessToken)
                                .build()
                )
        );
    }

}
