package com.astro.socialCode.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.ThumbnailVideo;

public interface ThumbnailVideoRepository extends JpaRepository<ThumbnailVideo, Long> {

	Optional<ThumbnailVideo> findByFileName(String fileName);
	
}
