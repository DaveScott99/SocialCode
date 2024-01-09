package com.astro.socialCode.dto.mapper;

import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.response.ComentPostDTO;
import com.astro.socialCode.entities.ComentPost;
import com.astro.socialCode.entities.Post;
import com.astro.socialCode.entities.User;

@Component
public class ComentMapper {
	
	public ComentPostDTO toDTOComentPost(ComentPost coment){
		if (coment == null) {
			return null;
		}
		return new ComentPostDTO(coment);
	}
	
	public ComentPost toEntityComentPost(ComentPostDTO comentDTO) {
		
		if (comentDTO == null) {
			return null;
		}
		
		ComentPost coment = new ComentPost();
		
		coment.setText(comentDTO.getText());
		coment.setOwner(new User(comentDTO.getOwner().getId(), comentDTO.getOwner().getUsername(), comentDTO.getOwner().getPhoto()));
		coment.setPost(new Post(comentDTO.getPost().getId(), comentDTO.getPost().getBody()));
		
		return coment;
	}
	
}
