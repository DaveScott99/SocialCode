package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.astro.socialCode.entities.ComentPost;

public class ComentPostDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String text;
	private PostMinDTO post;
	private UserMinDTO owner;
	private Instant creationDate;
	
	public ComentPostDTO() {
	}
	
	public ComentPostDTO(ComentPost entity) {
		id = entity.getId();
		text = entity.getText();
		post = new PostMinDTO(entity.getPost()); 
		owner = new UserMinDTO(entity.getOwner());
		creationDate = entity.getCreationDate();
	}

	public Long getId() {
		return id;
	}

	public String getText() {
		return text;
	}
	
	public PostMinDTO getPost() {
		return post;
	}

	public UserMinDTO getOwner() {
		return owner;
	}

	public Instant getCreationDate() {
		return creationDate;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ComentPostDTO other = (ComentPostDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
