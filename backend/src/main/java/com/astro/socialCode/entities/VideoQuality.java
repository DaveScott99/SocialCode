package com.astro.socialCode.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "VIDEO_QUALITY")
public class VideoQuality {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_VIDEO_QUALITY")
	private Long id;
	
	@Column(name = "QUALITY_NAME")
	private String qualityName;
	
	@ManyToMany(mappedBy = "languages")
	@JsonIgnore
	private Set<Video> videos = new HashSet<>();

	public VideoQuality(){
	}
	
	public VideoQuality(Long id, String qualityName) {
		this.id = id;
		this.qualityName = qualityName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQualityName() {
		return qualityName;
	}

	public void setQualityName(String qualityName) {
		this.qualityName = qualityName;
	}

	public Set<Video> getVideos() {
		return videos;
	}
	
}
