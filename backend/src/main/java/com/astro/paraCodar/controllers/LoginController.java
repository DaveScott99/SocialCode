package com.astro.paraCodar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.astro.paraCodar.dto.LoginDTO;
import com.astro.paraCodar.services.LoginService;
import com.astro.paraCodar.utils.LoginMessage;

@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private LoginService loginService;
	
	@PostMapping
	public ResponseEntity<LoginMessage> login(@RequestBody LoginDTO loginDTO){
		LoginMessage message = loginService.loginUser(loginDTO);
		return ResponseEntity.ok().body(message);
	}
	
}