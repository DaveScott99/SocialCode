package com.astro.paraCodar.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.astro.paraCodar.dto.request.LoginDTO;
import com.astro.paraCodar.entities.LoginMessage;
import com.astro.paraCodar.services.LoginService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/login")
public class LoginController {

	private final LoginService loginService;
	
	public LoginController(LoginService loginService) {
		this.loginService = loginService;
	}
	
	@PostMapping
	public ResponseEntity<LoginMessage> login(@Valid @RequestBody LoginDTO loginDTO){
		return ResponseEntity.ok().body(loginService.loginUser(loginDTO));
	}
	
}
