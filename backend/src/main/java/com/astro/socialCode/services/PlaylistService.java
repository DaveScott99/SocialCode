package com.astro.socialCode.services;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.socialCode.dto.mapper.PlaylistMapper;
import com.astro.socialCode.dto.request.PlaylistCreateDTO;
import com.astro.socialCode.dto.response.PlaylistDTO;
import com.astro.socialCode.dto.response.PlaylistMinDTO;
import com.astro.socialCode.entities.Video;
import com.astro.socialCode.repositories.PlaylistRepository;
import com.astro.socialCode.repositories.VideoRepository;
import com.astro.socialCode.services.exceptions.DatabaseException;
import com.astro.socialCode.util.MessageResponse;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PlaylistService {

	private PlaylistRepository playlistRepository;
	private PlaylistMapper playlistMapper;
	private VideoRepository videoRepository;

	public PlaylistService(PlaylistRepository playlistRepository, PlaylistMapper playlistMapper,
			VideoRepository videoRepository) {
		this.playlistRepository = playlistRepository;
		this.playlistMapper = playlistMapper;
		this.videoRepository = videoRepository;
	}
	
	@Transactional(readOnly = true)
	public Set<PlaylistMinDTO> findPlaylistsByOwner(String ownerUsername) {
		return playlistRepository.findPlaylistsByOwnerUsername(ownerUsername)
				.stream()
				.map(playlistMapper::toMinDTO)
				.collect(Collectors.toSet());
	}
	
	@Transactional(readOnly = true)
	public PlaylistDTO findPlaylistByName(String name) {
		return playlistRepository.findPlaylistByName(name)
				.map(playlistMapper::toDTO)
				.orElseThrow(() -> new EntityNotFoundException("Playlist não encontrada!"));
	}
	
	@Transactional
	public MessageResponse addVideosOnPlaylist(String playlistName, String videoFileName) {
		return playlistRepository.findPlaylistByName(playlistName)
			.map(playlistFound -> {
				Video videoForAdd = videoRepository.findByFileName(videoFileName)
					.orElseThrow(() -> new EntityNotFoundException("Video não encontrado"));
				
				if (playlistFound.getVideos().contains(videoForAdd)) {
					throw new IllegalArgumentException("O vídeo já está na playlist");
				}
				
				playlistFound.getVideos().add(videoForAdd);
				videoForAdd.getPlaylists().add(playlistFound);
				playlistRepository.save(playlistFound);
				videoRepository.save(videoForAdd);
				return new MessageResponse("Vídeo adicionado");
			})
			.orElseThrow(() -> new EntityNotFoundException("Playlist não encontrada"));
	}
	
	@Transactional
	public MessageResponse removeVideosOnPlaylist(String playlistName, String videoFileName) {
		return playlistRepository.findPlaylistByName(playlistName)
			.map(playlistFound -> {
				Video videoForAdd = videoRepository.findByFileName(videoFileName)
					.orElseThrow(() -> new EntityNotFoundException("Video não encontrado"));
				
				if (!playlistFound.getVideos().contains(videoForAdd)) {
					throw new IllegalArgumentException("O vídeo não está na playlist");
				}
				
				playlistFound.getVideos().remove(videoForAdd);
				videoForAdd.getPlaylists().remove(playlistFound);
				playlistRepository.save(playlistFound);
				videoRepository.save(videoForAdd);
				return new MessageResponse("Vídeo removido");
			})
			.orElseThrow(() -> new EntityNotFoundException("Playlist não encontrada"));
	}
	
	@Transactional
	public PlaylistMinDTO createPlaylist(PlaylistCreateDTO playlistDTO) {
		return playlistMapper.toMinDTO(playlistRepository.save(playlistMapper.toEntityForCreate(playlistDTO)));
	}
	
	@Transactional
	public MessageResponse deletePlaylist(Long playlistId) {
		try {
			 return playlistRepository.findById(playlistId)
				  .map(playlistFound -> {
					  playlistRepository.deleteById(playlistId);
					  	return new MessageResponse("Playlist excluida");
					  })
				  .orElseThrow(() -> new EntityNotFoundException("Playlist não encontrada"));
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade");
		}
	}
	
}
