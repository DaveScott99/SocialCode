package com.astro.socialCode.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.dto.mapper.VideoMapper;
import com.astro.socialCode.dto.request.VideoUploadFileDTO;
import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.entities.VideoQuality;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.repositories.VideoRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;
import com.astro.socialCode.util.FFmpegVideoConverter;
import com.astro.socialCode.util.FileUpload;
import com.astro.socialCode.util.MessageResponse;

@Service
public class StorageService {
	
	@Value("${profile_photo_directory}")
	private String UPLOAD_PROFILE_PHOTO_DIRECTORY;
	
	@Value("${video_directory}")
	private String UPLOAD_VIDEO_DIRECTORY;
	
	private final VideoRepository videoRepository;
	private final UserRepository userRepository;
	private final FileUpload fileUpload;
	private final FFmpegVideoConverter ffmpegVideoConverter;
	private final VideoMapper videoMapper;
	
	public StorageService(UserRepository userRepository, FileUpload fileUpload,
			 VideoRepository videoRepository,FFmpegVideoConverter ffmpegVideoConverter,
			 VideoMapper videoMapper) {
		this.userRepository = userRepository;
		this.fileUpload = fileUpload;
		this.videoRepository = videoRepository;
		this.ffmpegVideoConverter = ffmpegVideoConverter;
		this.videoMapper = videoMapper;
	}
	
	@Transactional
	public MessageResponse uploadProfilePhoto(MultipartFile photoImage, String userAccount) throws InterruptedException {
		 
		 com.astro.socialCode.util.File file = fileUpload.uploadImage(photoImage, UPLOAD_PROFILE_PHOTO_DIRECTORY, userAccount);
		 
		 userRepository.findByUsername(userAccount)
			 .map(userFound -> {
				 userFound.setPhoto(file.getFileName());
				 return userRepository.save(userFound);
			 })
			 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
		 
		return new MessageResponse("Upload realizado com sucesso");
						
	}
	
	@Transactional
	public MessageResponse uploadThumbnailVideo(MultipartFile thumbnailImage, String videoFileName) throws InterruptedException {
		 
		 com.astro.socialCode.util.File file = fileUpload.uploadImage(thumbnailImage, UPLOAD_VIDEO_DIRECTORY, videoFileName);
		
		 videoRepository.findByFileName(videoFileName)
		 	.map(videoFound -> {
		 		videoFound.setThumbnail(file.getFileName());
		 		return videoRepository.save(videoFound);
		 	})
		 	.orElseThrow(() -> new EntityNotFoundException("Vídeo não encontrado!"));
		
		 return new MessageResponse("Upload realizado com sucesso");
	
	}
	
	@Transactional(readOnly = true)	
	public Resource showImage(String directory, String fileName, String folderName) throws MalformedURLException {
		Path imagePath = Paths.get(directory + folderName + "/" + fileName);
		Resource resource = new UrlResource(imagePath.toUri());
		
		if (resource.exists() || resource.isReadable()) {
			return resource;
		}
		else {
			return null;
		}
	}
	
	@Transactional
	public VideoUploadFileDTO uploadVideo(MultipartFile videoFile, Long ownerId) throws InterruptedException {
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
