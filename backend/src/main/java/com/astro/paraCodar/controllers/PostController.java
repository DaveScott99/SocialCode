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

import com.astro.paraCodar.dto.PostDTO;
import com.astro.paraCodar.services.PostService;

@RestController
@RequestMapping("/post")
public class PostController {

	@Autowired
	private PostService postService;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<PostDTO> findById(@PathVariable String id){
		PostDTO post = postService.findById(id);
		return ResponseEntity.ok().body(post);
	}
	
	@GetMapping
	public ResponseEntity<List<PostDTO>> findAll(){
		List<PostDTO> posts = postService.findAll();
		return ResponseEntity.ok().body(posts);
	}
	
	@GetMapping(value = "/usersPost/{userId}")
	public ResponseEntity<List<PostDTO>> findAll(@PathVariable String userId) {
		List<PostDTO> posts = postService.findPostsByUser(userId);
		return ResponseEntity.ok().body(posts);
	}

	@PostMapping
	public ResponseEntity<PostDTO> insert(@RequestBody PostDTO post){
		PostDTO entity = postService.insert(post);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(post.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	
	@PostMapping("/{id}/like")
	public ResponseEntity<Void> like(@PathVariable String id) {
		postService.incrementLike(id);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/{id}/dislike")
	public ResponseEntity<Void> dislike(@PathVariable String id) {
		postService.decrementLike(id);
		return ResponseEntity.ok().build();
	}
	
}
