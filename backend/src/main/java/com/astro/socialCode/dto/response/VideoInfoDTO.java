package com.astro.socialCode.dto.response;

import java.util.HashSet;
import java.util.Set;

import com.astro.socialCode.entities.Language;

public class VideoInfoDTO {

	private String title;
	private String description;
	private Set<LanguageDTO> languages = new HashSet<>();
	
	public VideoInfoDTO() {
	}

	public VideoInfoDTO(String title, String description, String fileName, Set<Language> languages) {
		this.title = title;
		this.description = description;
		languages.forEach(language -> this.languages.add(new LanguageDTO(language)));
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

	public Set<LanguageDTO> getLanguages() {
		return languages;
	}

	@Override
	public String toString() {
		return "VideoInfoDTO [title=" + title + ", description=" + description + ", fileName=" 
				+ ", languages=" + languages + "]";
	}
	
}
