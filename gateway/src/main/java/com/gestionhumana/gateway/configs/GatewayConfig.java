package com.gestionhumana.gateway.configs;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class GatewayConfig {

    /*@Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder) {
        return builder
                .routes()
                .route(route -> route
                        .path("/rrhh/api/v1/requerimiento/*")
                        .uri("http://localhost:5092"))
                .route(route -> route
                        .path("/rrhh/api/v1/requerimiento/**")
                        .uri("lb://api-requerimiento-rrhh"))
                .build();
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:3000"); // Cambia según sea necesario
        corsConfig.addAllowedMethod("*"); // Permite todos los métodos (GET, POST, etc.)
        corsConfig.addAllowedHeader("*"); // Permite todos los encabezados
        corsConfig.setAllowCredentials(true); // Permitir credenciales, si es necesario

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsFilter(source);
    }*/

    @Bean
    @Profile(value="eureka-off")
    public RouteLocator routeLocatorEurekaOff(RouteLocatorBuilder builder) {
        return builder
                .routes()
                .route(route -> route
                        .path("/market/api/v1/*")
                        .uri("http://localhost:5092"))
                .build();
    }

    @Bean
    @Profile(value="eureka-on")
    public RouteLocator routeLocatorEurekaOn(RouteLocatorBuilder builder) {
        return builder
                .routes()
                .route(route -> route
                        .path("/market/api/v1/**")
                        .uri("lb://api-market"))
                .build();
    }
}
