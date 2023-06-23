package com.astro.paraCodar.utils;

import com.astro.paraCodar.dto.response.UserMinDTO;
import com.astro.paraCodar.security.AuthToken;

public class LoginMessage {
	
	private AuthToken token;
	
	private String message;
	private UserMinDTO user;
	
	public LoginMessage() {
	}
	
	public LoginMessage(String message, UserMinDTO user, AuthToken token) {
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

	public UserMinDTO getUser() {
		return user;
	}

	public void setUser(UserMinDTO user) {
		this.user = user;
	}

	public AuthToken getToken() {
		return token;
	}

	public void setToken(AuthToken token) {
		this.token = token;
	}
	
}
