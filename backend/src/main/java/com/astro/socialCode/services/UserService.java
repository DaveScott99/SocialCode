package com.astro.socialCode.services;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.dto.mapper.PostMapper;
import com.astro.socialCode.dto.mapper.UserMapper;
import com.astro.socialCode.dto.request.RegisterUserDTO;
import com.astro.socialCode.dto.request.UriDTO;
import com.astro.socialCode.dto.request.UserUpdateDTO;
import com.astro.socialCode.dto.response.LanguageDTO;
import com.astro.socialCode.dto.response.PostDTO;
import com.astro.socialCode.dto.response.UserDTO;
import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.entities.Language;
import com.astro.socialCode.repositories.LanguageRepository;
import com.astro.socialCode.repositories.PostRepository;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;

@Service
public class UserService {
	
	private final UserMapper userMapper;
	private final PostMapper postMapper;
	private final UserRepository userRepository;
	private final PostRepository postRepository;
	private final S3Service s3Service;
	private final LanguageRepository languageRepository;
	
	public UserService(UserMapper userMapper, PostMapper postMapper, UserRepository userRepository, 
			PostRepository postRepository, S3Service s3Service, 
			LanguageRepository languageRepository) {
		this.userMapper = userMapper;
		this.postMapper = postMapper;
		this.userRepository = userRepository;
		this.postRepository = postRepository;
		this.s3Service = s3Service;
		this.languageRepository = languageRepository;
	}
	
	@Transactional(readOnly = true)
	public Map<String, Object> profile(@PageableDefault(size = 10) Pageable pageablePosts, String username) {
		
		UserDTO user = userRepository.findByUsername(username)
				.map(userMapper::toDTO)
				.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
		
		Page<PostDTO> userPosts = postRepository.findPostsByOwnerIdOrderByCreationDateDesc(pageablePosts, user.getId())
				 .map(postMapper::toDTO);
		
		Map<String, Object> profile = new HashMap<>();
		
		profile.put("user_info", user);
		profile.put("posts", userPosts);
		profile.put("followers_count", user.getFollowers().stream().count());
		profile.put("following_count", user.getFollowing().stream().count());
		
		return profile;
	}
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable Pageable){
		return userRepository.findAll(Pageable)
				 .map(userMapper::toDTO);
	}
	
	public Page<UserMinDTO> searchUsers(Pageable pageable ,String username) {
		return userRepository.searchUsers(pageable, username)
				 .map(userMapper::toMinDTO);
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
	public UserDTO update(Long userId, UserUpdateDTO userDTO){
		return userRepository.findById(userId)
				 .map(userFound -> {
					 userFound.setFirstName(userDTO.getFirstName());
					 userFound.setLastName(userDTO.getLastName());
					 userFound.setBiography(userDTO.getBiography());
					 userFound.setGitHubLink(userDTO.getGitHubLink());
					 userFound.setLinkedinLink(userDTO.getLinkedinLink());
					 userFound.setTitle(userDTO.getTitle());
					 userFound.setUsername(userDTO.getUsername());
					 for (LanguageDTO languageDto : userDTO.getInterest()) {
							Language language = languageRepository.findById(languageDto.getId())
															.orElseThrow(() -> new EntityNotFoundException("Linguagem não encontrada"));
							userFound.getInterest().add(language);
					 }
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
	
}
