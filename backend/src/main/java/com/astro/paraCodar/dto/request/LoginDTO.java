package com.astro.paraCodar.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@JsonPropertyOrder(value = {"email", "password"})
public class LoginDTO {

	@NotBlank
	@Email
	@JsonProperty(value = "email")
	private String email;
	
	@NotBlank
	@JsonProperty(value = "password")
	private String password;
	
	public LoginDTO() {
	}

	public LoginDTO(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
