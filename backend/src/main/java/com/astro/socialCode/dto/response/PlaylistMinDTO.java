package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.util.Objects;

import com.astro.socialCode.entities.Playlist;

public class PlaylistMinDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	
	public PlaylistMinDTO() {
	}
	
	public PlaylistMinDTO(Playlist entity) {
		id = entity.getId();
		name = entity.getName();
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
