package com.astro.socialCode.services;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.entities.ThumbnailVideo;
import com.astro.socialCode.repositories.ThumbnailVideoRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Service
public class ThumbnailVideoService {
	
	private final ThumbnailVideoRepository thumbnailVideoRepository;
	
	public ThumbnailVideoService(ThumbnailVideoRepository thumbnailVideoRepository) {
		this.thumbnailVideoRepository = thumbnailVideoRepository;
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
	public ThumbnailVideo upload(MultipartFile thumbnailFile, String videoFileName) throws InterruptedException {
		try {
			
            String uploadDir = "E:/videos-segmentos/videos/" + videoFileName;

			String originalName = thumbnailFile.getOriginalFilename();
            String fileExtension = originalName.substring(originalName.lastIndexOf("."));
            String newFileName = UUID.randomUUID().toString() + fileExtension;

			
			String filePath = uploadDir + File.separator + newFileName;
			File dest = new File(filePath);
			thumbnailFile.transferTo(dest);
			
			ThumbnailVideo thumbnail = new ThumbnailVideo();
			
			thumbnail.setFileName(newFileName);
			thumbnail.setContentType(thumbnailFile.getContentType());
			thumbnail.setFileSize(thumbnailFile.getSize());
			thumbnail.setFilePath(filePath);
			
			return thumbnailVideoRepository.save(thumbnail);
						
		}
		catch(IOException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
	}
	
}
