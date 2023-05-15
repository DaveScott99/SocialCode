package com.astro.paraCodar.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.astro.paraCodar.entities.Post;
import com.astro.paraCodar.entities.User;

public class PostDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private LocalDate instant;
	private String title;
	private String coverImg;
	private String body;

	private User user;
	
	public PostDTO() {
	}
	
	public PostDTO(Post post) {
		id = post.getId();
		instant = post.getInstant();
		title = post.getTitle();
		coverImg = post.getCoverImg();
		body = post.getBody();
		user = post.getUser();
	}

	public Long getId() {
		return id;
	}

	public LocalDate getInstant() {
		return instant;
	}

	public String getTitle() {
		return title;
	}

	public String getCoverImg() {
		return coverImg;
	}

	public String getBody() {
		return body;
	}

	public User getUser() {
		return user;
	}
	
}
