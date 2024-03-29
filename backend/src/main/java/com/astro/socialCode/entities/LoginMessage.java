package com.astro.socialCode.entities;

import com.astro.socialCode.dto.response.UserMinDTO;

public class LoginMessage {
	
	private AuthToken token;
	private String message;
	private UserMinDTO user;
	private boolean status;
	
	public LoginMessage() {
	}
	
	public LoginMessage(String message, UserMinDTO user, AuthToken token, boolean status) {
		this.message = message;
		this.user = user;
		this.token = token;
		this.status = status;
	}
	
	public LoginMessage(String message, boolean status) {
		this.message = message;
		this.status = status;
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

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
}
