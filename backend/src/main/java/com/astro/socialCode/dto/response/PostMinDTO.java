package com.astro.socialCode.dto.response;

import java.io.Serializable;

import com.astro.socialCode.entities.Post;

public class PostMinDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String body;
	
	public PostMinDTO() {
	}
		
	public PostMinDTO(Post entity) {
		id = entity.getId();
		body = entity.getBody();
	}

	public Long getId() {
		return id;
	}

	public String getBody() {
		return body;
	}
	
}
