package com.astro.socialCode.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
	
	List<Playlist> findPlaylistsByOwnerUsername(String ownerUsername);
	
	Optional<Playlist> findPlaylistByName(String name);
}
