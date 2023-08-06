package com.astro.socialCode.util;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.dto.response.LanguageDTO;

public class PayloadUploadInfoVideo {

	private String title;
	private String description;
	private String fileName;
	private MultipartFile thumbnailFile;
	private Set<LanguageDTO> languages = new HashSet<>();
	
	public PayloadUploadInfoVideo() {
	}

	public PayloadUploadInfoVideo(String title, String description, String fileName, MultipartFile thumbnailFile) {
		this.title = title;
		this.description = description;
		this.fileName = fileName;
		this.thumbnailFile = thumbnailFile;
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

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public MultipartFile getThumbnailFile() {
		return thumbnailFile;
	}

	public void setThumbnailFile(MultipartFile thumbnailFile) {
		this.thumbnailFile = thumbnailFile;
	}

	public Set<LanguageDTO> getLanguages() {
		return languages;
	}
	
}
