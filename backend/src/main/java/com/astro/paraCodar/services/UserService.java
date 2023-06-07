package com.astro.paraCodar.services;

import java.net.URL;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.astro.paraCodar.dto.request.RegisterUserDTO;
import com.astro.paraCodar.dto.request.UriDTO;
import com.astro.paraCodar.dto.request.UserUpdateDTO;
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
	private S3Service s3Service;
	
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
		User user = userRepository.findByUsername(username);
		return new UserMinDTO(user);
	}
	
	@Transactional(readOnly = true)
	public UserMinDTO findById(Long id){
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
	public UserDTO update(Long id, UserUpdateDTO dto){
		try {
			User entity = userRepository.getReferenceById(id);
			copyDtoToEntityUpdate(dto, entity);
			entity = userRepository.save(entity);
			return new UserDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new EntityNotFoundException("ID não encontrado " + id);
		}
	}
	
	public UriDTO uploadProfilePhoto(MultipartFile file, String username) {
		User user = userRepository.findByUsername(username);
		/*
		// Primeiro pegamos o nome do arquivo que está armazenado no Bucket
		String fileName = user.getProfilePhoto().substring(54); 
		s3Service.deleteFile(fileName); // Com o nome chamamos o método que irá excluir a imagem do Bucket
		*/
		
		URL url = s3Service.uploadFile(file); // Agora salvamos a imagem nova no Bucket
		user.setProfilePhoto(url.toString());
		userRepository.save(user);
		return new UriDTO(url.toString());
	}
	
	public UriDTO uploadBackgroundImage(MultipartFile file, String username) {
		User user = userRepository.findByUsername(username);
		URL urlImage = s3Service.uploadFile(file);
		user.setBackgroundImage(urlImage.toString());
		userRepository.save(user);
		return new UriDTO(urlImage.toString());
	}
	
	// Método para copiar os atributos do UserDTO para a entidade User
	private void copyDtoToEntityUpdate(UserDTO dto, User entity) {
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setUsername(dto.getUsername());
		entity.setBiography(dto.getBiography());
		entity.setTitle(dto.getTitle());
		entity.setLinkedinLink(dto.getLinkedinLink());
		entity.setInstagramLink(dto.getInstagramLink());
		entity.setGitHubLink(dto.getGitHubLink());
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
