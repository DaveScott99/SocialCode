package com.astro.socialCode.services;

import java.net.URL;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.dto.mapper.UserMapper;
import com.astro.socialCode.dto.request.RegisterUserDTO;
import com.astro.socialCode.dto.request.UriDTO;
import com.astro.socialCode.dto.response.UserDTO;
import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Service
public class UserService {
	
	private final UserMapper userMapper;
	
	private final UserRepository userRepository;
	
	private final S3Service s3Service;
	
	public UserService(UserMapper userMapper, UserRepository userRepository, S3Service s3Service) {
		this.userMapper = userMapper;
		this.userRepository = userRepository;
		this.s3Service = s3Service;
	}

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable Pageable){
		return userRepository.findAll(Pageable)
							 .map(userMapper::toDTO);
	}
	
	public Page<UserDTO> searchUserByUsername(Pageable pageable ,String username) {
		return userRepository.searchUsers(pageable, username)
							 .map(userMapper::toDTO);
	}
	
	@Transactional(readOnly = true)
	public UserDTO findByUsername(String username) {
		return userRepository.findByUsername(username)
							 .map(userMapper::toDTO)
							 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
	}
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id){
		return userRepository.findById(id)
						  	 .map(userMapper::toDTO)
						  	 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado " + id));
	}
	
	@Transactional
	public UserDTO insert(RegisterUserDTO dto) {
		return userMapper.toDTO(userRepository.save(userMapper.toEntityRegister(dto)));
	}
	
	@Transactional
	public UserDTO update(Long userId, UserDTO userDTO){
		return userRepository.findById(userId)
							 .map(userFound -> {
								 userFound.setFirstName(userDTO.getFirstName());
								 userFound.setLastName(userDTO.getLastName());
								 userFound.setBiography(userDTO.getBiography());
								 userFound.setGitHubLink(userDTO.getGitHubLink());
								 userFound.setLinkedinLink(userDTO.getLinkedinLink());
								 userFound.setTitle(userDTO.getTitle());
								 userFound.setUsername(userDTO.getUsername());
								 return userMapper.toDTO(userRepository.save(userFound));
							 })
							 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado " + userId));
	}
	
	public UriDTO uploadProfilePhoto(MultipartFile file, String username) {
		
		//Salvamos a imagem no Bucket
		URL url = s3Service.uploadFile(file, "users", "profile-photo"); 
				
		userRepository.findByUsername(username)
				 .map(userFound -> {
					 userFound.setProfilePhoto(url.toString());
					 return userRepository.save(userFound);
				 })
				 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
		
		return new UriDTO(url.toString());
	}
	
	@Transactional
	public void followUser(Long userId, Long followerId) {
		userRepository.findById(userId)
					  	 .map(foundUser -> {
					  		User userToFollow = userRepository.findById(followerId)
													  	    .map(user -> user)
													  	    .orElseThrow(() -> new EntityNotFoundException("Usuário a ser seguido não encontrado"));
	
					  					foundUser.getFollowers().add(userToFollow);
					  					
					  					return userRepository.save(foundUser);
					  	 })
					  	 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
	}
	
	@Transactional
	public void unfollowUser(Long userId, Long followerId) {
		userRepository.findById(userId)
					  .map(foundUser -> {
						  User followedUser = userRepository.findById(followerId)
							  	    .map(user -> user)
							  	    .orElseThrow(() -> new EntityNotFoundException("Usuário seguido não encontrado"));
						  
						  foundUser.getFollowers().remove(followedUser);
						  
						  return userRepository.save(foundUser);

					  })
					  .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
	}
	
	@Transactional(readOnly = true)
	public List<UserMinDTO> findUserFollowers(Long userId) {
		return userRepository.findById(userId)
							 .map(foundUser -> {
								 List<UserMinDTO> followers = foundUser.getFollowers()
															 		   .stream()
															 		   .map(userMapper::toMinDTO)
															 		   .collect(Collectors.toList());
								 return followers;
							 })
							 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));	 
	}
	
	@Transactional(readOnly = true)
	public List<UserMinDTO> findUserFollowing(Long userId) {
		return userRepository.findById(userId)
				 .map(foundUser -> {
					 List<UserMinDTO> following = foundUser.getFollowing()
												 		   .stream()
												 		   .map(userMapper::toMinDTO)
												 		   .collect(Collectors.toList());
					 return following;
				 })
				 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));	 
	}
	
}
