package com.astro.socialCode.controllers;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.astro.socialCode.dto.response.VideoDTO;
import com.astro.socialCode.dto.response.VideoInfoDTO;
import com.astro.socialCode.services.VideoService;

@RestController
@RequestMapping("/videos")
public class VideoController {
	
	private final VideoService videoService;
	
	public VideoController(VideoService videoService) {
		this.videoService = videoService;
	}
	
	@GetMapping
	public ResponseEntity<Page<VideoDTO>> findAll(@PageableDefault(size = 10) Pageable pageable) {
		return ResponseEntity.ok().body(videoService.findAll(pageable));
	}
	
	@GetMapping(value = "/findByFileName")
	public ResponseEntity<VideoDTO> findByFileName(@RequestParam String fileName) {
		return ResponseEntity.ok().body(videoService.findByFileName(fileName));
	}
	
	@GetMapping(value = "/{title}")
	public ResponseEntity<VideoDTO> findByTitle(@PathVariable String title) {
		String titleDecoded = URLDecoder.decode(title, StandardCharsets.UTF_8);
		return ResponseEntity.ok().body(videoService.findByTitle(titleDecoded));
	}
	
	@GetMapping(value = "/findById")
	public ResponseEntity<VideoDTO> findById(@RequestParam Long videoId) {
		return ResponseEntity.ok().body(videoService.findById(videoId));
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<VideoDTO> update(@PathVariable Long id, @RequestBody VideoInfoDTO payload) {		
		return ResponseEntity.ok().body(videoService.update(id, payload));
	}

}
