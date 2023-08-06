package com.astro.socialCode.dto;

import java.io.Serializable;
import java.util.Objects;

import com.astro.socialCode.entities.ThumbnailVideo;

public class ThumbnailVideoDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String fileName;
	
	public ThumbnailVideoDTO() {
	}

	public ThumbnailVideoDTO(Long id, String fileName) {
		this.id = id;
		this.fileName = fileName;
	}
	
	public ThumbnailVideoDTO(ThumbnailVideo entity) {
		id = entity.getId();
		fileName = entity.getFileName();
	}

	public Long getId() {
		return id;
	}

	public String getFileName() {
		return fileName;
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
		ThumbnailVideoDTO other = (ThumbnailVideoDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
