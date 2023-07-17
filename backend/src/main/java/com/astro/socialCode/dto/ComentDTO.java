package com.astro.socialCode.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.astro.socialCode.dto.response.PostMinDTO;
import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.entities.Coment;

public class ComentDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String text;
	
	private Instant creationDate;
	
	private PostMinDTO post;
	
	private UserMinDTO user;
	
	public ComentDTO() {
	}
	
	public ComentDTO(Coment entity) {
		id = entity.getId();
		text = entity.getText();
		post = new PostMinDTO(entity.getPost()); // Conversão da Entidade para DTO
		user = new UserMinDTO(entity.getUser()); // Conversão da Entidade para DTO
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

	public UserMinDTO getUser() {
		return user;
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
		ComentDTO other = (ComentDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
