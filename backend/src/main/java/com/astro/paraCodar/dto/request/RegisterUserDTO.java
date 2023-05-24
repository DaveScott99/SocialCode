package com.astro.paraCodar.dto.request;

import java.io.Serializable;

import com.astro.paraCodar.entities.User;
import com.astro.paraCodar.services.validation.UserInsertValid;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@UserInsertValid // Anotação que irá capturar as exceções de validação
@JsonPropertyOrder(value = {"firstName", "lastname", "username", "email", "password", "confirmPassword"})
public class RegisterUserDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id;
	
	@NotBlank(message = "Informe o seu nome")
	@JsonProperty(value = "firstName")
	private String firstName;
	
	@NotBlank(message = "Informe o seu sobrenome")
	@JsonProperty(value = "lastName")
	private String lastName;
	
	@NotBlank(message = "Informe um nome de usuário")
	@JsonProperty(value = "username")
	private String username;
	
	@NotBlank(message = "Email é obrigatório")
	@JsonProperty(value = "email")
	private String email;
	
	@Size(min = 6, message = "Deve ser maior que 6 caracteres")
	@NotBlank(message = "Informe uma senha")
	@JsonProperty(value = "password")
	private String password;
	
	@Size(min = 6, message = "Deve ser maior que 6 caracteres")
	@NotBlank(message = "Digite sua senha novamente")
	@JsonProperty(value = "confirmPassword")
	private String confirmPassword;
	
	public RegisterUserDTO() {
	}

	public RegisterUserDTO(String firstName, String lastName, String username, String email, 
			String password, String confirmPassword) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
	}
	
	public RegisterUserDTO(User entity) {
		id = entity.getId();
		firstName = entity.getFirstName();
		lastName = entity.getLastName();
		username = entity.getUsername();
		email = entity.getEmail();
		password = entity.getPassword();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	
}
