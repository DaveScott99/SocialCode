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
import com.astro.paraCodar.dto.PostMinDTO;
import com.astro.paraCodar.services.PostService;

@RestController
@RequestMapping("/post")
public class PostController {

	@Autowired
	private PostService postService;
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<PostDTO> findById(@PathVariable Long id){
		PostDTO post = postService.findById(id);
		return ResponseEntity.ok().body(post);
	}
	
	@GetMapping
	public ResponseEntity<List<PostMinDTO>> findAll(){
		List<PostMinDTO> posts = postService.findAll();
		return ResponseEntity.ok().body(posts);
	}
	
	@GetMapping(value = "/usersPost/{userId}")
	public ResponseEntity<List<PostDTO>> findAll(@PathVariable Long userId) {
		List<PostDTO> posts = postService.findPostsByUser(userId);
		return ResponseEntity.ok().body(posts);
	}

	@PostMapping
	public ResponseEntity<PostDTO> insert(@RequestBody PostDTO post){
		PostDTO entity = postService.insert(post);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(post.getId()).toUri();
		return ResponseEntity.created(uri).body(entity);
	}
	
}
