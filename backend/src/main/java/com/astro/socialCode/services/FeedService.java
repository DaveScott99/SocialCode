package com.astro.socialCode.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.socialCode.dto.mapper.PostMapper;
import com.astro.socialCode.dto.response.PostDTO;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Service
public class FeedService {
	
	private final PostMapper postMapper;
	
	private final UserRepository userRepository;
		
	public FeedService(PostMapper postMapper, UserRepository userRepository) {
		this.postMapper = postMapper;
		this.userRepository = userRepository;
	}

	@Transactional(readOnly = true)
	public Page<PostDTO> feed(Pageable pageable, String username) {
		
		List<PostDTO> feedPosts = new ArrayList<>();

		feedPosts.addAll(userRepository.findByUsername(username)
					.map(userFound -> {
						return userFound.getFollowers()
								.stream()
								.flatMap(follower -> {
									return follower.getPosts()
											.stream()
											.map(postMapper::toDTO);
								})
								.toList();
					})
					.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado")));
		
		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), feedPosts.size());
		
		if (start > feedPosts.size() || start < 0 || end < 0 || start > end) {
			return new PageImpl<>(Collections.emptyList(), pageable, 0);
		}
		
		List<PostDTO> pagedFeedPosts = feedPosts.subList(start, end);
		
		return new PageImpl<>(pagedFeedPosts, pageable, feedPosts.size());

	}
	
}
