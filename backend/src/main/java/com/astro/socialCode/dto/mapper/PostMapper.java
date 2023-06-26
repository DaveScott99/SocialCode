package com.astro.socialCode.dto.mapper;

import java.time.Instant;

import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.response.PostDTO;
import com.astro.socialCode.entities.Post;
import com.astro.socialCode.entities.User;

@Component
public class PostMapper {
	
	private final ComentMapper comentMapper;

	public PostMapper(ComentMapper comentMapper) {
		this.comentMapper = comentMapper;
	}

	public PostDTO toDTO(Post post) {
		if (post == null) {
			return null;
		}
		return new PostDTO(post);
	}
	
	public Post toEntity(PostDTO postDTO) {
		if (postDTO == null) {
			return null;
		}
		
		Post post = new Post();
		
		post.setImagePost(postDTO.getImagePost());
		post.setBody(postDTO.getBody());
		post.setCreationDate(Instant.now());
			
		post.setOwner(new User(postDTO.getOwner().getId(), postDTO.getOwner().getUsername(), postDTO.getOwner().getProfilePhoto()));
		
		post.getComents().clear();
		postDTO.getComents()
			   .stream()
			   .map(coment -> post.getComents().add(comentMapper.toEntity(coment)));
		
		post.getLikes().clear();
		postDTO.getLikes()
				.stream()
				.map(like -> post.getLikes().add(new User(like.getId(), like.getUsername(), like.getProfilePhoto())));
		
		return post;
	}
	
}
