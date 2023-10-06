package com.astro.socialCode.controllers;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.astro.socialCode.dto.response.PostDTO;
import com.astro.socialCode.services.PostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/posts")
public class PostController {

	private final PostService postService;
	
	public PostController(PostService postService) {
		this.postService = postService;
	}
	
	@GetMapping(value = "/findPostsByOwner")
	public ResponseEntity<Page<PostDTO>> findPostsByOwner(@PageableDefault(size = 10) Pageable pageable, @RequestParam String ownerUsername) {
		return ResponseEntity.ok().body(postService.findPostsByOwner(pageable, ownerUsername));
	}
	
	@GetMapping
	public ResponseEntity<PostDTO> findByTitle(@RequestParam String title, @RequestParam String user){
		
		String titleDecoded = URLDecoder.decode(title, StandardCharsets.UTF_8);
		
		System.out.println(titleDecoded);
		
		return ResponseEntity.ok().body(postService.findByTitle(titleDecoded, user));
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<PostDTO> findById(@PathVariable Long id){
		return ResponseEntity.ok().body(postService.findById(id));
	}

	@PostMapping
	public ResponseEntity<PostDTO> createPost(@Valid @RequestBody PostDTO post){
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(post.getId()).toUri();
		return ResponseEntity.created(uri).body(postService.insert(post));
	}
	
	@PutMapping(value = "/{postId}")
	public ResponseEntity<PostDTO> updatePost(@PathVariable Long postId ,@RequestBody PostDTO post) {
		return ResponseEntity.ok().body(postService.update(postId, post));
	}
	
	@DeleteMapping(value = "/{postId}")
	public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
		postService.deletePost(postId);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/relevantVote")
	public ResponseEntity<Void> relevantVote(@RequestParam Long postId, @RequestParam Long userId) {
		postService.relevantVote(postId, userId);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/unrelevantVote")
	public ResponseEntity<Void> unrelevantVote(@RequestParam Long postId, @RequestParam Long userId) {
		postService.unrelevantVote(postId, userId);
		return ResponseEntity.noContent().build();
	}
	
}
