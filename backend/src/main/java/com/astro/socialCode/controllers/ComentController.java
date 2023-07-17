package com.astro.socialCode.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.astro.socialCode.dto.ComentDTO;
import com.astro.socialCode.services.ComentService;

@RestController
@RequestMapping("/coment")
public class ComentController {

	private final ComentService comentService;
	
	public ComentController(ComentService comentService) {
		this.comentService = comentService;
	}

	@GetMapping(value = "/comentsByUser/{userId}")
	public ResponseEntity<List<ComentDTO>> findComentsByUser(@PathVariable Long userId) {
		return ResponseEntity.ok().body(comentService.findComentsByUser(userId));
	}
	
	@PostMapping(value = "/publishComent")
	public ResponseEntity<ComentDTO> publishComent(@RequestBody ComentDTO comentDTO) {
		return ResponseEntity.ok().body(comentService.publishComment(comentDTO));
	}
	
	@DeleteMapping("/deleteComent/{comentId}")
	public ResponseEntity<Void> deleteComent (@PathVariable Long comentId) {
		comentService.deleteComent(comentId);
		return ResponseEntity.noContent().build();
	}
	
}
