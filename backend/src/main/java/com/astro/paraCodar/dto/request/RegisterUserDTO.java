package com.astro.paraCodar.dto.request;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@JsonPropertyOrder(value = {"firstName", "lastname", "username", "email", "password", "confirmPassowrd"})
public class RegisterUserDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@NotBlank
	@JsonProperty(value = "firstName")
	private String firstName;
	
	@NotBlank
	@JsonProperty(value = "lastName")
	private String lastName;
	
	@NotBlank
	@JsonProperty(value = "username")
	private String username;
	
	@NotBlank
	@JsonProperty(value = "email")
	private String email;
	
	@Size(min = 6, max = 18)
	@JsonProperty(value = "password")
	private String password;
	
	@NotBlank
	@JsonProperty(value = "confirmPassword")
	private String confirmPassword;
	
	public RegisterUserDTO() {
	}

	public RegisterUserDTO(@NotBlank String firstName, @NotBlank String lastName, @NotBlank String username,
			@NotBlank String email, @Size(min = 6, max = 18) String password, @NotBlank String confirmPassword) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getUsername() {
		return username;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}
	
}
