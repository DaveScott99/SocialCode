package com.astro.paraCodar.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.paraCodar.dto.request.RegisterUserDTO;
import com.astro.paraCodar.dto.response.UserDTO;
import com.astro.paraCodar.dto.response.UserMinDTO;
import com.astro.paraCodar.entities.User;
import com.astro.paraCodar.repositories.UserRepository;
import com.astro.paraCodar.services.exceptions.EntityNotFoundException;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable Pageable){
		Page<User> users = userRepository.findAll(Pageable);
		return users.map(x -> new UserDTO(x));
	}
	
	public Page<UserDTO> searchUserByUsername(Pageable pageable ,String username) {
		Page<User> users = userRepository.searchUsers(pageable, username);
		return users.map(x -> new UserDTO(x));
	}
	
	@Transactional(readOnly = true)
	public UserMinDTO findByUsername(String username) {
		Optional<User> user = userRepository.findByUsername(username);
		User entity = user.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
		return new UserMinDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public UserMinDTO findById(String id){
		Optional<User> user = userRepository.findById(id);
		User entity = user.orElseThrow(() -> new EntityNotFoundException("ID não encontrado " + id));
		return new UserMinDTO(entity);
	}
	
	@Transactional
	public UserDTO insert(RegisterUserDTO dto) {
		User user = new User();
		copyDtoToEntityInsert(dto, user);
		user.setPassword(passwordEncoder.encode(dto.getPassword()));
		user = userRepository.save(user);
		return new UserDTO(user);		
	}
	
	@Transactional
	public UserDTO update(String id, UserDTO dto){
		try {
			User user = userRepository.getReferenceById(id);
			copyDtoToEntityUpdate(dto, user);
			user = userRepository.save(user);
			return new UserDTO(user);
		}
		catch (EntityNotFoundException e) {
			throw new EntityNotFoundException("ID não encontrado " + id);
		}
	}
	
	
	// Método para copiar os atributos do UserDTO para a entidade User
	private void copyDtoToEntityUpdate(UserDTO dto, User entity) {
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setUsername(dto.getUsername());
		entity.setBiography(dto.getBiography());
		entity.setUserImg(dto.getUserImg());
		entity.setEmail(dto.getEmail());
		entity.setPassword(dto.getPassword());
	}
	
	
	// Método para copiar os atributos do RegisterUserDTO para a entidade User
	private void copyDtoToEntityInsert(RegisterUserDTO dto, User entity) {
		entity.setId(dto.getId());
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setUsername(dto.getUsername());
		entity.setEmail(dto.getEmail());
		entity.setPassword(dto.getPassword());
	}
	
	
}
