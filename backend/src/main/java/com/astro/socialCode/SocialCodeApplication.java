package com.astro.socialCode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "SocialCode Backend REST API", 
								version = "2.0", 
								description = "Backend REST API for SocialCode",
								termsOfService = "https://www.apache.org/license/LICENSE-2.0",
								contact = @Contact(name = "Linkedin",
						                           url = "https://www.linkedin.com/in/davisantos99/",
						                           email = "davicalixto2077@gmail.com"),
								license = @License(name = "Apache 2.0",
												   url = "http://www.apache.org/licenses/LICENSE-2.0.html")
								))
public class SocialCodeApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SocialCodeApplication.class, args);
	}

}
