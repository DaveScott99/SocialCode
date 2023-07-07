package com.astro.socialCode.dto.response;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.astro.socialCode.entities.User;

public class UserProfileDTO {

	private Long id;
	private String firstName;
	private String lastName;
	private String username;
	private String biography;
	private String title;
	private String profilePhoto;
	private String gitHubUsername;
	private String linkedinUsername;
	
	private List<PostMinDTO> posts = new ArrayList<>();

	private Set<UserMinDTO> followers = new HashSet<>();
	
	private Set<UserMinDTO> following = new HashSet<>();
	
	public UserProfileDTO() {
	}

	public UserProfileDTO(User entity) {
		id = entity.getId();
		firstName = entity.getFirstName();
		lastName = entity.getLastName();
		username = entity.getUsername();
		biography = entity.getBiography();
		title = entity.getTitle();
		profilePhoto = entity.getProfilePhoto();
		gitHubUsername = entity.getGitHubLink();
		linkedinUsername = entity.getLinkedinLink();
		
		entity.getPosts().forEach(post -> getPosts().add(new PostMinDTO(post)));
		entity.getFollowers().forEach(follower -> getFollowers().add(new UserMinDTO(follower)));
		entity.getFollowing().forEach(following -> getFollowing().add(new UserMinDTO(following)));
		
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

	public String getProfilePhoto() {
		return profilePhoto;
	}

	public String getGitHubUsername() {
		return gitHubUsername;
	}

	public String getLinkedinUsername() {
		return linkedinUsername;
	}

	public List<PostMinDTO> getPosts() {
		return posts;
	}

	public Set<UserMinDTO> getFollowers() {
		return followers;
	}

	public Set<UserMinDTO> getFollowing() {
		return following;
	}
	
}
