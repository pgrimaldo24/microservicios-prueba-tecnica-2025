package com.gestionhumana.auth_server.helpers;

import com.gestionhumana.auth_server.entities.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Component
@Slf4j
public class JwtHelper {

    @Value("9a4f2c8d3b7a1e6f45c8a0b3f267d8b1d4e6f3c8a9d2b5f8e3a9c8b5f6v8a3d9")
    private String jwtSecret;

    public String createToken(String username){
        final var now = new Date();
        final var expirationDate = new Date(now.getTime() +(3600*1000));

        return Jwts
                .builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expirationDate)
                .signWith(this.getSecretKey())
                .compact();
    }

    public boolean validateToken(String token){
        final var expirationDate = this.getExpirationDate(token);
        return expirationDate.after(new Date());
    }

    private Date getExpirationDate(String token){
        return this.getClaimsFromtToken(token, Claims::getExpiration);
    }

    private<T> T getClaimsFromtToken(String token, Function<Claims, T> resolver){
        return resolver.apply(this.signToken(token));
    }

    private Claims signToken(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(this.getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private SecretKey getSecretKey(){
        return Keys.hmacShaKeyFor(this.jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

}
