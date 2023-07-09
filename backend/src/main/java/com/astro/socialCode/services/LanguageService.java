package com.astro.socialCode.services;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.socialCode.dto.mapper.LanguageMapper;
import com.astro.socialCode.dto.response.LanguageDTO;
import com.astro.socialCode.repositories.LanguageRepository;
import com.astro.socialCode.services.exceptions.DatabaseException;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;
import com.astro.socialCode.util.UtilMethods;

@Service
public class LanguageService {

	private final LanguageRepository languageRepository;
	
	private final LanguageMapper languageMapper;
	
	private final UtilMethods utilMethods;

	public LanguageService(LanguageRepository languageRepository, LanguageMapper languageMapper, UtilMethods utilMethods) {
		this.languageRepository = languageRepository;
		this.languageMapper = languageMapper;
		this.utilMethods = utilMethods;
	}
	
	@Transactional(readOnly = true)
	public Page<LanguageDTO> findAllLanguages(Pageable pageable) {
		List<LanguageDTO> languages = languageRepository.findAll()
						.stream()
						.map(languageMapper::toDTO)
						.toList();
		return utilMethods.convertListToPagination(pageable, languages);
	}
	
	@Transactional(readOnly = true)
	public LanguageDTO findById(Long languageId) {
		return languageRepository.findById(languageId)
					.map(languageMapper::toDTO)
					.orElseThrow(() -> new EntityNotFoundException("Linguagem não encontrada"));
	}
	
	@Transactional
	public LanguageDTO create(LanguageDTO dto) {
		return languageMapper.toDTO(languageRepository.save(languageMapper.toEntity(dto)));
	}
	
	@Transactional
	public LanguageDTO update(Long languageId, LanguageDTO dto) {
		return languageRepository.findById(languageId)
				 .map(languageFound -> {
					languageFound.setName(dto.getName());
					return languageMapper.toDTO(languageRepository.save(languageFound));
				 })
				 .orElseThrow(() -> new EntityNotFoundException("Linguagem não encontrada"));
	}
	
	public void deleteLanguage(Long languageId) {
		try {
			languageRepository.findById(languageId)
				  .map(language -> {
					  	languageRepository.deleteById(languageId);
					  	return "Linguagem excluida com sucesso";
					  })
				  .orElseThrow(() -> new EntityNotFoundException("Linguagem não encontrada"));
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade");
		}
	}
	
}
