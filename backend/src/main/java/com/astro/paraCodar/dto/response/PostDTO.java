package com.astro.paraCodar.dto.response;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.astro.paraCodar.entities.Coment;
import com.astro.paraCodar.entities.Post;
import com.astro.paraCodar.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.NotBlank;

@JsonPropertyOrder(value = {"id", "creationDate", "imagePost", "body", "coments", "likes"})
public class PostDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JsonProperty(value = "id")
	private String id;
	
	@JsonProperty(value = "creationDate")
	private Instant creationDate;
	
	@JsonProperty(value = "imagePost")
	private String imagePost;
	
	@NotBlank(message = "O Post deve conter pelo menos 1 caractere")
	private String body;
	
	@JsonIgnoreProperties({"firstName", "lastName", "biography", "email", "password", "registrationMoment"})
	private User user;
	
	@JsonProperty(value = "coments")
	private List<Coment> coments = new ArrayList<>();
	
	@JsonProperty(value = "likes")
	@JsonIgnoreProperties({"firstName", "lastName", "biography", "email", "password", "registrationMoment"})
	private Set<User> likes = new HashSet<>();
	
	public PostDTO() {
	}
	
	public PostDTO(Post entity) {
		id = entity.getId();
		creationDate = entity.getCreationDate();
		imagePost = entity.getImagePost();
		body = entity.getBody();
		user = entity.getUser();
		entity.getComents().forEach(coment -> this.coments.add(coment));
		entity.getLikes().forEach(like -> this.likes.add(like));
	}

	public String getId() {
		return id;
	}

	public Instant getCreationDate() {
		return creationDate;
	}

	public String getImagePost() {
		return imagePost;
	}

	public String getBody() {
		return body;
	}

	public User getUser() {
		return user;
	}

	public List<Coment> getComents() {
		return coments;
	}

	public Set<User> getLikes() {
		return likes;
	}

}
