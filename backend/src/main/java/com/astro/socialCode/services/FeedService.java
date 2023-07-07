package com.astro.socialCode.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.socialCode.dto.mapper.PostMapper;
import com.astro.socialCode.dto.response.PostDTO;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;
import com.astro.socialCode.util.UtilMethods;

@Service
public class FeedService {
	
	private final PostMapper postMapper;
	
	private final UserRepository userRepository;
	
	private final UtilMethods utilMethods;
		
	public FeedService(PostMapper postMapper, UserRepository userRepository, UtilMethods utilMethods) {
		this.postMapper = postMapper;
		this.userRepository = userRepository;
		this.utilMethods = utilMethods;
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
		
		return utilMethods.convertListToPagination(pageable, feedPosts);
		
	}
	

}
