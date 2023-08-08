package com.astro.socialCode.services;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.socialCode.dto.mapper.ComentMapper;
import com.astro.socialCode.dto.response.ComentPostDTO;
import com.astro.socialCode.dto.response.ComentVideoDTO;
import com.astro.socialCode.repositories.ComentPostRepository;
import com.astro.socialCode.repositories.ComentVideoRepository;
import com.astro.socialCode.repositories.VideoRepository;
import com.astro.socialCode.services.exceptions.DatabaseException;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ComentService {

	private final ComentPostRepository comentRepository;
	private final ComentVideoRepository comentVideoRepository;
	private final ComentMapper comentMapper;
	private final VideoRepository videoRepository;
	
	public ComentService(ComentPostRepository comentRepository, ComentMapper comentMapper,
			VideoRepository videoRepository, ComentVideoRepository comentVideoRepository) {
		this.comentRepository = comentRepository;
		this.comentMapper = comentMapper;
		this.videoRepository = videoRepository;
		this.comentVideoRepository = comentVideoRepository;
	}

	public List<ComentVideoDTO> findComentsByVideo(Long videoId) {
		return comentVideoRepository.findComentVideoByVideoId(videoId)
				.stream()
				.map(comentMapper::toDTOComentVideo)
				.toList();
	}
	
	public List<ComentPostDTO> findComentsByPost(Long postId) {
		return comentRepository.findComentPostByPostId(postId)
				.stream()
				.map(comentMapper::toDTOComentPost)
				.toList();
	}
	
	public List<ComentVideoDTO> findComentsInVideoByOwner(Long OwnerId) {
		return comentVideoRepository.findComentVideoByOwnerId(OwnerId)
				.stream()
				.map(comentMapper::toDTOComentVideo)
				.toList();
	}
	
	public List<ComentPostDTO> findComentsInPostByOwner(Long OwnerId) {
		return comentRepository.findComentPostByOwnerId(OwnerId)
				.stream()
				.map(comentMapper::toDTOComentPost)
				.toList();
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
