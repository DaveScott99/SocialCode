package com.astro.socialCode.entities;

import com.astro.socialCode.dto.response.UserDTO;

public class LoginMessage {
	
	private AuthToken token;
	
	private String message;
	private UserDTO user;
	
	public LoginMessage() {
	}
	
	public LoginMessage(String message, UserDTO user, AuthToken token) {
		this.message = message;
		this.user = user;
		this.token = token;
	}
	
	public LoginMessage(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public AuthToken getToken() {
		return token;
	}

	public void setToken(AuthToken token) {
		this.token = token;
	}
	
}
