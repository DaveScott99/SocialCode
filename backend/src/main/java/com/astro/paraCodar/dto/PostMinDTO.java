package com.astro.paraCodar.dto;

import com.astro.paraCodar.entities.Post;

public class PostMinDTO {

	private Long id;
	private String title;
	private String coverImg;
	
	private UserMinDTO user;
	
	public PostMinDTO() {
	}
	
	public PostMinDTO(Post entity) {
		id = entity.getId();
		title = entity.getTitle();
		coverImg = entity.getCoverImg();
		user = new UserMinDTO(entity.getUser());
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getCoverImg() {
		return coverImg;
	}

	public UserMinDTO getUser() {
		return user;
	}
	
}
