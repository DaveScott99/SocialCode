package com.astro.socialCode.controllers;

import java.net.MalformedURLException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.dto.request.VideoUploadFileDTO;
import com.astro.socialCode.services.StorageService;
import com.astro.socialCode.util.MessageResponse;

@RestController
@RequestMapping("/storage")
public class StorageController {

	private final StorageService storageService;
	
	@Value("${video_directory}")
	private String VIDEO_DIRECTORY;
	
	@Value("${profile_photo_directory}")
	private String UPLOAD_PROFILE_PHOTO_DIRECTORY;
	
	public StorageController(StorageService storageService) {
		this.storageService = storageService;
	}
	
	@PostMapping(value = "/userPhoto/upload")
	public ResponseEntity<MessageResponse> uploadProfilePhoto(@RequestParam(name = "file") MultipartFile photo, @RequestParam String userAccount) throws InterruptedException {
		return ResponseEntity.ok().body(storageService.uploadProfilePhoto(photo, userAccount));
	}
	
	@PostMapping(value = "/thumbnail/upload")
	public ResponseEntity<MessageResponse> uploadThumbnail(@RequestParam(name = "file") MultipartFile photo, @RequestParam String userAccount) throws InterruptedException {
		return ResponseEntity.ok().body(storageService.uploadProfilePhoto(photo, userAccount));
	}
	
	@PostMapping(value = "/video/upload")
	public ResponseEntity<VideoUploadFileDTO> upload(@RequestParam MultipartFile file, @RequestParam Long ownerId) throws InterruptedException {
		return ResponseEntity.ok().body(storageService.uploadVideo(file, ownerId));
	}
	
	@GetMapping(value = "/thumbnail")
	public ResponseEntity<Resource> showThumbnail(@RequestParam String fileName, @RequestParam String folderName) throws MalformedURLException {
		
		Resource image = storageService.showImage(VIDEO_DIRECTORY, fileName, folderName);
		
		if (image != null) {
			return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
		}
		else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@GetMapping(value = "/userPhoto")
	public ResponseEntity<Resource> showUserPhoto(@RequestParam String fileName, @RequestParam String folderName) throws MalformedURLException {
		
		Resource image = storageService.showImage(UPLOAD_PROFILE_PHOTO_DIRECTORY, fileName, folderName);
		
		if (image != null) {
			return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
		}
		else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
}
