package com.astro.socialCode.entities;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "VIDEO")
public class Video {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_VIDEO")
	private Long id;
	
	@Column(name = "TITLE_VIDEO")
	private String title;
	
	@Column(name = "DESCRIPTION_VIDEO")
	private String description;
	
	@Column(name = "THUMBNAIL_VIDEO")
	private String thumbnail;
	
	@Column(name = "FILE_NAME_VIDEO")
	private String fileName;
	
	@Column(name = "FILE_SIZE_VIDEO")
	private Long fileSize;
	
	@Column(name = "CONTENT_TYPE_VIDEO")
	private String contentType;
	
	@Column(name = "FILE_PATH_VIDEO")
	private String filePath;
	 
	@CreationTimestamp
	@Column(name = "CREATION_MOMENT_VIDEO")
	private Instant creationDate; 
	
	@OneToMany(mappedBy = "video")
	private Set<ComentVideo> coments = new HashSet<>();
	
	@ManyToOne
	@JoinColumn(name = "OWNER_ID")
	private User owner;
	
	@ManyToMany
	@JoinTable(
			name = "VIDEO_PROGRAMMING_LANGUAGE",
			joinColumns = @JoinColumn(name = "ID_VIDEO"),
			inverseJoinColumns = @JoinColumn(name = "ID_LANGUAGE")
	)
	@JsonIgnoreProperties(value= {"videos"})
	private Set<Language> languages = new HashSet<>();
	
	@ManyToMany
    @JoinTable(
		name = "VIDEO_VOTES",
        joinColumns = @JoinColumn(name = "ID_VIDEO"),
        inverseJoinColumns = @JoinColumn(name = "ID_USER")
    )
	@JsonIgnoreProperties(value= {"votedVideos"})
	private Set<User> votes = new HashSet<>();
	
	@ManyToMany
	@JoinTable(
		name = "VIDEO_QUALITY_OPTIONS",
        joinColumns = @JoinColumn(name = "ID_VIDEO"),
        inverseJoinColumns = @JoinColumn(name = "ID_VIDEO_QUALITY")
	)
	@JsonIgnoreProperties(value= {"videos"})
	private Set<VideoQuality> qualities = new HashSet<>();
	
	@ManyToMany
    @JoinTable(
		name = "VIDEO_PLAYLISTS",
        joinColumns = @JoinColumn(name = "ID_VIDEO"),
        inverseJoinColumns = @JoinColumn(name = "ID_PLAYLIST")
    )
	@JsonIgnoreProperties(value= {"videos"})
	private Set<Playlist> playlists = new HashSet<>();


	public Video() {
	}

	public Video(Long id, String title, String description, String thumbnail, String fileName, Long fileSize,
			String contentType, String filePath, Instant creationDate, User owner) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.thumbnail = thumbnail;
		this.fileName = fileName;
		this.fileSize = fileSize;
		this.contentType = contentType;
		this.filePath = filePath;
		this.creationDate = creationDate;
		this.owner = owner;
	}
	
	public Video(Long id, String title) {
		this.id = id;
		this.title = title;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Instant getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Instant creationDate) {
		this.creationDate = creationDate;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}
	
	public Set<Language> getLanguages() {
		return languages;
	}

	public Set<User> getVotes() {
		return votes;
	}

	public Set<ComentVideo> getComents() {
		return coments;
	}

	public Set<VideoQuality> getQualities() {
		return qualities;
	}

	public Set<Playlist> getPlaylists() {
		return playlists;
	}
	
}
