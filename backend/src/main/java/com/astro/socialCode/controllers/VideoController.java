package com.astro.socialCode.controllers;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.astro.socialCode.entities.VideoFile;
import com.astro.socialCode.repositories.VideoRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@RestController
@RequestMapping("/watch")
public class VideoController {

	private final VideoRepository videoRepository;

	public VideoController(VideoRepository videoRepository) {
		this.videoRepository = videoRepository;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Resource> displayFile(@PathVariable Long id) {
		
		VideoFile videoFile = videoRepository.findById(id)
					.orElseThrow(() -> new EntityNotFoundException("Vídeo não encontrado"));
		
		if (videoFile == null) {
			return ResponseEntity.notFound().build();
		}
		
		Path filePath = Paths.get(videoFile.getFilePath());
		Resource resource;
		
		try {
			resource = new UrlResource(filePath.toUri());
		}
		catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
		
		String contentType = videoFile.getContentType();
		MediaType mediaType = MediaType.parseMediaType(contentType);
		
		return ResponseEntity.ok().contentType(mediaType).body(resource);
		
	}
	
}
