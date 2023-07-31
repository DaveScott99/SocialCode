package com.astro.socialCode.entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "VIDEO")
public class Video {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	@JsonProperty(value = "fileSize")
	private Long fileSize;
	
	@JsonProperty(value = "contentType")
	private String contentType;
	
	@JsonProperty(value = "filePath")
	private String filePath;
	 
	@JsonProperty(value = "uploadMoment")
	@CreationTimestamp
	private Instant uploadMoment; 

	public Video() {
	}

	public Video(Long id, String title, String description, String thumbnail, String fileName, Long fileSize,
			String contentType, String filePath, Instant uploadMoment) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.thumbnail = thumbnail;
		this.fileName = fileName;
		this.fileSize = fileSize;
		this.contentType = contentType;
		this.filePath = filePath;
		this.uploadMoment = uploadMoment;
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

	public Instant getUploadMoment() {
		return uploadMoment;
	}

	public void setUploadMoment(Instant uploadMoment) {
		this.uploadMoment = uploadMoment;
	}

	
}
