package com.astro.socialCode.dto.mapper;

import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.VideoDTO;
import com.astro.socialCode.dto.response.LanguageDTO;
import com.astro.socialCode.entities.Language;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.entities.Video;
import com.astro.socialCode.repositories.LanguageRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Component
public class VideoMapper {
	
	private final LanguageRepository languageRepository;
	
	public VideoMapper(LanguageRepository languageRepository, LanguageMapper languageMapper) {
		this.languageRepository = languageRepository;
	}
	
	public VideoDTO toDTO(Video entity) {
		if (entity == null) {
			return null;
		}
		return new VideoDTO(entity);
	}
	
	public Video toEntity(VideoDTO videoDTO) {
		if (videoDTO == null) {
			return null;
		}
		
		Video entity = new Video();
		
		if (videoDTO.getId() != null) {
			entity.setId(videoDTO.getId());
		}
		
		entity.setTitle(videoDTO.getTitle());
		entity.setDescription(videoDTO.getDescription());
		entity.setThumbnail(videoDTO.getThumbnail());
		entity.setFileName(videoDTO.getFileName());
		entity.setOwner(new User(videoDTO.getOwner().getId(), videoDTO.getOwner().getUsername(), videoDTO.getOwner().getProfilePhoto()));
		
		entity.getLanguages().clear();
		
		for (LanguageDTO languageDto : videoDTO.getLanguages()) {
			Language language = languageRepository.findById(languageDto.getId())
											.orElseThrow(() -> new EntityNotFoundException("Linguagem não encontrada"));
			entity.getLanguages().add(language);
		}
		
		
		return entity;
	}
	
}
