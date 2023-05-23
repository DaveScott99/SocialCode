package com.astro.paraCodar.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.astro.paraCodar.entities.Coment;
import com.astro.paraCodar.entities.Post;
import com.astro.paraCodar.entities.User;

public class PostDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id;
	private LocalDateTime creationDate;
	private String imagePost;
	private String body;
	private Long likes;
	
	private User user;
	
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
