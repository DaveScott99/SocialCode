package com.astro.paraCodar.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	
	@GetMapping(value = "/findAll/")
	public ResponseEntity<Page<PostDTO>> findAllPaged(Pageable pageable){
		Page<PostDTO> posts = postService.findAllPaged(pageable);
		return ResponseEntity.ok().body(posts);
	}
	
	@GetMapping(value = "/findById/{id}")
	public ResponseEntity<PostDTO> findById(@PathVariable Long id){
		PostDTO post = postService.findById(id);
		return ResponseEntity.ok().body(post);
	}
	
	@GetMapping(value = "/findPostsByUser/{userId}")
	public ResponseEntity<List<PostDTO>> findPostsByUser(@PathVariable Long userId) {
		List<PostDTO> posts = postService.findPostsByUser(userId);
		return ResponseEntity.ok().body(posts);
	}

	@PostMapping(value = "/insertPost")
	public ResponseEntity<PostDTO> insert(@Valid @RequestBody PostDTO post){
		PostDTO entity = postService.insert(post);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(post.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	
	@PostMapping("/{postId}/like/{userId}")
	public ResponseEntity<String> likePost(@PathVariable Long postId, @PathVariable Long userId) {
		String response = postService.likePost(postId, userId);
		return ResponseEntity.ok(response);
	}
	
}
