package com.astro.paraCodar.dto;

import java.io.Serializable;

import com.astro.paraCodar.entities.User;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String userImg;
	private String email;
	private String password;
	
	public UserDTO() {	
	}
	
	public UserDTO(User entity) {
		id = entity.getId();
		name = entity.getName();
		userImg = entity.getUserImg();
		email = entity.getEmail();
		password = entity.getPassword();
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getUserImg() {
		return userImg;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}
	
}
