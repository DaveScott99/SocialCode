package com.astro.socialCode.controllers;

import java.net.URI;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.astro.socialCode.dto.request.PlaylistCreateDTO;
import com.astro.socialCode.dto.response.PlaylistDTO;
import com.astro.socialCode.dto.response.PlaylistMinDTO;
import com.astro.socialCode.services.PlaylistService;
import com.astro.socialCode.util.MessageResponse;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {

	private PlaylistService playlistService;

	public PlaylistController(PlaylistService playlistService) {
		this.playlistService = playlistService;
	}
	
	@GetMapping
	public ResponseEntity<Set<PlaylistMinDTO>> findPlaylistsByOwner(String ownerUsername) {
		return ResponseEntity.ok().body(playlistService.findPlaylistsByOwner(ownerUsername));
	}
	
	@GetMapping(value = "/findByName")
	public ResponseEntity<PlaylistDTO> findPlaylistByName(@RequestParam(name = "playlistName") String name) {
		return ResponseEntity.ok().body(playlistService.findPlaylistByName(name));
	}
	
	@PostMapping(value = "/addVideo")
	public ResponseEntity<MessageResponse> addVideosOnPlaylist(@RequestParam String playlistName, @RequestParam String videoFileName) {
		return ResponseEntity.ok().body(playlistService.addVideosOnPlaylist(playlistName, videoFileName));
	}
	
	@PostMapping(value = "/removeVideo")
	public ResponseEntity<MessageResponse> removeVideosOnPlaylist(@RequestParam String playlistName, @RequestParam String videoFileName) {
		return ResponseEntity.ok().body(playlistService.removeVideosOnPlaylist(playlistName, videoFileName));
	}
	
	
	@PostMapping
	public ResponseEntity<PlaylistMinDTO> createPlaylist(@RequestBody PlaylistCreateDTO playlistDTO) {
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(playlistDTO.getId()).toUri();
		return ResponseEntity.created(uri).body(playlistService.createPlaylist(playlistDTO));
	}
	
	@DeleteMapping
	public ResponseEntity<MessageResponse> deletePlaylist(@RequestParam Long playlistId) {
		return ResponseEntity.ok().body(playlistService.deletePlaylist(playlistId));
	}
	
}
