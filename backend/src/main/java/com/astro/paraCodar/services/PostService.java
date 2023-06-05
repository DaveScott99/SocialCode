package com.astro.paraCodar.services;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.paraCodar.dto.response.PostDTO;
import com.astro.paraCodar.entities.Coment;
import com.astro.paraCodar.entities.Post;
import com.astro.paraCodar.entities.User;
import com.astro.paraCodar.repositories.ComentRepository;
import com.astro.paraCodar.repositories.PostRepository;
import com.astro.paraCodar.repositories.UserRepository;
import com.astro.paraCodar.services.exceptions.EntityNotFoundException;
		
@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ComentRepository comentRepository;
	
	@Transactional(readOnly = true)
	public Page<PostDTO> findAllPaged(Pageable pageable){
		Page<Post> posts = postRepository.findAllByOrderByCreationDateDesc(pageable);
		return posts.map(x -> new PostDTO(x));
	}
	
	@Transactional(readOnly = true)
	public PostDTO findById(Long id) {
		Post result = postRepository.findById(id).get();
		return new PostDTO(result);
	}
	
	@Transactional(readOnly = true)
	public List<PostDTO> findPostsByUser(Long id) {
		List<Post> posts = postRepository.findPostByUserId(id);
		return posts.stream().map(x -> new PostDTO(x)).toList();
	}
	
	@Transactional
	public PostDTO insert(PostDTO dto) {
		Post entity = new Post();
		copyDtoToEntity(dto, entity);
		entity.setCreationDate(Instant.now());
		entity = postRepository.save(entity);	
		return new PostDTO(entity);
	}
	
	@Transactional
	public PostDTO update(Long id, PostDTO dto) {
		try {
			Post post = postRepository.getReferenceById(id);
			copyDtoToEntity(dto, post);
			post = postRepository.save(post);
			return new PostDTO(post);
		}
		catch (EntityNotFoundException e) {
			throw new EntityNotFoundException("Id não encontrado " + id);
		}
	}
	
	@Transactional
	public String likePost(Long postId, Long userId) {
		
		Optional<Post> post = postRepository.findById(postId);
		Optional<User> user = userRepository.findById(userId);
		
		if (post == null || user == null) {
			return "ERRO";
		}
		
		/* CASO O USUÁRIO AINDA NÃO TENHA DADO LIKE, ENTÃO SALVO O LIKE DO USUÁRIO NA POSTAGEM */
		if (!post.get().getLikes().contains(user.get())) {
			
			if (user.isPresent() && post.isPresent()) {
				
				post.get().getLikes().add(user.get());
				user.get().getLikedPosts().add(post.get());
				
				postRepository.save(post.get());
				userRepository.save(user.get());
				
				return "Post curtido com sucesso";
			}
			
		}
		else {
			
			/* CASO CONTRARIO O LIKE SERÁ REMOVIDO DA POSTAGEM */
			if (user.isPresent() && post.isPresent()) {
				post.get().getLikes().remove(user.get());
				user.get().getLikedPosts().remove(post.get());
				
				postRepository.save(post.get());
				userRepository.save(user.get());
				
				return "Curtida removida com sucesso";
				
			}
		}
		
		return null;
		
	}

	private void copyDtoToEntity(PostDTO dto, Post entity) {
		entity.setImagePost(dto.getImagePost());
		entity.setBody(dto.getBody());
		entity.setCreationDate(dto.getCreationDate());
		entity.setUser(dto.getUser());
		
		entity.getComents().clear();
		
		for(Coment comentDto : dto.getComents()) {
			Coment coment = comentRepository.getReferenceById(comentDto.getId());
			entity.getComents().add(coment);
		}
		
		entity.getLikes().clear();
		
		for(User userLike : dto.getLikes()) {
			User coment = userRepository.getReferenceById(userLike.getId());
			entity.getLikes().add(coment);
		}
	}
	
}
