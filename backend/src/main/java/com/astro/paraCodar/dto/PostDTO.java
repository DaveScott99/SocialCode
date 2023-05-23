package com.astro.paraCodar.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.astro.paraCodar.entities.Coment;
import com.astro.paraCodar.entities.Post;
import com.astro.paraCodar.entities.User;

public class PostDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private LocalDate instant;
	private String title;
	private String coverImg;
	private String body;
	private Long likes;
	
	private User user;
	
	private List<Coment> coments = new ArrayList<>();
	
	public PostDTO() {
	}
	
	public PostDTO(Post entity) {
		id = entity.getId();
		instant = entity.getInstant();
		title = entity.getTitle();
		coverImg = entity.getCoverImg();
		body = entity.getBody();
		user = entity.getUser();
		entity.getComents().forEach(coment -> this.coments.add(coment));
		likes = entity.getLikes();
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

	public List<Coment> getComents() {
		return coments;
	}
	
	public Long getLikes() {
		return likes;
	}
	
}
