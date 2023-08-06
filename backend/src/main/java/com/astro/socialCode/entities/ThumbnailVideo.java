package com.astro.socialCode.entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "THUMBNAIL_VIDEO")
public class ThumbnailVideo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_THUMBNAIL_VIDEO")
	private Long id;
	
	@Column(name = "FILE_NAME_THUMBNAIL")
	private String fileName;
	
	@Column(name = "FILE_SIZE_THUMBNAIL")
	private Long fileSize;
	
	@Column(name = "CONTENT_TYPE_THUMBNAIL")
	private String contentType;
	
	@Column(name = "FILE_PATH_THUMBNAIL")
	private String filePath;
	 
	@CreationTimestamp
	@Column(name = "CREATION_MOMENT_THUMBNAIL")
	private Instant creationDate;
	
	public ThumbnailVideo() {
	}

	public ThumbnailVideo(Long id, String fileName, Long fileSize, String contentType, String filePath,
			Instant creationDate) {
		this.id = id;
		this.fileName = fileName;
		this.fileSize = fileSize;
		this.contentType = contentType;
		this.filePath = filePath;
		this.creationDate = creationDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
	
}
