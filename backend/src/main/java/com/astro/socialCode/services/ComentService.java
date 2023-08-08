package com.astro.socialCode.services;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.socialCode.dto.mapper.ComentMapper;
import com.astro.socialCode.dto.response.ComentPostDTO;
import com.astro.socialCode.dto.response.ComentVideoDTO;
import com.astro.socialCode.repositories.ComentPostRepository;
import com.astro.socialCode.repositories.ComentVideoRepository;
import com.astro.socialCode.services.exceptions.DatabaseException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ComentService {

	private final ComentPostRepository comentRepository;
	private final ComentVideoRepository comentVideoRepository;
	private final ComentMapper comentMapper;
	
	public ComentService(ComentPostRepository comentRepository, ComentMapper comentMapper,
			ComentVideoRepository comentVideoRepository) {
		this.comentRepository = comentRepository;
		this.comentMapper = comentMapper;
		this.comentVideoRepository = comentVideoRepository;
	}

	public Page<ComentVideoDTO> findComentsByVideo(Pageable pageable ,Long videoId) {
		return comentVideoRepository.findComentVideoByVideoId(pageable, videoId)
				.map(comentMapper::toDTOComentVideo);
	}
	
	public Page<ComentVideoDTO> findComentsInVideoByOwner(Pageable pageable, Long OwnerId) {
		return comentVideoRepository.findComentVideoByOwnerId(pageable, OwnerId)
				.map(comentMapper::toDTOComentVideo);
	}
	
	public Page<ComentPostDTO> findComentsByPost(Pageable pageable, Long postId) {
		return comentRepository.findComentPostByPostId(pageable, postId)
				.map(comentMapper::toDTOComentPost);
	}
	
	public Page<ComentPostDTO> findComentsInPostByOwner(Pageable pageable, Long OwnerId) {
		return comentRepository.findComentPostByOwnerId(pageable, OwnerId)
				.map(comentMapper::toDTOComentPost);
	}

	@Transactional
	public ComentVideoDTO publishComentInVideo(ComentVideoDTO comentDTO) {
		return comentMapper.toDTOComentVideo(comentVideoRepository.save(comentMapper.toEntityComentVideo(comentDTO)));
	}
	
	@Transactional
	public ComentPostDTO publishComentInPost(ComentPostDTO comentDTO) {
		return comentMapper.toDTOComentPost(comentRepository.save(comentMapper.toEntityComentPost(comentDTO)));
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
