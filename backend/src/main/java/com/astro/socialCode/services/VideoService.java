package com.astro.socialCode.services;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.dto.VideoDTO;
import com.astro.socialCode.dto.mapper.VideoMapper;
import com.astro.socialCode.entities.Video;
import com.astro.socialCode.repositories.VideoRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Service
public class VideoService {
	
	private final VideoRepository videoRepository;
	private final VideoMapper videoMapper;

	public VideoService(VideoRepository videoRepository, VideoMapper videoMapper) {
		this.videoRepository = videoRepository;
		this.videoMapper = videoMapper;
	}

	@Transactional(readOnly = true)
	public Page<VideoDTO> findAll(Pageable pageable) {
		return videoRepository.findAllByOrderByUploadMomentDesc(pageable)
				.map(videoMapper::toDTO);
	}
	
	@Transactional(readOnly = true)
	public VideoDTO findById(Long id) {
		return videoRepository.findById(id)
				.map(videoMapper::toDTO)
				.orElseThrow(() -> new EntityNotFoundException("Video não encontrado com o ID: " + id));
	}

	@Transactional(readOnly = true)
	public VideoDTO findByTitle(String title) {
		return videoRepository.findByTitle(title)
				.map(videoMapper::toDTO)
				.orElseThrow(() -> new EntityNotFoundException("Video não encontrado"));
	}
	
	@Transactional
	public VideoDTO update(Long id, VideoDTO newVideo){		
		return videoRepository.findById(id)
				 .map(videoFound -> {
					 videoFound.setTitle(newVideo.getTitle());
					 videoFound.setDescription(newVideo.getDescription());
					 videoFound.setThumbnail(newVideo.getThumbnail());
					 videoFound.setFileName(newVideo.getFileName());
					 return videoMapper.toDTO(videoRepository.save(videoFound));
				 })
				 .orElseThrow(() -> new EntityNotFoundException("Vídeo não encontrado " + id));
	}
	
	@Transactional
	public Video upload(MultipartFile videoFile) {
		try {
			
			//D:/ARQUIVOS/PROJETOS SPRING/paraCodar/files
			//D:/ARQUIVOS/PROJETOS SPRING/stream-video/src/main/resources/video
			String uploadDir = "D:/ARQUIVOS/PROJETOS SPRING/paraCodar/files";
			
			File directory = new File(uploadDir);
			
			if (!directory.exists()) {
				directory.mkdirs();
			}
			
			String originalName = videoFile.getOriginalFilename();
            String fileExtension = originalName.substring(originalName.lastIndexOf("."));
            String newFileName = UUID.randomUUID().toString() + fileExtension;
			
			String filePath = uploadDir + File.separator + newFileName;
			
			File dest = new File(filePath);
			videoFile.transferTo(dest);
			
			Video videoFileToInsert = new Video();
			
			videoFileToInsert.setFileName(newFileName);
			videoFileToInsert.setContentType(videoFile.getContentType());
			videoFileToInsert.setFileSize(videoFile.getSize());
			videoFileToInsert.setFilePath(filePath);
			
			return videoRepository.save(videoFileToInsert);
		}
		catch(IOException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
	}
	
}
