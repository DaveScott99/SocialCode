package com.astro.socialCode.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.Post;


public interface PostRepository extends JpaRepository<Post, Long> {
	
	List<Post> findPostsByOwnerIdOrderByCreationDateDesc(Long ownerId);
	
	List<Post> findAllByOrderByCreationDateDesc();
		
}
