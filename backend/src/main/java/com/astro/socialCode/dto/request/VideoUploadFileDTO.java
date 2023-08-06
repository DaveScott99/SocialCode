package com.astro.socialCode.dto.request;

import java.util.HashSet;
import java.util.Set;

import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.entities.Video;
import com.astro.socialCode.entities.VideoQuality;

public class VideoUploadFileDTO {
	
	private Long id;
	private String fileName;
	private Long fileSize;
	private String contentType;
	private String filePath;
	private UserMinDTO owner;
	
	private Set<VideoQuality> qualities = new HashSet<>();

	public VideoUploadFileDTO() {
	}
	
	public VideoUploadFileDTO(Long id, String fileName, Long fileSize, String contentType, String filePath,
			UserMinDTO owner) {
		this.id = id;
		this.fileName = fileName;
		this.fileSize = fileSize;
		this.contentType = contentType;
		this.filePath = filePath;
		this.owner = owner;
	}
	
	public VideoUploadFileDTO(Video entity) {
		id = entity.getId();
		fileName = entity.getFileName();
		fileSize = entity.getFileSize();
		contentType = entity.getContentType();
		filePath = entity.getFilePath();
		owner = new UserMinDTO(entity.getOwner());
		entity.getQualities().forEach((quality) -> getQualities().add(quality));
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

	public UserMinDTO getOwner() {
		return owner;
	}

	public void setOwner(UserMinDTO owner) {
		this.owner = owner;
	}

	public Set<VideoQuality> getQualities() {
		return qualities;
	}

}
