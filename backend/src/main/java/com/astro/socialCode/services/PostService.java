package com.astro.socialCode.services;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.socialCode.dto.mapper.PostMapper;
import com.astro.socialCode.dto.response.PostDTO;
import com.astro.socialCode.repositories.ComentRepository;
import com.astro.socialCode.repositories.PostRepository;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.services.exceptions.DatabaseException;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;
	
@Service
public class PostService {
	
	private final PostMapper postMapper;
	
	private final PostRepository postRepository;
	
	private final UserRepository userRepository;
		
	public PostService(PostMapper postMapper, PostRepository postRepository, UserRepository userRepository,
			ComentRepository comentRepository) {
		this.postMapper = postMapper;
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}

	@Transactional(readOnly = true)
	public Page<PostDTO> findPostsByOwner(Pageable pageable, Long ownerId) {
		return postRepository.findPostsByOwnerIdOrderByCreationDateDesc(pageable, ownerId)
					.map(postMapper::toDTO);
	}
	
	@Transactional(readOnly = true)
	public PostDTO findById(Long postId) {
		return postRepository.findById(postId)
					.map(postMapper::toDTO)
					.orElseThrow(() -> new EntityNotFoundException("Post não encontrado"));
	}

	@Transactional
	public PostDTO insert(PostDTO dto) {
		return postMapper.toDTO(postRepository.save(postMapper.toEntity(dto)));
	}
	
	@Transactional
	public PostDTO update(Long postId, PostDTO dto) {
		return postRepository.findById(postId)
				 .map(postFound -> {
					postFound.setBody(dto.getBody());
					postFound.setImagePost(dto.getImagePost());
					return postMapper.toDTO(postRepository.save(postFound));
				 })
				 .orElseThrow(() -> new EntityNotFoundException("Post não encontrado"));
	}
	
	public void deletePost(Long postId) {
		try {
			 postRepository.findById(postId)
				  .map(post -> {
					  	postRepository.deleteById(postId);
					  	return "Post excluido com sucesso";
					  })
				  .orElseThrow(() -> new EntityNotFoundException("Post não encontrado"));
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade");
		}
	}
	
	@Transactional
	public void relevantVote(Long postId, Long userId) {
		postRepository.findById(postId)
			  .map(foundPost -> {
				  userRepository.findById(userId)
				  				.map(userFound -> {
			  						foundPost.getVotes().add(userFound);
			  						userFound.getVotedPosts().add(foundPost);
			  						postRepository.save(foundPost);
			  						userRepository.save(userFound);
			  						return userFound;
				  				})
				  				.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
				  	return foundPost;
			  })
			  .orElseThrow(() -> new EntityNotFoundException("Post não encontrado"));
	}
	
	@Transactional
	public void unrelevantVote(Long postId, Long userId) {
		postRepository.findById(postId)
			  .map(foundPost -> {
				  userRepository.findById(userId)
				  				.map(userFound -> {
				  						foundPost.getVotes().remove(userFound);
				  						userFound.getVotedPosts().remove(foundPost);
				  						postRepository.save(foundPost);
				  						userRepository.save(userFound);
				  						return userFound;
				  				})
				  				.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
				  	return foundPost;
			  })
			  .orElseThrow(() -> new EntityNotFoundException("Post não encontrado"));
	}
	
}
