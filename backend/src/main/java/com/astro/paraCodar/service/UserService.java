package com.astro.paraCodar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.paraCodar.entities.User;
import com.astro.paraCodar.repositories.UserRepository;


@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public List<User> findAll(){
		List<User> users = userRepository.findAll();
		return users;
	}
	
	@Transactional(readOnly = true)
	public User findById(Long id){
		User user = userRepository.findById(id).get();
		return user;
	}
	
	@Transactional
	public User insert(User user) {
		return userRepository.save(user);		
	}
	
	
	public User update(Long id, User newUser){
		User oldUser = userRepository.getReferenceById(id);
		updateData(newUser, oldUser);
		return userRepository.save(newUser);
	}
	
	private void updateData(User newUser, User oldUser) {
		newUser.setName(oldUser.getName());
		newUser.setEmail(oldUser.getEmail());
	}
	
}
