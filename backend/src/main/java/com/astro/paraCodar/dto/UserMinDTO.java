package com.astro.paraCodar.dto;

import java.io.Serializable;

import com.astro.paraCodar.entities.User;

public class UserMinDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String firstName;
	private String lastName;
	private String username;
	private String biography;
	private String userImg;
	private String email;
	
	public UserMinDTO() {
	}
	
	public UserMinDTO(User entity) {
		id = entity.getId();
		firstName = entity.getFirstName();
		lastName = entity.getLastName();
		username = entity.getUsername();
		biography = entity.getBiography();
		userImg = entity.getUserImg();
		email = entity.getEmail();
	}

	public Long getId() {
		return id;
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

	public String getBiography() {
		return biography;
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
