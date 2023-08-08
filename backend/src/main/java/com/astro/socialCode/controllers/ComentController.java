package com.astro.socialCode.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.astro.socialCode.dto.response.ComentPostDTO;
import com.astro.socialCode.dto.response.ComentVideoDTO;
import com.astro.socialCode.services.ComentService;

@RestController
@RequestMapping("/coments")
public class ComentController {

	private final ComentService comentService;
	
	public ComentController(ComentService comentService) {
		this.comentService = comentService;
	}
	
	@GetMapping(value = "/findComentsByVideo")
	public ResponseEntity<List<ComentVideoDTO>> findComentsByVideo(@RequestParam Long videoId) {
		return ResponseEntity.ok().body(comentService.findComentsByVideo(videoId));
	}
	
	@GetMapping(value = "/findComentsByPost")
	public ResponseEntity<List<ComentPostDTO>> findComentsByPost(@RequestParam Long postId) {
		return ResponseEntity.ok().body(comentService.findComentsByPost(postId));
	}
	

	@GetMapping(value = "/findComentsInVideosByOwner")
	public ResponseEntity<List<ComentVideoDTO>> findComentsInVideosByOwner(@RequestParam Long ownerId) {
		return ResponseEntity.ok().body(comentService.findComentsInVideoByOwner(ownerId));
	}
	
	@GetMapping(value = "/findComentsInPostsByOwner")
	public ResponseEntity<List<ComentPostDTO>> findComentsInPostsByOwner(@RequestParam Long ownerId) {
		return ResponseEntity.ok().body(comentService.findComentsInPostByOwner(ownerId));
	}
	
	@PostMapping(value = "/publishComentVideo")
	public ResponseEntity<ComentVideoDTO> publishComentInVideo(@RequestBody ComentVideoDTO comentDTO) {
		return ResponseEntity.ok().body(comentService.publishComentInVideo(comentDTO));
	}
	
	
	@PostMapping(value = "/publishComentPost")
	public ResponseEntity<ComentPostDTO> publishComentInPost(@RequestBody ComentPostDTO comentDTO) {
		return ResponseEntity.ok().body(comentService.publishComentInPost(comentDTO));
	}
	
	@DeleteMapping("/deleteComent/{comentId}")
	public ResponseEntity<Void> deleteComent (@PathVariable Long comentId) {
		comentService.deleteComent(comentId);
		return ResponseEntity.noContent().build();
	}
	
}
