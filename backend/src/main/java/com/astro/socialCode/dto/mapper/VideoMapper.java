package com.astro.socialCode.dto.mapper;

import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.VideoDTO;
import com.astro.socialCode.dto.request.VideoUploadFileDTO;
import com.astro.socialCode.dto.response.LanguageDTO;
import com.astro.socialCode.entities.Language;
import com.astro.socialCode.entities.ThumbnailVideo;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.entities.Video;
import com.astro.socialCode.entities.VideoQuality;
import com.astro.socialCode.repositories.LanguageRepository;
import com.astro.socialCode.repositories.VideoQualityRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Component
public class VideoMapper {
	
	private final LanguageRepository languageRepository;
	private final VideoQualityRepository videoQualityRepository;
	
	public VideoMapper(LanguageRepository languageRepository, LanguageMapper languageMapper, VideoQualityRepository videoQualityRepository) {
		this.languageRepository = languageRepository;
		this.videoQualityRepository = videoQualityRepository;
	}
	
	public VideoDTO toDTO(Video entity) {
		if (entity == null) {
			return null;
		}
		return new VideoDTO(entity);
	}
	
	public VideoUploadFileDTO toVideoUploadDTO(Video entity) {
		if (entity == null) {
			return null;
		}
		return new VideoUploadFileDTO(entity);
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
		entity.setThumbnailVideo(new ThumbnailVideo(videoDTO.getThumbnailVideo().getId(), videoDTO.getThumbnailVideo().getFileName()));
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
	
	public Video toEntityToUpload(VideoUploadFileDTO videoFile) {
		if (videoFile == null) {
			return null;
		}
		
		Video entity = new Video();
		
		if (videoFile.getId() != null) {
			entity.setId(videoFile.getId());
		}
		
		entity.setContentType(videoFile.getContentType());
		entity.setFileName(videoFile.getFileName());
		entity.setFileSize(videoFile.getFileSize());
		entity.setFilePath(videoFile.getFilePath());
		entity.setOwner(new User(videoFile.getOwner().getId(), videoFile.getOwner().getUsername(), videoFile.getOwner().getProfilePhoto()));
		
		entity.getQualities().clear();
		
		for (VideoQuality quality : videoFile.getQualities()) {
			VideoQuality qualityFound = videoQualityRepository.findById(quality.getId())
											.orElseThrow(() -> new EntityNotFoundException("Qualidade não encontrada"));
			entity.getQualities().add(qualityFound);
		}
		
		return entity;
	}
	
}
