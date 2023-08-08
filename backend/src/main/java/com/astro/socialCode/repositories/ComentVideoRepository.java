package com.astro.socialCode.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.ComentVideo;

public interface ComentVideoRepository extends JpaRepository<ComentVideo, Long>{
	
	Page<ComentVideo> findComentVideoByOwnerId(Pageable pageable, Long ownerId);
	
	Page<ComentVideo> findComentVideoByVideoId(Pageable pageable, Long videoId);
	
}
