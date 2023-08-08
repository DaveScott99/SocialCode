package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.util.Objects;

import com.astro.socialCode.entities.Video;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder(value = {"id", "title"})
public class VideoMinDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@JsonProperty(value = "id")
	private Long id;
	
	@JsonProperty(value = "title")
	private String title;
	
	public VideoMinDTO() {
	}

	public VideoMinDTO(Long id, String title) {
		this.id = id;
		this.title = title;
	}

	public VideoMinDTO(Video entity) {
		id = entity.getId();
		title = entity.getTitle();
	}
	
	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
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
		VideoMinDTO other = (VideoMinDTO) obj;
		return Objects.equals(id, other.id);
	}

}
