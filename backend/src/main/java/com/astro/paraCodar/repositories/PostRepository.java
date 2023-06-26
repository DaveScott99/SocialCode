package com.astro.paraCodar.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.paraCodar.entities.Post;


public interface PostRepository extends JpaRepository<Post, Long> {
	
	Page<Post> findPostByOwnerId(Pageable pageable ,Long ownerId);
	
	Page<Post> findAllByOrderByCreationDateDesc(Pageable pageable);
		
}
