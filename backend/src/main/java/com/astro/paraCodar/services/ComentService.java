package com.astro.paraCodar.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.paraCodar.dto.ComentDTO;
import com.astro.paraCodar.dto.mapper.ComentMapper;
import com.astro.paraCodar.repositories.ComentRepository;
import com.astro.paraCodar.services.exceptions.DatabaseException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ComentService {

	private final ComentRepository comentRepository;
	
	private final ComentMapper comentMapper;
	
	public ComentService(ComentRepository comentRepository, ComentMapper comentMapper) {
		this.comentRepository = comentRepository;
		this.comentMapper = comentMapper;
	}

	@Transactional(readOnly = true)
	public List<ComentDTO> findComentsByUser(Long userId) {
		return comentRepository.findComentsByUserId(userId)
							   .stream()
							   .map(comentMapper::toDTO)
							   .collect(Collectors.toList());							   
	}
	
	@Transactional
	public ComentDTO publishComment(ComentDTO comentDTO) {
		return comentMapper.toDTO(comentRepository.save(comentMapper.toEntity(comentDTO)));
	}
	
	public void deleteComent(Long comentId) {
		try {
			comentRepository.findById(comentId)
							.map(foundComent -> {
								comentRepository.deleteById(comentId);
								return "Comentário excluido com sucesso";
							})
							.orElseThrow(() -> new EntityNotFoundException("Comentário não encontrado"));					
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade");
		}
	}

}
