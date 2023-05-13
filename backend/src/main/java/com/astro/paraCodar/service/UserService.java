package com.astro.paraCodar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.astro.paraCodar.entities.User;
import com.astro.paraCodar.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public void insert(User user) {
		userRepository.save(user);		
	}
	
}
