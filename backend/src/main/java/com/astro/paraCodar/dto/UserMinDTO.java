package com.astro.paraCodar.dto;

import com.astro.paraCodar.entities.User;

public class UserMinDTO {
	
	private Long id;
	private String name;
	private String userImg;
	private String email;
	
	public UserMinDTO() {
	}
	
	public UserMinDTO(User entity) {
		id = entity.getId();
		name = entity.getName();
		userImg = entity.getUserImg();
		email = entity.getEmail();
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

	public void setUserImg(String userImg) {
		this.userImg = userImg;
	}

	public String getEmail() {
		return email;
	}
	
}
