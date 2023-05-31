package com.astro.paraCodar.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.paraCodar.entities.Post;


public interface PostRepository extends JpaRepository<Post, Long> {
	
	List<Post> findPostByUserId(Long userId);
	
	Page<Post> findAllByOrderByCreationDateDesc(Pageable pageable);
		
}
