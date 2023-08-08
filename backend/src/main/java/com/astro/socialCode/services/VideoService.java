package com.astro.socialCode.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.dto.mapper.VideoMapper;
import com.astro.socialCode.dto.request.VideoUploadFileDTO;
import com.astro.socialCode.dto.response.LanguageDTO;
import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.dto.response.VideoDTO;
import com.astro.socialCode.entities.Language;
import com.astro.socialCode.entities.ThumbnailVideo;
import com.astro.socialCode.entities.VideoQuality;
import com.astro.socialCode.repositories.LanguageRepository;
import com.astro.socialCode.repositories.ThumbnailVideoRepository;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.repositories.VideoRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;
import com.astro.socialCode.util.FFmpegVideoConverter;
import com.astro.socialCode.util.PayloadUploadInfoVideo;

@Service
public class VideoService {
	
	@Value("${video_directory}")
	private String UPLOAD_VIDEO_DIRECTORY;
	
	private final VideoRepository videoRepository;
	private final LanguageRepository languageRepository;
	private final ThumbnailVideoRepository thumbnailVideoRepository;
	private final UserRepository userRepository;
	private final VideoMapper videoMapper;
	private final FFmpegVideoConverter ffmpegVideoConverter;

	public VideoService(VideoRepository videoRepository, VideoMapper videoMapper, 
			FFmpegVideoConverter ffmpegVideoConverter, LanguageRepository languageRepository,
			UserRepository userRepository, ThumbnailVideoRepository thumbnailVideoRepository) {
		this.videoRepository = videoRepository;
		this.videoMapper = videoMapper;
		this.ffmpegVideoConverter = ffmpegVideoConverter;
		this.languageRepository = languageRepository;
		this.userRepository = userRepository;
		this.thumbnailVideoRepository = thumbnailVideoRepository;
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
	public VideoDTO update(Long id, PayloadUploadInfoVideo payload){		
		return videoRepository.findById(id)
				 .map(videoFound -> {
					 videoFound.setTitle(payload.getTitle());
					 videoFound.setDescription(payload.getDescription());
					 videoFound.setFileName(payload.getFileName());
					 
					 for (LanguageDTO languageDto : payload.getLanguages()) {
							Language language = languageRepository.findById(languageDto.getId())
															.orElseThrow(() -> new EntityNotFoundException("Linguagem não encontrada"));
							videoFound.getLanguages().add(language);
					 }
					 
				 	 String uploadDir = UPLOAD_VIDEO_DIRECTORY + payload.getFileName().replace(".mp4", "");

					 String originalName = payload.getThumbnailFile().getOriginalFilename();
		             String fileExtension = originalName.substring(originalName.lastIndexOf("."));
		             String newFileName = UUID.randomUUID().toString() + fileExtension;
					 String filePath = uploadDir + File.separator + newFileName;
					 File dest = new File(filePath);
		             
		             ThumbnailVideo thumbnail = new ThumbnailVideo();
						
					 thumbnail.setFileName(newFileName);
					 thumbnail.setContentType(payload.getThumbnailFile().getContentType());
					 thumbnail.setFileSize(payload.getThumbnailFile().getSize());
					 thumbnail.setFilePath(filePath);
					
					 ThumbnailVideo savedThumbnail = thumbnailVideoRepository.save(thumbnail);
		             
					 videoFound.setThumbnailVideo(savedThumbnail);
					 
					 try {
						 payload.getThumbnailFile().transferTo(dest);					
					 }
					 catch(IOException e) {
						throw new IllegalArgumentException(e.getMessage());
					 }
					 
					 return videoMapper.toDTO(videoRepository.save(videoFound));
				 })
				 .orElseThrow(() -> new EntityNotFoundException("Vídeo não encontrado " + id));
	}
	
	@Transactional
	public VideoUploadFileDTO upload(MultipartFile videoFile, Long ownerId) throws InterruptedException {
		try {
			
			UserMinDTO owner = userRepository.findById(ownerId)
					.map(user -> new UserMinDTO(user))
					.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
			
			if (owner != null) {
				String newFileName = UUID.randomUUID().toString();
	            String uploadDir = UPLOAD_VIDEO_DIRECTORY + newFileName;
				File outputDirectory = new File(uploadDir);
				Path tempDir = Files.createTempDirectory("video-temp");
				File tempFile = new File(tempDir.toFile(), videoFile.getOriginalFilename());
				if (!outputDirectory.exists()) {
					outputDirectory.mkdirs();
				}
				
				videoFile.transferTo(tempFile);
	            
				VideoUploadFileDTO videoFileToInsert = new VideoUploadFileDTO();

				if (ffmpegVideoConverter.processor360p(tempFile, outputDirectory)) {
					videoFileToInsert.setFileName(newFileName);
					videoFileToInsert.setContentType(videoFile.getContentType());
					videoFileToInsert.setFileSize(videoFile.getSize());
					videoFileToInsert.setFilePath(uploadDir);
					videoFileToInsert.setOwner(owner);
					
					VideoQuality quality360p = new VideoQuality(2L, "360p");
					
					videoFileToInsert.getQualities().add(quality360p);
					
					return videoMapper.toVideoUploadDTO(videoRepository.save(videoMapper.toEntityToUpload(videoFileToInsert)));
				};
								
			}
			
		}
		catch(IOException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
		return null;
	}
	
}
