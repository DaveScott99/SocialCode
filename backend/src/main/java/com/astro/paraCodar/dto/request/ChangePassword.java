package com.astro.paraCodar.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@JsonPropertyOrder(value = {"yourPassword", "newPassword"})
public class ChangePassword {

	@NotBlank
	@JsonProperty(value = "yourPassword")
	private String password;
	
	@NotBlank
	@Size(min = 6, max = 8)
	@JsonProperty(value = "newPassword")
	private String newPassword;
	
	public ChangePassword() {
	}

	public ChangePassword(@NotBlank String password, @NotBlank @Size(min = 6, max = 8) String newPassword) {
		this.password = password;
		this.newPassword = newPassword;
	}

	public String getPassword() {
		return password;
	}

	public String getNewPassword() {
		return newPassword;
	}
	
}
