package com.astro.socialCode.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	
	Page<Post> findPostsByOwnerIdOrderByCreationDateDesc(Pageable pageable ,Long ownerId);
	
	List<Post> findAllByOrderByCreationDateDesc();
		
}