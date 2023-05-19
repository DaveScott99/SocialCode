package com.astro.paraCodar.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.astro.paraCodar.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByEmailAndPassword(String email, String password); 
	User findByEmail(String email);
	User findByName(String name);
	
}
