package com.astro.paraCodar.dto;

import com.astro.paraCodar.entities.User;

public class UserMinDTO {
	
	private Long id;
	private String name;
	private String email;
	
	public UserMinDTO() {
	}
	
	public UserMinDTO(User entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}
	
}
