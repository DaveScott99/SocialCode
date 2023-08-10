package com.astro.socialCode.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.dto.response.ThumbnailVideoDTO;
import com.astro.socialCode.entities.ThumbnailVideo;
import com.astro.socialCode.services.ThumbnailVideoService;

@RestController
@RequestMapping("/thumbnail")
public class ThumbnailVideoController {

	private final ThumbnailVideoService thumbnailVideoService;
	
	public ThumbnailVideoController(ThumbnailVideoService thumbnailVideoService) {
		this.thumbnailVideoService = thumbnailVideoService;
	}
	
	@GetMapping
	public ResponseEntity<ThumbnailVideo> findByFileName(@RequestParam String fileName) {
		return ResponseEntity.ok().body(thumbnailVideoService.findByFileName(fileName));
	}
	
	@PostMapping
	public ResponseEntity<ThumbnailVideoDTO> upload(@RequestParam(name = "file") MultipartFile thumbnailFile, @RequestParam String videoFileName) throws InterruptedException {
		return ResponseEntity.ok().body(thumbnailVideoService.upload(thumbnailFile, videoFileName));
	}
	
}
