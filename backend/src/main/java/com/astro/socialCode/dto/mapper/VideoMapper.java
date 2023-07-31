package com.astro.socialCode.dto.mapper;

import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.VideoDTO;
import com.astro.socialCode.entities.Video;

@Component
public class VideoMapper {
	
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
		
		return entity;
	}
	
}
