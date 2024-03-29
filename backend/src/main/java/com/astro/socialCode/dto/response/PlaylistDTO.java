package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.astro.socialCode.entities.Playlist;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class PlaylistDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private Instant creationMoment;
	private UserMinDTO owner;
	private Set<VideoMinDTO> videos = new HashSet<>();
	
	private Long videosCount;
	
	@JsonIgnoreProperties({"id", "title", "creationDate"})
	private VideoMinDTO thumbnailPlaylist;
	
	public PlaylistDTO() {
	}
	
	public PlaylistDTO(Playlist entity) {
		id = entity.getId();
		name = entity.getName();
		creationMoment = entity.getCreationMoment();
		owner = new UserMinDTO(entity.getOwner());
		videosCount = entity.getVideos().stream().count();
		entity.getVideos().forEach(video -> getVideos().add(new VideoMinDTO(video)));
		thumbnailPlaylist = entity.getVideos().stream().map(video -> new VideoMinDTO(video)).findFirst().get();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Instant getCreationMoment() {
		return creationMoment;
	}

	public void setCreationMoment(Instant creationMoment) {
		this.creationMoment = creationMoment;
	}

	public UserMinDTO getOwner() {
		return owner;
	}

	public void setOwner(UserMinDTO owner) {
		this.owner = owner;
	}

	public Set<VideoMinDTO> getVideos() {
		return videos;
	}
	
	public Long getVideosCount() {
		return videosCount;
	}

	public VideoMinDTO getThumbnailPlaylist() {
		return thumbnailPlaylist;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PlaylistDTO other = (PlaylistDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
