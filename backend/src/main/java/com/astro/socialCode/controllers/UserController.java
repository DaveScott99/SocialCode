package com.astro.socialCode.controllers;

import java.net.URI;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
@RequestMapping("/users")
public class UserController {

	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping(value = "/profile")
	public ResponseEntity<Map<String, Object>> getUserComplementsForProfille(
			@RequestParam String username) {
		return ResponseEntity.ok().body(userService.profile(username));
	}
	
	@GetMapping
	public ResponseEntity<Page<UserDTO>> findAllPaged(@PageableDefault(size = 10) Pageable pageable){
		Page<UserDTO> users = userService.findAllPaged(pageable);
		return ResponseEntity.ok().body(users);
	}
	
	@GetMapping(value = "/searchUsers/{username}")
	public ResponseEntity<Page<UserMinDTO>> searchUsers(@PageableDefault(size = 10) Pageable pageable, @PathVariable String username) {
		return ResponseEntity.ok().body(userService.searchUsers(pageable, username));
	}
	
	@GetMapping(value = "/username/{username}")
	public ResponseEntity<UserDTO> findByUsername(@PathVariable String username) {
		return ResponseEntity.ok().body(userService.findByUsername(username));
	}
	 
	@GetMapping(value = "/{userId}")
	public ResponseEntity<UserDTO> findById(@PathVariable Long userId){
		return ResponseEntity.ok().body(userService.findById(userId));
	}
	
	@PostMapping("/register")
	public ResponseEntity<UserDTO> register(@Valid @RequestBody RegisterUserDTO RegisterDTO) {
		UserDTO user = userService.insert(RegisterDTO);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
		return ResponseEntity.created(uri).body(user);
	}
	
	@PutMapping(value = "/{userId}")
	public ResponseEntity<UserDTO> update(@PathVariable Long userId, @Valid @RequestBody UserUpdateDTO userUpdateDto){
		return ResponseEntity.ok().body(userService.update(userId, userUpdateDto));
	}
	
	@PostMapping(value = "/upload/profilePhoto/{username}")
	public ResponseEntity<UriDTO> uploadProfilePhoto(@RequestParam("file") MultipartFile file, @PathVariable String username) {
		UriDTO dto = userService.uploadProfilePhoto(file, username);
		return ResponseEntity.ok().body(dto);
	}

}
