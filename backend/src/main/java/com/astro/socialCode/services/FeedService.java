package com.astro.socialCode.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.socialCode.dto.mapper.PostMapper;
import com.astro.socialCode.dto.response.PostDTO;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.repositories.PostRepository;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;
import com.astro.socialCode.util.UtilMethods;

@Service
public class FeedService {
	
	private final PostMapper postMapper;
	private final UserRepository userRepository;
	private final PostRepository postRepository;
	private final UtilMethods utilMethods;
		
	public FeedService(PostMapper postMapper, UserRepository userRepository, UtilMethods utilMethods, PostRepository postRepository) {
		this.postMapper = postMapper;
		this.userRepository = userRepository;
		this.postRepository = postRepository;
		this.utilMethods = utilMethods;
	}

	@Transactional(readOnly = true)
	public Page<PostDTO> feed(Pageable pageable, String username) {
		
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
		
		Set<PostDTO> feedPosts = new HashSet<>();
		
		feedPosts.addAll(
			user.getFollowing()
				.stream()
				.flatMap(follower -> {
					return follower.getPosts()
							.stream()
							.map(postMapper::toDTO);
				})
				.collect(Collectors.toSet())
		);

		feedPosts.addAll(
			postRepository.findAllByOrderByCreationDateDesc()
				.stream()
				.filter(post -> post.getLanguages().stream().anyMatch(user.getInterest()::contains))
				.map(postMapper::toDTO)
				.collect(Collectors.toSet())
		);
	
		return utilMethods.convertListToPagination(pageable, feedPosts.stream().toList());
	}
	
	@Transactional(readOnly = true)
	public Page<PostDTO> postsByUserInterest(Pageable pageable, String username) {
		
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
		
		List<PostDTO> posts = postRepository.findAllByOrderByCreationDateDesc()
								.stream()
								.filter(post -> post.getLanguages().stream().anyMatch(user.getInterest()::contains))
								.map(postMapper::toDTO)
								.toList();
		
		return utilMethods.convertListToPagination(pageable, posts);
		
	}

}
