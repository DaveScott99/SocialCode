package com.astro.socialCode.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.ComentVideo;

public interface ComentVideoRepository extends JpaRepository<ComentVideo, Long>{
	
	List<ComentVideo> findComentVideoByOwnerId(Long ownerId);
	
	List<ComentVideo> findComentVideoByVideoId(Long videoId);
	
}
