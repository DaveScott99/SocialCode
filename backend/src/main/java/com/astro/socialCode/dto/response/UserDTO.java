package com.astro.socialCode.dto.response;

import java.io.Serializable;

import com.astro.socialCode.entities.User;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String firstName;
	private String lastName;
	private String username;
	private String biography;
	private String title;
	private String profilePhoto;
	private String gitHubLink;
	private String linkedinLink;
	private String email;
	private String password;
	
	public UserDTO() {	
	}
	
	public UserDTO(User entity) {
		id = entity.getId();
		firstName = entity.getFirstName();
		lastName = entity.getLastName();
		username = entity.getUsername();
		biography = entity.getBiography();
		title = entity.getTitle();
		profilePhoto = entity.getProfilePhoto();
		gitHubLink = entity.getGitHubLink();
		linkedinLink = entity.getLinkedinLink();
		email = entity.getEmail();
		password = entity.getPassword();
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

	public String getTitle() {
		return title;
	}

	public String getGitHubLink() {
		return gitHubLink;
	}

	public String getLinkedinLink() {
		return linkedinLink;
	}

	public String getProfilePhoto() {
		return profilePhoto;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}
	
}
