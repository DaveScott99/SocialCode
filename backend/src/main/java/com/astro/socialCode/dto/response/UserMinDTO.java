package com.astro.socialCode.dto.response;

import java.io.Serializable;

import com.astro.socialCode.entities.User;

public class UserMinDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String username;
	private String profilePhoto;
	
	public UserMinDTO() {
	}
	
	public UserMinDTO(User user) {
		id = user.getId();
		username = user.getUsername();
		profilePhoto = user.getProfilePhoto();
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getProfilePhoto() {
		return profilePhoto;
	}

}