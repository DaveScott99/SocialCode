package com.astro.socialCode.security;

import java.io.IOException;
import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.astro.socialCode.controllers.exceptions.StandardError;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Filter extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
			
		if (request.getHeader("Authorization") != null) {	
			
			// Recupero o cabeçalho
			Authentication auth = TokenUtil.decodeToken(request);
			
			// Verifico se o Token é válida
			if (auth != null) {
				// Se o Token for válido, a requisição é passada pra frente, indicando que ela está autenticada 
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
			else {
				// Token existe mas não é válido então é lançado um erro customizado para o usuário
				HttpStatus status = HttpStatus.UNAUTHORIZED;
				StandardError error = new StandardError();
				error.setTimestamp(Instant.now());
				error.setStatus(status.value());
				error.setError("User unauthorized for this system");
				error.setMessage("Have a valid token to access this endpoint");
				error.setPath(request.getRequestURI());
				
				response.setStatus(error.getStatus());
				response.setContentType("application/json");
				ObjectMapper mapper = new ObjectMapper();
				mapper.registerModule(new JavaTimeModule());
				mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
				
				response.getWriter().print(mapper.writeValueAsString(error));
				response.getWriter().flush();
				return;
			}
		}
		
		filterChain.doFilter(request, response);
		
	}
	
}
