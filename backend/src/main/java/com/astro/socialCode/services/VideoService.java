package com.astro.socialCode.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.socialCode.dto.mapper.VideoMapper;
import com.astro.socialCode.dto.response.LanguageDTO;
import com.astro.socialCode.dto.response.VideoDTO;
import com.astro.socialCode.dto.response.VideoInfoDTO;
import com.astro.socialCode.entities.Language;
import com.astro.socialCode.repositories.LanguageRepository;
import com.astro.socialCode.repositories.VideoRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Service
public class VideoService {
	
	@Value("${video_directory}")
	private String UPLOAD_VIDEO_DIRECTORY;
	
	private final VideoRepository videoRepository;
	private final LanguageRepository languageRepository;
	private final VideoMapper videoMapper;

	public VideoService(VideoRepository videoRepository, VideoMapper videoMapper, 
				LanguageRepository languageRepository) {
		this.videoRepository = videoRepository;
		this.videoMapper = videoMapper;
		this.languageRepository = languageRepository;
	}

	@Transactional(readOnly = true)
	public Page<VideoDTO> findAll(Pageable pageable) {
		return videoRepository.findAllByOrderByCreationDateDesc(pageable)
				.map(videoMapper::toDTO);
	}
	
	@Transactional(readOnly = true)
	public VideoDTO findById(Long id) {
		return videoRepository.findById(id)
				.map(videoMapper::toDTO)
				.orElseThrow(() -> new EntityNotFoundException("Video não encontrado com o ID: " + id));
	}
	
	@Transactional(readOnly = true)
	public VideoDTO findByFileName(String fileName) {
		return videoRepository.findByFileName(fileName)
				.map(videoMapper::toDTO)
				.orElseThrow(() -> new EntityNotFoundException("Video não encontrado"));
	}

	@Transactional(readOnly = true)
	public VideoDTO findByTitle(String title) {
		return videoRepository.findByTitle(title)
				.map(videoMapper::toDTO)
				.orElseThrow(() -> new EntityNotFoundException("Video não encontrado"));
	}
	
	@Transactional
	public VideoDTO update(Long id, VideoInfoDTO payload){		
		return videoRepository.findById(id)
				 .map(videoFound -> {
					 videoFound.setTitle(payload.getTitle());
					 videoFound.setDescription(payload.getDescription());
					 for (LanguageDTO languageDto : payload.getLanguages()) {
							Language language = languageRepository.findById(languageDto.getId())
															.orElseThrow(() -> new EntityNotFoundException("Linguagem não encontrada"));
							videoFound.getLanguages().add(language);
					 }
					 
					 return videoMapper.toDTO(videoRepository.save(videoFound));
				 })
				 .orElseThrow(() -> new EntityNotFoundException("Vídeo não encontrado " + id));
	}
	
}
