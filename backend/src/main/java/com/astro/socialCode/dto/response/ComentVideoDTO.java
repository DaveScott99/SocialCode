package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.astro.socialCode.entities.ComentVideo;

public class ComentVideoDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String text;
	private VideoMinDTO video;
	private UserMinDTO owner;
	private Instant creationDate;
	
	public ComentVideoDTO() {
	}
	
	public ComentVideoDTO(ComentVideo entity) {
		id = entity.getId();
		text = entity.getText();
		creationDate = entity.getCreationDate();
		video = new VideoMinDTO(entity.getVideo());
		owner = new UserMinDTO(entity.getOwner());
	}
	
	public ComentVideoDTO(Long id, String text, Instant creationDate, VideoMinDTO video, UserMinDTO owner) {
		this.id = id;
		this.text = text;
		this.creationDate = creationDate;
		this.video = video;
		this.owner = owner;
	}

	public Long getId() {
		return id;
	}

	public String getText() {
		return text;
	}

	public VideoMinDTO getVideo() {
		return video;
	}

	public UserMinDTO getOwner() {
		return owner;
	}

	public Instant getCreationDate() {
		return creationDate;
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
		ComentVideoDTO other = (ComentVideoDTO) obj;
		return Objects.equals(id, other.id);
	}
		
}
