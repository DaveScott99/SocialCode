package com.astro.socialCode.dto.mapper;

import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.response.ComentPostDTO;
import com.astro.socialCode.dto.response.ComentVideoDTO;
import com.astro.socialCode.entities.ComentPost;
import com.astro.socialCode.entities.ComentVideo;
import com.astro.socialCode.entities.Post;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.entities.Video;

@Component
public class ComentMapper {

	public ComentVideoDTO toDTOComentVideo(ComentVideo coment){
		if (coment == null) {
			return null;
		}
		return new ComentVideoDTO(coment);
	}
	
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
	
	public ComentVideo toEntityComentVideo(ComentVideoDTO comentDTO) {
		
		if (comentDTO == null) {
			return null;
		}
		
		ComentVideo coment = new ComentVideo();
		
		coment.setText(comentDTO.getText());
		coment.setOwner(new User(comentDTO.getOwner().getId(), comentDTO.getOwner().getUsername(), comentDTO.getOwner().getPhoto()));
		coment.setVideo(new Video(comentDTO.getVideo().getId(), comentDTO.getVideo().getTitle()));
		
		return coment;
	}
	
}
