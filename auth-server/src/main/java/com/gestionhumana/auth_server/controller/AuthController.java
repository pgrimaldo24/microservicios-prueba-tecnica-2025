package com.gestionhumana.auth_server.controller;

import com.gestionhumana.auth_server.dtos.TokenDTO;
import com.gestionhumana.auth_server.dtos.UserDTO;
import com.gestionhumana.auth_server.services.IAuthServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final IAuthServices authServices;

    @Autowired
    public AuthController(IAuthServices authServices) {
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
