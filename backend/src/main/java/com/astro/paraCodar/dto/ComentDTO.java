package com.astro.paraCodar.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.astro.paraCodar.dto.response.PostMinDTO;
import com.astro.paraCodar.dto.response.UserMinDTO;
import com.astro.paraCodar.entities.Coment;

public class ComentDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String text;
	private LocalDateTime creationDate;
	
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

	public LocalDateTime getCreationDate() {
		return creationDate;
	}
	
}
