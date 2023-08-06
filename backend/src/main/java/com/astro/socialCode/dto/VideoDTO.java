package com.astro.socialCode.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.astro.socialCode.dto.response.LanguageDTO;
import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.entities.Video;
import com.astro.socialCode.entities.VideoQuality;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder(value = {"id", "title", "description", "thumbnail", "fileName", "owner", "languages", "coments", "qualities"})
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
	
	@JsonProperty(value = "owner")
	private UserMinDTO owner;
	
	@JsonProperty(value = "votesCount")
	private Long votesCount;
	
	private boolean votedByUser;
	
	@JsonProperty(value = "languages")
	private Set<LanguageDTO> languages = new HashSet<>();
	
	@JsonProperty(value = "coments")
	private Set<ComentDTO> coments = new HashSet<>();
	
	@JsonProperty(value = "qualities")
	private Set<VideoQuality> qualities = new HashSet<>();
	
	@JsonIgnore
	private Set<UserMinDTO> votes = new HashSet<>();
	
	public VideoDTO() {
	}

	public VideoDTO(Long id, String title, String description, String thumbnail, String fileName, UserMinDTO owner,
			Long votesCount, boolean votedByUser) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.thumbnail = thumbnail;
		this.fileName = fileName;
		this.owner = owner;
		this.votesCount = votesCount;
		this.votedByUser = votedByUser;
	}

	public VideoDTO(Video entity) {
		id = entity.getId();
		title = entity.getTitle();
		description = entity.getDescription();
		thumbnail = entity.getThumbnail();
		fileName = entity.getFileName();
		owner = new UserMinDTO(entity.getOwner());
		votesCount = entity.getVotes().stream().count();
		entity.getLanguages().forEach(language -> getLanguages().add(new LanguageDTO(language)));
		entity.getComents().forEach(comentUser -> getComents().add(new ComentDTO(comentUser)));
		entity.getQualities().forEach(quality -> getQualities().add(new VideoQuality(quality.getId(), quality.getQualityName())));
		entity.getVotes().forEach(vote -> getVotes().add(new UserMinDTO(vote)));
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

	public UserMinDTO getOwner() {
		return owner;
	}

	public Long getVotesCount() {
		return votesCount;
	}

	public void setVotedByUser(boolean votedByUser) {
		this.votedByUser = votedByUser;
	}

	public boolean isVotedByUser() {
		return votedByUser;
	}

	public Set<LanguageDTO> getLanguages() {
		return languages;
	}

	public Set<ComentDTO> getComents() {
		return coments;
	}

	public Set<UserMinDTO> getVotes() {
		return votes;
	}
	
	public Set<VideoQuality> getQualities() {
		return qualities;
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
