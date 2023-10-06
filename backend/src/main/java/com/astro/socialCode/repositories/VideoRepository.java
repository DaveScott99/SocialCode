package com.astro.socialCode.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {
	
	Page<Video> findAllByOrderByCreationDateDesc(Pageable pageable);
	
	Optional<Video> findByTitle(String title);
	
	Optional<Video> findByFileName(String fileName);

}
