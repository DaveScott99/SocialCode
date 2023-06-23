package com.astro.paraCodar.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()) // Desabilito o csrf para implementar a autenticação personalizada
			.authorizeHttpRequests()	// agora as requisições HTTP são passíveis de autorização
			.requestMatchers(HttpMethod.POST, "/login").permitAll()
			.requestMatchers(HttpMethod.POST, "/user/insert").permitAll()
			.anyRequest()
			.authenticated() // Todas as outras URLS terão a necessidade de autenticação
			.and()
			.cors(cors -> cors.disable());
		
		http.addFilterBefore(new Filter(), UsernamePasswordAuthenticationFilter.class);
				
		return http.build();
	}
	
}
