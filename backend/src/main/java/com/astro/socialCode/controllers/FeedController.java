package com.astro.socialCode.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.astro.socialCode.dto.response.PostDTO;
import com.astro.socialCode.services.FeedService;

@RestController
@RequestMapping("/feed")
public class FeedController {

	private final FeedService feedService;
	
	public FeedController(FeedService feedService) {
		this.feedService = feedService;
	}
	
	@GetMapping(value = "/{username}")
	public ResponseEntity<Page<PostDTO>> feed(Pageable pageable, @PathVariable String username) {	
		return ResponseEntity.ok().body(feedService.feed(pageable, username));
	}
	
	@GetMapping(value = "/postsByUserInterest/{username}")
	public ResponseEntity<Page<PostDTO>> postsByUserInterest(Pageable pageable, @PathVariable String username) {
		return ResponseEntity.ok().body(feedService.postsByUserInterest(pageable, username));
	}
	
}
