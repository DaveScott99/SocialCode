package com.astro.paraCodar.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.astro.paraCodar.dto.ComentDTO;
import com.astro.paraCodar.entities.Coment;
import com.astro.paraCodar.repositories.ComentRepository;

@Service
public class ComentService {

	@Autowired
	private ComentRepository comentRepository;
	
	public ComentDTO publishComment(ComentDTO comentDTO) {
		Coment entity = new Coment();
		copyDtoToEntity(comentDTO, entity);
		entity.setCreationDate(LocalDateTime.now());
		entity = comentRepository.save(entity);
		return new ComentDTO(entity);
	}
	
	private void copyDtoToEntity(ComentDTO dto, Coment entity) {
		entity.setId(dto.getId());
		entity.setText(dto.getText());
		entity.setUsername(dto.getUsername());
		entity.setPost(dto.getPost());
		entity.setCreationDate(dto.getCreationDate());
	}
	
}
