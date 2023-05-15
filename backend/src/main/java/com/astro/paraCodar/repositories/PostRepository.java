package com.astro.paraCodar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.paraCodar.entities.Post;


public interface PostRepository extends JpaRepository<Post, Long> {
		
}
