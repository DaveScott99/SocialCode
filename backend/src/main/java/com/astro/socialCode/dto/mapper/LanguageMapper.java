package com.astro.socialCode.dto.mapper;

import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.response.LanguageDTO;
import com.astro.socialCode.entities.Language;

@Component
public class LanguageMapper {

	public LanguageDTO toDTO(Language entity) {
	
		if (entity == null) {
			return null;
		}
	
		return new LanguageDTO(entity);
	}
	
	public Language toEntity(LanguageDTO dto) {
		
		if (dto == null) {
			return null;
		}
		
		Language language = new Language();
		
		language.setId(dto.getId());
		language.setName(dto.getName());
		language.setIcon(dto.getIcon());
		
		return language;
		
	}
	
}
