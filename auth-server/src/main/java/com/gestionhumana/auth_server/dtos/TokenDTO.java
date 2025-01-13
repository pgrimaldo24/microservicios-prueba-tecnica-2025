package com.gestionhumana.auth_server.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class TokenDTO {

    @JsonProperty("accessToken")
    private String accessToken;

    public TokenDTO() {
    }

    public TokenDTO(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    // Método builder manual
    public static TokenDTOBuilder builder() {
        return new TokenDTOBuilder();
    }

    public static class TokenDTOBuilder {
        private String accessToken;

        public TokenDTOBuilder accessToken(String accessToken) {
            this.accessToken = accessToken;
            return this;
        }

        public TokenDTO build() {
            return new TokenDTO(this.accessToken);
        }
    }
}

