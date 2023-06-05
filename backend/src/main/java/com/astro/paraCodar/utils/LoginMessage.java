package com.astro.paraCodar.utils;

import com.astro.paraCodar.dto.response.UserMinDTO;

public class LoginMessage {
	
	private String message;
	private Boolean status;
	private UserMinDTO user;
	
	public LoginMessage() {
	}
	
	public LoginMessage(String message, Boolean status) {
		this.message = message;
		this.status = status;
	}
	
	public LoginMessage(String message, Boolean status, UserMinDTO user) {
		this.message = message;
		this.status = status;
		this.user = user;
	}
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}

	public UserMinDTO getUser() {
		return user;
	}

	public void setUser(UserMinDTO user) {
		this.user = user;
	}
	
}
