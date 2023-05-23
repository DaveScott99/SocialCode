package com.astro.paraCodar.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.astro.paraCodar.entities.Coment;
import com.astro.paraCodar.entities.Post;

public class ComentDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String text;
	private Post post;
	private String username;
	private LocalDateTime creationDate;
	
	public ComentDTO() {
	}
	
	public ComentDTO(Coment entity) {
		id = entity.getId();
		text = entity.getText();
		post = entity.getPost();
		username = entity.getUsername();
		creationDate = entity.getCreationDate();
	}

	public Long getId() {
		return id;
	}

	public String getText() {
		return text;
	}

	public Post getPost() {
		return post;
	}

	public String getUsername() {
		return username;
	}

	public LocalDateTime getCreationDate() {
		return creationDate;
	}
	
}
