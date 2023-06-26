package com.astro.socialCode.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.astro.socialCode.dto.request.LoginDTO;
import com.astro.socialCode.entities.LoginMessage;
import com.astro.socialCode.services.LoginService;

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
