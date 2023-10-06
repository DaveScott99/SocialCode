package com.astro.socialCode.dto.mapper;

import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.response.LanguageDTO;
import com.astro.socialCode.dto.response.PostDTO;
import com.astro.socialCode.entities.Language;
import com.astro.socialCode.entities.Post;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.repositories.LanguageRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Component
public class PostMapper {

	private final LanguageRepository languageRepository;
		
	public PostMapper(LanguageRepository languageRepository, LanguageMapper languageMapper) {
		this.languageRepository = languageRepository;
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
		
		if (postDTO.getId() != null) {
			post.setId(postDTO.getId());
		}
		
		post.setTitle(postDTO.getTitle());
		post.setImage(postDTO.getImage());
		post.setBody(postDTO.getBody());
		post.setOwner(new User(postDTO.getOwner().getId(), postDTO.getOwner().getUsername(), postDTO.getOwner().getProfilePhoto()));
	
		post.getLanguages().clear();
		
		for (LanguageDTO languageDto : postDTO.getLanguages()) {
			Language language = languageRepository.findById(languageDto.getId())
											.orElseThrow(() -> new EntityNotFoundException("Linguagem não encontrada"));
			post.getLanguages().add(language);
		}
		
		return post;
	}
	
}
