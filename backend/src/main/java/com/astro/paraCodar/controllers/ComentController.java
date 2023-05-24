package com.astro.paraCodar.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.astro.paraCodar.dto.ComentDTO;
import com.astro.paraCodar.services.ComentService;


@RestController
@RequestMapping("/coment")
public class ComentController {

	@Autowired
	private ComentService comentService;
	
	@PostMapping(value = "/publishComent")
	public ResponseEntity<ComentDTO> publishComent(@RequestBody ComentDTO comentDTO) {
		ComentDTO coment = comentService.publishComment(comentDTO);
		return ResponseEntity.ok().body(coment);
	}
	
}
