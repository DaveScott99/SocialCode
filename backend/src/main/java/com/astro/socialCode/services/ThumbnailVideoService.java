package com.astro.socialCode.services;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.dto.response.ThumbnailVideoDTO;
import com.astro.socialCode.entities.ThumbnailVideo;
import com.astro.socialCode.repositories.ThumbnailVideoRepository;
import com.astro.socialCode.repositories.VideoRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Service
public class ThumbnailVideoService {
	
	@Value("${video_directory}")
	private String UPLOAD_VIDEO_DIRECTORY;
	
	private final ThumbnailVideoRepository thumbnailVideoRepository;
	private final VideoRepository videoRepository;
	
	public ThumbnailVideoService(ThumbnailVideoRepository thumbnailVideoRepository, VideoRepository videoRepository) {
		this.thumbnailVideoRepository = thumbnailVideoRepository;
		this.videoRepository = videoRepository;
	}

	@Transactional(readOnly = true)
	public ThumbnailVideo findById(Long id) {
		return thumbnailVideoRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Thumbnail não encontrado com o ID: " + id));
	}
	
	@Transactional(readOnly = true)
	public ThumbnailVideo findByFileName(String fileName) {
		return thumbnailVideoRepository.findByFileName(fileName)
				.orElseThrow(() -> new EntityNotFoundException("Thumbnail não encontrado"));
	}
	
	
	@Transactional
	public ThumbnailVideoDTO upload(MultipartFile thumbnailImage, String videoFileName) throws InterruptedException {

		 String uploadDir = UPLOAD_VIDEO_DIRECTORY + videoFileName;

		 String originalName = thumbnailImage.getOriginalFilename();
         String fileExtension = originalName.substring(originalName.lastIndexOf("."));
         String newFileName = UUID.randomUUID().toString() + fileExtension;
		 String filePath = uploadDir + File.separator + newFileName;
		 File dest = new File(filePath);
		
		 try {
			 ThumbnailVideo thumb = thumbnailVideoRepository.save(
					 new ThumbnailVideo(newFileName, 
	        		 thumbnailImage.getSize(), 
	        		 thumbnailImage.getContentType(), 
	        		 filePath,
	        		 videoRepository.findByFileName(videoFileName).orElseThrow(() -> new EntityNotFoundException("Vídeo não encontrado!"))));
			 
			 thumbnailImage.transferTo(dest);		
			 return new ThumbnailVideoDTO(thumb);
		 }
		 catch(IOException e) {
			throw new IllegalArgumentException(e.getMessage());
		 }
						
	
	}
	
	
}
