package com.astro.socialCode.controllers;

import java.net.URI;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.astro.socialCode.dto.response.LanguageDTO;
import com.astro.socialCode.services.LanguageService;

@RestController
@RequestMapping("/languages")
public class LanguageController {

	
	private final LanguageService languageService;
	
	public LanguageController(LanguageService languageService) {
		this.languageService = languageService;
	}

	@GetMapping
	public ResponseEntity<Page<LanguageDTO>> findAll(Pageable pageable){
		return ResponseEntity.ok().body(languageService.findAllLanguages(pageable));
	}
	
	@GetMapping("/{languageId}")
	public ResponseEntity<LanguageDTO> findById(@PathVariable Long languageId){
		return ResponseEntity.ok().body(languageService.findById(languageId));
	}
	
	@PostMapping
	public ResponseEntity<LanguageDTO> create(@RequestBody LanguageDTO language){
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(language.getId()).toUri();
		return ResponseEntity.created(uri).body(languageService.create(language));
	}
	
	@PutMapping(value = "/{languageId}")
	public ResponseEntity<LanguageDTO> updatePost(@PathVariable Long languageId ,@RequestBody LanguageDTO language) {
		return ResponseEntity.ok().body(languageService.update(languageId, language));
	}
	
	@DeleteMapping(value = "/{languageId}")
	public ResponseEntity<Void> deletePost(@PathVariable Long languageId) {
		languageService.deleteLanguage(languageId);
		return ResponseEntity.noContent().build();
	}
	
}
