package com.astro.paraCodar.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.astro.paraCodar.dto.response.PostDTO;
import com.astro.paraCodar.services.PostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/post")
public class PostController {

	@Autowired
	private PostService postService;
	
	@GetMapping(value = "/findById/{id}")
	public ResponseEntity<PostDTO> findById(@PathVariable String id){
		PostDTO post = postService.findById(id);
		return ResponseEntity.ok().body(post);
	}
	
	@GetMapping(value = "/findAll")
	public ResponseEntity<List<PostDTO>> findAll(){
		List<PostDTO> posts = postService.findAll();
		return ResponseEntity.ok().body(posts);
	}
	
	@GetMapping(value = "/findPostsByUser/{userId}")
	public ResponseEntity<List<PostDTO>> findPostsByUser(@PathVariable String userId) {
		List<PostDTO> posts = postService.findPostsByUser(userId);
		return ResponseEntity.ok().body(posts);
	}

	@PostMapping(value = "/insertPost")
	public ResponseEntity<PostDTO> insert(@Valid @RequestBody PostDTO post){
		PostDTO entity = postService.insert(post);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(post.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	
	@PostMapping("/likePost/{id}")
	public ResponseEntity<Void> like(@PathVariable String id) {
		postService.incrementLike(id);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/dislikePost/{id}")
	public ResponseEntity<Void> dislike(@PathVariable String id) {
		postService.decrementLike(id);
		return ResponseEntity.ok().build();
	}
	
}
