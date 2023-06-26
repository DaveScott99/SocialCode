package com.astro.paraCodar.dto.mapper;

import org.springframework.stereotype.Component;

import com.astro.paraCodar.dto.ComentDTO;
import com.astro.paraCodar.entities.Coment;
import com.astro.paraCodar.entities.Post;
import com.astro.paraCodar.entities.User;

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
		if (comentDTO.getId() != null) {
			coment.setId(comentDTO.getId());
		}
		coment.setText(comentDTO.getText());
		coment.setUser(new User(comentDTO.getUser().getId(), comentDTO.getUser().getUsername(), comentDTO.getUser().getProfilePhoto()));
		coment.setPost(new Post(comentDTO.getPost().getId(), comentDTO.getPost().getBody()));
		
		return coment;
	}
	
}
