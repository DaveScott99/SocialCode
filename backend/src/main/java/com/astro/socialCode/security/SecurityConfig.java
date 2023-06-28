package com.astro.socialCode.security;

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
		http.csrf(csrf -> csrf.disable())
			.authorizeHttpRequests()
			
			.requestMatchers(HttpMethod.POST, "/login").permitAll()
			.requestMatchers(HttpMethod.POST, "/user/register").permitAll()
						
			.requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll()
			.requestMatchers(HttpMethod.GET, "/v3/api-docs/**").permitAll()
			
			.anyRequest()
			.authenticated()
			.and()
			.cors();
				
		http.addFilterBefore(new Filter(), UsernamePasswordAuthenticationFilter.class);
				
		return http.build();
	}
	
}
