package com.astro.socialCode.dto.mapper;

import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.request.PlaylistCreateDTO;
import com.astro.socialCode.dto.response.PlaylistDTO;
import com.astro.socialCode.dto.response.PlaylistMinDTO;
import com.astro.socialCode.dto.response.VideoMinDTO;
import com.astro.socialCode.entities.Playlist;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.entities.Video;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.repositories.VideoRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Component
public class PlaylistMapper {

	private VideoRepository videoRepository;
	private UserRepository userRepository;
	
	public PlaylistMapper(VideoRepository videoRepository, UserRepository userRepository) {
		this.videoRepository = videoRepository;
		this.userRepository = userRepository;
	}

	public PlaylistDTO toDTO(Playlist entity) {
		if (entity == null ) {
			return null;
		}
		
		return new PlaylistDTO(entity);
	}
	
	public PlaylistMinDTO toMinDTO(Playlist entity) {
		if (entity == null) {
			return null;
		}
		
		return new PlaylistMinDTO(entity);
	}
	
	public Playlist toEntityForCreate(PlaylistCreateDTO dto) {
		
		if (dto == null) {
			return null;
		}
		
		Playlist entity = new Playlist();

		if (dto.getId() != null) {
			entity.setId(dto.getId());
		}
		
		entity.setName(dto.getName());
		entity.setOwner(userRepository.findById(dto.getOwner().getId())
				.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado!")));
		
		return entity;
	}
	
	public Playlist toEntity(PlaylistDTO dto) {
		
		if (dto == null) {
			return null;
		}
		
		Playlist entity = new Playlist();
		
		if (dto.getId() != null) {
			entity.setId(dto.getId());
		}
		
		entity.setName(dto.getName());
		entity.setOwner(new User(dto.getOwner().getId(), dto.getOwner().getUsername(), dto.getOwner().getProfilePhoto()));
		
		entity.getVideos().clear();
		
		for (VideoMinDTO videoDto : dto.getVideos()) {
			Video video = videoRepository.findById(videoDto.getId())
											.orElseThrow(() -> new EntityNotFoundException("Vídeo não encontrado"));
			entity.getVideos().add(video);
		}
		
		return entity;
	}
	
}
