package com.astro.paraCodar.dto.response;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.astro.paraCodar.entities.Coment;
import com.astro.paraCodar.entities.Post;
import com.astro.paraCodar.entities.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.NotBlank;

@JsonPropertyOrder(value = {"id", "creationDate", "imagePost", "body", "likes", "coments"})
public class PostDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JsonProperty(value = "id")
	private String id;
	
	@JsonProperty(value = "creationDate")
	private LocalDateTime creationDate;
	
	@JsonProperty(value = "imagePost")
	private String imagePost;
	
	@NotBlank(message = "O Post deve conter pelo menos 1 caractere")
	private String body;
	
	@JsonProperty(value = "likes")
	private Long likes;
	
	@NotBlank(message = "O Post precisa de um dono")
	@JsonProperty(value = "user")
	private User user;
	
	@JsonProperty(value = "coments")
	private List<Coment> coments = new ArrayList<>();
	
	public PostDTO() {
	}
	
	public PostDTO(Post entity) {
		id = entity.getId();
		creationDate = entity.getCreationDate();
		imagePost = entity.getImagePost();
		body = entity.getBody();
		user = entity.getUser();
		entity.getComents().forEach(coment -> this.coments.add(coment));
		likes = entity.getLikes();
	}

	public String getId() {
		return id;
	}

	public LocalDateTime getCreationDate() {
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
	
	public Long getLikes() {
		return likes;
	}
	
}
