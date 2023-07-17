package com.astro.socialCode.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.socialCode.entities.Coment;

public interface ComentRepository extends JpaRepository<Coment, Long>{
	
	List<Coment> findComentsByUserId(Long userId);
	
}
