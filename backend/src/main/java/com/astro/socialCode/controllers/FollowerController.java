package com.astro.socialCode.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.services.FollowerService;

@RestController
@RequestMapping("/followers")
public class FollowerController {

	private final FollowerService followerService;

    public FollowerController(FollowerService followerService) {
        this.followerService = followerService;
    }

	@GetMapping("/findFollowing/{userId}")
	public ResponseEntity<Page<UserMinDTO>> findUserFollowers(Pageable pageable, @PathVariable Long userId) {
		return ResponseEntity.ok().body(followerService.findUserFollowers(pageable, userId));
	}
	
	@GetMapping("/findFollowers/{userId}")
	public ResponseEntity<Page<UserMinDTO>> findUserFollowing(Pageable pageable, @PathVariable Long userId) {
		return ResponseEntity.ok().body(followerService.findUserFollowing(pageable, userId));
	}
	
    @PostMapping("/follow/{followerId}/{userId}")
	public ResponseEntity<Void> followUser(@PathVariable Long userId, @PathVariable Long followerId) {
    	followerService.followUser(userId, followerId);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/unfollow/{followerId}/{userId}")
	public ResponseEntity<Void> unfollowUser(@PathVariable Long userId, @PathVariable Long followerId) {
		followerService.unfollowUser(userId, followerId);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/isFollowing/{sourceUser}/{userToFollow}")
	public ResponseEntity<Boolean> isFollowing(@PathVariable String sourceUser, @PathVariable String userToFollow) {
		return ResponseEntity.ok().body(followerService.isFollowing(sourceUser, userToFollow));
	}
    
}
