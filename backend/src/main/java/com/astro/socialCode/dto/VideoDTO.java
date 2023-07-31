package com.astro.socialCode.dto;

import java.io.Serializable;
import java.util.Objects;

import com.astro.socialCode.entities.Video;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder(value = {"id", "title", "description", "thumbnail", "fileName"})
public class VideoDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@JsonProperty(value = "id")
	private Long id;
	
	@JsonProperty(value = "title")
	private String title;
	
	@JsonProperty(value = "description")
	private String description;
	
	@JsonProperty(value = "thumbnail")
	private String thumbnail;
	
	@JsonProperty(value = "fileName")
	private String fileName;
	
	public VideoDTO() {
	}
	
	public VideoDTO(Video entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.description = entity.getDescription();
		this.thumbnail = entity.getThumbnail();
		this.fileName = entity.getFileName();
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public String getThumbnail() {
		return thumbnail;
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
		VideoDTO other = (VideoDTO) obj;
		return Objects.equals(id, other.id);
	}

}
