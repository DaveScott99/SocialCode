package com.astro.paraCodar.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.paraCodar.dto.UserDTO;
import com.astro.paraCodar.dto.UserMinDTO;
import com.astro.paraCodar.entities.User;
import com.astro.paraCodar.repositories.UserRepository;
import com.astro.paraCodar.services.exceptions.ControllerNotFoundException;

import jakarta.persistence.EntityNotFoundException;


@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Transactional(readOnly = true)
	public List<UserDTO> findAll(){
		List<User> users = userRepository.findAll();
		return users.stream().map(x -> new UserDTO(x)).toList();
	}
	
	@Transactional(readOnly = true)
	public UserMinDTO findById(Long id){
		Optional<User> user = userRepository.findById(id);
		User entity = user.orElseThrow(() -> new ControllerNotFoundException("Usuário não encontrado"));
		return new UserMinDTO(entity);
	}
	
	@Transactional
	public UserDTO insert(UserDTO dto) {
		User user = new User();
		copyDtoToEntity(dto, user);
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
		user = userRepository.save(user);
		return new UserDTO(user);		
	}
	
	
	public UserDTO update(Long id, UserDTO dto){
		try {
			User user = userRepository.getReferenceById(id);
			copyDtoToEntity(dto, user);
			user = userRepository.save(user);
			return new UserDTO(user);
		}
		catch (EntityNotFoundException e) {
			throw new ControllerNotFoundException("Id não encontrado " + id);
		}
	}
	
	private void copyDtoToEntity(UserDTO dto, User entity) {
			entity.setFirstName(dto.getFirsName());
			entity.setLastName(dto.getLastName());
			entity.setUsername(dto.getUsername());
			entity.setBiography(dto.getBiography());
			entity.setUserImg(dto.getUserImg());
			entity.setEmail(dto.getEmail());
			entity.setPassword(dto.getPassword());
	}
	
	
}
