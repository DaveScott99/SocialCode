package com.astro.paraCodar.dto.response;

import com.astro.paraCodar.entities.User;

public class UserMinDTO {

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
