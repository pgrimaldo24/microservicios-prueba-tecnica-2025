package com.gestionhumana.auth_server.services;

import com.gestionhumana.auth_server.dtos.TokenDTO;
import com.gestionhumana.auth_server.dtos.UserDTO;
import com.gestionhumana.auth_server.entities.UserEntity;
import com.gestionhumana.auth_server.helpers.JwtHelper;
import com.gestionhumana.auth_server.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Transactional
@Service
public class AuthServices implements IAuthServices {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtHelper jwtHelper;

    private static final String USER_EXCEPTION_MESSAGE = "Error al autenticar usuario";

    @Autowired
    public AuthServices(UserRepository  userRepository, PasswordEncoder passwordEncoder, JwtHelper jwtHelper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtHelper = jwtHelper;
    }

    @Override
    public TokenDTO login(UserDTO user) {
        final var userEntity = this.userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, USER_EXCEPTION_MESSAGE));
        this.validPassword(user, userEntity);
        return TokenDTO.builder().accessToken(this.jwtHelper.createToken(userEntity.getUsername())).build();
    }

    @Override
    public TokenDTO validateToken(TokenDTO tokenDto) {
        if(!this.jwtHelper.validateToken(tokenDto.getAccessToken())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, USER_EXCEPTION_MESSAGE);
        }
        return TokenDTO.builder().accessToken(tokenDto.getAccessToken()).build();
    }


    private void validPassword(UserDTO userDto, UserEntity userEntity){
        if (!this.passwordEncoder.matches(userDto.getPassword(), userEntity.getPassword())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, USER_EXCEPTION_MESSAGE);
        }
    }

}
