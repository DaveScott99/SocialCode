package com.astro.socialCode.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	
	Page<Post> findPostsByOwnerUsernameOrderByCreationDateDesc(Pageable pageable ,String ownerUsername);
	
	Page<Post> findPostsByOwnerIdOrderByCreationDateDesc(Pageable pageable ,Long ownerId);
	
	List<Post> findAllByOrderByCreationDateDesc();
	
	Optional<Post> findPostByTitle(String title);
		
}
