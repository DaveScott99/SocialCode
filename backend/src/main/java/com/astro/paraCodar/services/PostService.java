package com.astro.paraCodar.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.paraCodar.dto.PostDTO;
import com.astro.paraCodar.entities.Coment;
import com.astro.paraCodar.entities.Post;
import com.astro.paraCodar.repositories.ComentRepository;
import com.astro.paraCodar.repositories.PostRepository;
import com.astro.paraCodar.services.exceptions.ControllerNotFoundException;

import jakarta.persistence.EntityNotFoundException;
		
@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private ComentRepository comentRepository;
	
	@Transactional(readOnly = true)
	public PostDTO findById(String id) {
		Post result = postRepository.findById(id).get();
		return new PostDTO(result);
	}
	
	@Transactional(readOnly = true)
	public List<PostDTO> findAll(){
		List<Post> posts = postRepository.findAll();
		return posts.stream().map(x -> new PostDTO(x)).toList();
	}
	
	@Transactional(readOnly = true)
	public List<PostDTO> findPostsByUser(String id) {
		List<Post> posts = postRepository.findPostByUserId(id);
		return posts.stream().map(x -> new PostDTO(x)).toList();
	}
	
	@Transactional
	public PostDTO insert(PostDTO dto) {
		Post entity = new Post();
		copyDtoToEntity(dto, entity);
		entity.setCreationDate(LocalDateTime.now());
		entity = postRepository.save(entity);	
		return new PostDTO(entity);
	}
	
	@Transactional
	public PostDTO update(String id, PostDTO dto) {
		try {
			Post post = postRepository.getReferenceById(id);
			copyDtoToEntity(dto, post);
			post = postRepository.save(post);
			return new PostDTO(post);
		}
		catch (EntityNotFoundException e) {
			throw new ControllerNotFoundException("Id não encontrado " + id);
		}
	}
	
	@Transactional
	public void incrementLike(String id) {
		Post post = postRepository.getReferenceById(id);
		post.incrementLikes();
		update(id, new PostDTO(post));
	}
	
	@Transactional
	public void decrementLike(String id) {
		Post post = postRepository.getReferenceById(id);
		post.decrementLikes();
		update(id, new PostDTO(post));
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
	}
	
}
