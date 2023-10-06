package com.astro.socialCode.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.ComentPost;

public interface ComentPostRepository extends JpaRepository<ComentPost, Long>{
	
	Page<ComentPost> findComentPostByOwnerId(Pageable pageable ,Long ownerId);
	
	Page<ComentPost> findComentPostByPostId(Pageable pageable, Long postId);
	
	Page<ComentPost> findComentPostByPostTitle(Pageable pageable, String postTitle);
}
