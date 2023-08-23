package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.util.Objects;

import com.astro.socialCode.entities.Playlist;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class PlaylistMinDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	
	private Long videosCount;
	
	@JsonIgnoreProperties({"id", "title", "creationDate", "owner"})
	private VideoMinDTO thumbnailPlaylist;
	
	public PlaylistMinDTO() {
	}
	
	public PlaylistMinDTO(Playlist entity) {
		id = entity.getId();
		name = entity.getName();
		videosCount = entity.getVideos().stream().count();
		thumbnailPlaylist = entity.getVideos().stream().count() >= 1 ? entity.getVideos().stream().map(video -> new VideoMinDTO(video)).findFirst().get() : null;
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
		PlaylistMinDTO other = (PlaylistMinDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
