package com.astro.socialCode.controllers;

import java.net.URI;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.astro.socialCode.dto.request.RegisterUserDTO;
import com.astro.socialCode.dto.request.UriDTO;
import com.astro.socialCode.dto.request.UserUpdateDTO;
import com.astro.socialCode.dto.response.UserDTO;
import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping(value = "/complements/{userId}")
	public ResponseEntity<Map<String, Page<?>>> getUserComplementsForProfille(
			@PathVariable Long userId, 
			@RequestParam int postsPage, 
			@RequestParam int postsSize,
			@RequestParam int followersPage,
			@RequestParam int followersSize,
			@RequestParam int followingPage,
			@RequestParam int followingSize) {
		
		Pageable postsPageable = PageRequest.of(postsPage, postsSize);
		Pageable followersPageable = PageRequest.of(followersPage, followersSize);
		Pageable followingPageable = PageRequest.of(followingPage, followingSize);
		
		return ResponseEntity.ok().body(userService.userComplementsForProfile(postsPageable, followersPageable, followingPageable, userId));
	}
	
	@GetMapping(value = "/findAllUsers/")
	public ResponseEntity<Page<UserDTO>> findAllPaged(Pageable pageable){
		Page<UserDTO> users = userService.findAllPaged(pageable);
		return ResponseEntity.ok().body(users);
	}
	
	@GetMapping(value = "/findUsersByUsername/{username}")
	public ResponseEntity<Page<UserDTO>> searchUserByUsername(Pageable pageable, @PathVariable String username) {
		return ResponseEntity.ok().body(userService.searchUserByUsername(pageable, username));
	}
	
	@GetMapping(value = "/findUserByUsername/{username}")
	public ResponseEntity<UserDTO> findByUsername(@PathVariable String username) {
		return ResponseEntity.ok().body(userService.findByUsername(username));
	}
	
	@GetMapping(value = "/findUserById/{userId}")
	public ResponseEntity<UserDTO> findById(@PathVariable Long userId){
		return ResponseEntity.ok().body(userService.findById(userId));
	}
	
	@PostMapping(value = "/register")
	public ResponseEntity<UserDTO> register(@Valid @RequestBody RegisterUserDTO RegisterDTO) {
		UserDTO user = userService.insert(RegisterDTO);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
		return ResponseEntity.created(uri).body(user);
	}
	
	@PutMapping(value = "/updateUser/{userId}")
	public ResponseEntity<UserDTO> update(@PathVariable Long userId, @Valid @RequestBody UserDTO userUpdateDto){
		return ResponseEntity.ok().body(userService.update(userId, userUpdateDto));
	}
	
	@PostMapping(value = "/upload/profilePhoto/{username}")
	public ResponseEntity<UriDTO> uploadProfilePhoto(@RequestParam("file") MultipartFile file, @PathVariable String username) {
		UriDTO dto = userService.uploadProfilePhoto(file, username);
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping("/follow/{followerId}/{userId}")
	public ResponseEntity<Void> followUser(@PathVariable Long userId, @PathVariable Long followerId) {
		userService.followUser(userId, followerId);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/unfollow/{followerId}/{userId}")
	public ResponseEntity<Void> unfollowUser(@PathVariable Long userId, @PathVariable Long followerId) {
		userService.unfollowUser(userId, followerId);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/following/{userId}")
	public ResponseEntity<Page<UserMinDTO>> findUserFollowers(Pageable pageable, @PathVariable Long userId) {
		return ResponseEntity.ok().body(userService.findUserFollowers(pageable, userId));
	}
	
	@GetMapping("/followers/{userId}")
	public ResponseEntity<Page<UserMinDTO>> findUserFollowing(Pageable pageable, @PathVariable Long userId) {
		return ResponseEntity.ok().body(userService.findUserFollowing(pageable, userId));
	}
		
}
