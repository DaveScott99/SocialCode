package com.astro.socialCode.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.VideoFile;

public interface VideoRepository extends JpaRepository<VideoFile, Long> {
	
		
}
