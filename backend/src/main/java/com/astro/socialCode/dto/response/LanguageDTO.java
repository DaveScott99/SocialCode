package com.astro.socialCode.dto.response;

import java.io.Serializable;

import com.astro.socialCode.entities.Language;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder(value = {"id", "name"})
public class LanguageDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JsonProperty(value = "id")
	private Long id;
	
	@JsonProperty(value = "name")
	private String name;
		
	public LanguageDTO() {
	}
	
	public LanguageDTO(Long id) {
		this.id = id;
	}
	
	public LanguageDTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public LanguageDTO(Language entity) {
		this.id = entity.getId();
		this.name = entity.getName();
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	@Override
	public String toString() {
		return "LanguageDTO [id=" + id + ", name=" + name + "]";
	}
	
}
