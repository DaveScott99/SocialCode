package com.astro.socialCode.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.ComentPost;

public interface ComentPostRepository extends JpaRepository<ComentPost, Long>{
	
	List<ComentPost> findComentPostByOwnerId(Long ownerId);
	
	List<ComentPost> findComentPostByPostId(Long postId);
}
