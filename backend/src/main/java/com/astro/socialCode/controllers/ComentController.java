package com.astro.socialCode.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
import com.astro.socialCode.services.ComentService;

@RestController
@RequestMapping("/coments")
public class ComentController {

	private final ComentService comentService;
	
	public ComentController(ComentService comentService) {
		this.comentService = comentService;
	}
	
	@GetMapping(value = "/findComentsByPostTitle")
	public ResponseEntity<Page<ComentPostDTO>> findComentsByPostTitle(@PageableDefault(size = 10) Pageable pageable, @RequestParam String postTitle) {
		return ResponseEntity.ok().body(comentService.findComentsByPostTitle(pageable, postTitle));
	}
	
	@GetMapping(value = "/findComentsByPost")
	public ResponseEntity<Page<ComentPostDTO>> findComentsByPost(@PageableDefault(size = 10) Pageable pageable, @RequestParam Long postId) {
		return ResponseEntity.ok().body(comentService.findComentsByPost(pageable, postId));
	}
	
	@GetMapping(value = "/findComentsInPostsByOwner")
	public ResponseEntity<Page<ComentPostDTO>> findComentsInPostsByOwner(@PageableDefault(size = 10) Pageable pageable, @RequestParam Long ownerId) {
		return ResponseEntity.ok().body(comentService.findComentsInPostByOwner(pageable, ownerId));
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
