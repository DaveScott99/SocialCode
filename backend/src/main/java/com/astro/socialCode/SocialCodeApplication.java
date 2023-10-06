package com.astro.socialCode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SocialCodeApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SocialCodeApplication.class, args);
	}

}
