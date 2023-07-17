package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.util.Objects;

import com.astro.socialCode.entities.Language;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder(value = {"id", "name", "icon"})
public class LanguageDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JsonProperty(value = "id")
	private Long id;
	
	@JsonProperty(value = "name")
	private String name;
	
	@JsonProperty(value = "icon")
	private String icon;
		
	public LanguageDTO() {
	}
	
	public LanguageDTO(Long id) {
		this.id = id;
	}
	
	public LanguageDTO(Long id, String name, String icon) {
		this.id = id;
		this.name = name;
		this.icon = icon;
	}

	public LanguageDTO(Language entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.icon = entity.getIcon();
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getIcon() {
		return icon;
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
		LanguageDTO other = (LanguageDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
