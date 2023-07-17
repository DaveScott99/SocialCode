package com.astro.socialCode.dto.mapper;

import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.ComentDTO;
import com.astro.socialCode.entities.Coment;
import com.astro.socialCode.entities.Post;
import com.astro.socialCode.entities.User;

@Component
public class ComentMapper {

	public ComentDTO toDTO(Coment coment){
		if (coment == null) {
			return null;
		}
		return new ComentDTO(coment);
	}
	
	public Coment toEntity(ComentDTO comentDTO) {
		
		if (comentDTO == null) {
			return null;
		}
		
		Coment coment = new Coment();
		
		coment.setText(comentDTO.getText());
		coment.setUser(new User(comentDTO.getUser().getId(), comentDTO.getUser().getUsername(), comentDTO.getUser().getProfilePhoto()));
		coment.setPost(new Post(comentDTO.getPost().getId(), comentDTO.getPost().getBody()));
		
		return coment;
	}
	
}
