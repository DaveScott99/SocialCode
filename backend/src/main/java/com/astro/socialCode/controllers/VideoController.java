package com.astro.socialCode.controllers;

import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.dto.VideoDTO;
import com.astro.socialCode.dto.request.VideoUploadFileDTO;
import com.astro.socialCode.services.VideoService;
import com.astro.socialCode.util.PayloadUploadInfoVideo;

@RestController
@RequestMapping("/videos")
public class VideoController {
	
	@Value("{video_directory}")
	private String UPLOAD_VIDEO_DIRECTORY;
	
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
	
	@PutMapping(value = "/{id}", consumes = { "multipart/form-data" })
	public ResponseEntity<VideoDTO> update(@PathVariable Long id, @ModelAttribute PayloadUploadInfoVideo payload) {		
		return ResponseEntity.ok().body(videoService.update(id, payload));
	}
	
	@PostMapping
	public ResponseEntity<VideoUploadFileDTO> upload(@RequestParam MultipartFile file, @RequestParam Long ownerId) throws InterruptedException {
		return ResponseEntity.ok().body(videoService.upload(file, ownerId));
	}
	
	@GetMapping(value = "/thumbnail")
	public ResponseEntity<Resource> showThumbnail(@RequestParam String fileName, @RequestParam String videoFileName) throws MalformedURLException {
		Path imagePath = Paths.get(UPLOAD_VIDEO_DIRECTORY).resolve(fileName);
		Resource resource = new UrlResource(imagePath.toUri());
		
		if (resource.exists() && resource.isReadable()) {
			return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(resource);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
}
