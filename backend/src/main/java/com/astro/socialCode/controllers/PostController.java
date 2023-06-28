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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.astro.socialCode.dto.response.PostDTO;
import com.astro.socialCode.services.PostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/post")
public class PostController {

	private final PostService postService;
	
	public PostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping(value = "/findPostsForTimeline")
	public ResponseEntity<Page<PostDTO>> findPostsForTimeline(Pageable pageable, @RequestParam Long userId){
		return ResponseEntity.ok().body(postService.findPostsForTimeline(pageable, userId));
	}
	
	@GetMapping(value = "/findPostsByOwner/{ownerId}")
	public ResponseEntity<Page<PostDTO>> findPostsByOwner(Pageable pageable, @PathVariable Long ownerId) {
		return ResponseEntity.ok().body(postService.findPostsByOwner(pageable ,ownerId));
	}
	
	@GetMapping(value = "/findPostById/{id}")
	public ResponseEntity<PostDTO> findById(@PathVariable Long id){
		return ResponseEntity.ok().body(postService.findById(id));
	}

	@PostMapping(value = "/createPost")
	public ResponseEntity<PostDTO> createPost(@Valid @RequestBody PostDTO post){
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(post.getId()).toUri();
		return ResponseEntity.created(uri).body(postService.insert(post));
	}
	
	@PutMapping(value = "/updatePost/{postId}")
	public ResponseEntity<PostDTO> updatePost(@PathVariable Long postId ,@RequestBody PostDTO post) {
		return ResponseEntity.ok().body(postService.update(postId, post));
	}
	
	@DeleteMapping(value = "/deletePost/{postId}")
	public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
		postService.deletePost(postId);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/relevantVote/{postId}")
	public ResponseEntity<Void> relevantVote(@PathVariable Long postId, @RequestParam Long userId) {
		postService.relevantVote(postId, userId);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/unrelevantVote/{postId}")
	public ResponseEntity<Void> unrelevantVote(@PathVariable Long postId, @RequestParam Long userId) {
		postService.unrelevantVote(postId, userId);
		return ResponseEntity.noContent().build();
	}
	
}
