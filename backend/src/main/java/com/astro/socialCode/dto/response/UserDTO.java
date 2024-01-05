package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.astro.socialCode.entities.Language;
import com.astro.socialCode.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String firstName;
	private String lastName;
	private String username;
	private String biography;
	private String title;
	private String gitHubLink;
	private String linkedinLink;
	private String email;
	private String photo;
	
	private Set<LanguageDTO> interest = new HashSet<>();
	
	@JsonIgnore
	private Set<UserMinDTO> following = new HashSet<>();
	
	@JsonIgnore
	private Set<UserMinDTO> followers = new HashSet<>();
	
	public UserDTO() {	
	}
	
	public UserDTO(Long id, String firstName, String lastName, String username, String biography, String title,
			String gitHubLink, String linkedinLink, String email, String photo) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.biography = biography;
		this.title = title;
		this.gitHubLink = gitHubLink;
		this.linkedinLink = linkedinLink;
		this.email = email;
		this.photo = photo;
	}

	public UserDTO(User entity) {
		id = entity.getId();
		firstName = entity.getFirstName();
		lastName = entity.getLastName();
		username = entity.getUsername();
		biography = entity.getBiography();
		title = entity.getTitle();
		photo = entity.getPhoto();
		gitHubLink = entity.getGitHubLink();
		linkedinLink = entity.getLinkedinLink();
		email = entity.getEmail();
		entity.getInterest().forEach(language -> getInterest().add(new LanguageDTO(language)));
		entity.getFollowing().forEach(following -> getFollowing().add(new UserMinDTO(following)));
		entity.getFollowers().forEach(follower -> getFollowers().add(new UserMinDTO(follower)));
	}
	
	public UserDTO(User entity, Set<Language> interest) {
		this(entity);
		interest.forEach(language -> this.interest.add(new LanguageDTO(language)));
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
	
	public String getPhoto() {
		return photo;
	}

	public String getGitHubLink() {
		return gitHubLink;
	}

	public String getLinkedinLink() {
		return linkedinLink;
	}

	public String getEmail() {
		return email;
	}

	public Set<LanguageDTO> getInterest() {
		return interest;
	}

	public Set<UserMinDTO> getFollowing() {
		return following;
	}

	public Set<UserMinDTO> getFollowers() {
		return followers;
	}
	
}
