package com.astro.paraCodar.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.astro.paraCodar.entities.User;

@DataJpaTest
public class UserRepositoryTests {

	@Autowired
	private UserRepository repository;
	
	@Test
	public void deleteShouldDeleteObjectWhenExists() {
		
		Long existsId = 1L;
		
		repository.deleteById(existsId);
		
		Optional<User> result = repository.findById(existsId);
		
		Assertions.assertFalse(result.isPresent());
		
	}
	
}
