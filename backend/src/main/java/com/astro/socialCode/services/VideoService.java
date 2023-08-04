package com.astro.socialCode.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
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
import com.astro.socialCode.util.FFmpegVideoConverter;

@Service
public class VideoService {
	
	private final VideoRepository videoRepository;
	private final VideoMapper videoMapper;
	private final FFmpegVideoConverter ffmpegVideoConverter;

	public VideoService(VideoRepository videoRepository, VideoMapper videoMapper, FFmpegVideoConverter ffmpegVideoConverter) {
		this.videoRepository = videoRepository;
		this.videoMapper = videoMapper;
		this.ffmpegVideoConverter = ffmpegVideoConverter;
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
	public Video upload(MultipartFile videoFile) throws InterruptedException {
		try {

            String newFileName = UUID.randomUUID().toString();
			
            String uploadDir = "E:/videos-segmentos/videos/" + newFileName;
			
			File outputDirectory = new File(uploadDir);
			
			if (!outputDirectory.exists()) {
				outputDirectory.mkdirs();
			}
            
			String filePath = uploadDir + File.separator + newFileName;
			
			Path tempDir = Files.createTempDirectory("video-temp");
			File tempFile = new File(tempDir.toFile(), videoFile.getOriginalFilename());
			videoFile.transferTo(tempFile);
			
			ffmpegVideoConverter.convertToSegments(tempFile, outputDirectory);
			
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
