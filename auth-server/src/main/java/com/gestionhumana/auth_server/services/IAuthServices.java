package com.gestionhumana.auth_server.services;

import com.gestionhumana.auth_server.dtos.TokenDTO;
import com.gestionhumana.auth_server.dtos.UserDTO;

public interface IAuthServices {

    TokenDTO login(UserDTO user);
    TokenDTO validateToken(TokenDTO user);
}
