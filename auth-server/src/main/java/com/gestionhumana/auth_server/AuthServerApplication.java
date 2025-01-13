package com.gestionhumana.auth_server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class AuthServerApplication {

    public static void main(String[] args) {
		SpringApplication.run(AuthServerApplication.class, args);
	}

	/*
	@Autowired
	private final BCryptPasswordEncoder encoder;

	    public AuthServerApplication(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Password: " + this.encoder.encode("secret"));
	}*/
}
