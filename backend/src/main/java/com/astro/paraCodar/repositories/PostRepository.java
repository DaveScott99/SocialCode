package com.astro.paraCodar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.paraCodar.entities.Post;


public interface PostRepository extends JpaRepository<Post, String> {
	
	List<Post> findPostByUserId(String userId);
		
}
