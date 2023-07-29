package com.astro.socialCode.entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class VideoFile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	private String contentType;
	private long fileSize;
	private String filePath;
	
	@CreationTimestamp
	private Instant uploadMoment; 

	public VideoFile() {
	}

	public VideoFile(Long id, String title, String contentType, long fileSize, String filePath, Instant uploadMoment) {
		super();
		this.id = id;
		this.title = title;
		this.contentType = contentType;
		this.fileSize = fileSize;
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

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
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
