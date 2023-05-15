package com.astro.paraCodar.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.astro.paraCodar.dto.PostDTO;
import com.astro.paraCodar.dto.PostMinDTO;
import com.astro.paraCodar.entities.Post;
import com.astro.paraCodar.repositories.PostRepository;

@Service
public class PostService {

	@Autowired
	private PostRepository postRepository;
	
	public PostDTO findById(Long id) {
		Post result = postRepository.findById(id).get();
		return new PostDTO(result);
	}
	
	public List<PostMinDTO> findAll(){
		List<Post> posts = postRepository.findAll();
		
		return posts.stream().map(x -> new PostMinDTO(x)).toList();
	}
	
	public PostDTO insert(PostDTO dto) {
		
		Post entity = new Post();
		copyDtoToEntity(dto, entity);
		
		entity.setInstant(LocalDate.now());
		entity = postRepository.save(entity);
				
		return new PostDTO(entity);
	}
	
	
	private void copyDtoToEntity(PostDTO dto, Post entity) {
		entity.setId(dto.getId());
		entity.setTitle(dto.getTitle());
		entity.setCoverImg(dto.getCoverImg());
		entity.setBody(dto.getBody());
		entity.setInstant(dto.getInstant());
		entity.setUser(dto.getUser());
}
	
}
