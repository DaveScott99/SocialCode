package com.astro.socialCode.dto.mapper;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.astro.socialCode.dto.request.RegisterUserDTO;
import com.astro.socialCode.dto.response.UserDTO;
import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.repositories.LanguageRepository;

@Component
public class UserMapper {

	private final BCryptPasswordEncoder passwordEncoder;
	
	public UserMapper(BCryptPasswordEncoder passwordEncoder, LanguageRepository languageRepository) {
		this.passwordEncoder = passwordEncoder;
	}

	public UserDTO toDTO(User user) {
		if (user == null) {
			return null;
		}
		return new UserDTO(user);
	}
	
	public UserMinDTO toMinDTO(User user) {
		if (user == null) {
			return null;
		}
		return new UserMinDTO(user);
	}
	
	public User toEntity(UserDTO userDTO) {
		
		if (userDTO == null) {
			return null;
		}
		
		User user = new User();
		
		if (userDTO.getId() != null) {
			user.setId(userDTO.getId());
		}
		
		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		user.setUsername(userDTO.getUsername());
		user.setBiography(userDTO.getBiography());
		user.setTitle(userDTO.getTitle());
		user.setLinkedinLink(userDTO.getLinkedinLink());
		user.setGitHubLink(userDTO.getGitHubLink());
		
		
		return user;
		
	}
	
	public User toEntityRegister(RegisterUserDTO userDTO) {

		if (userDTO == null) {
			return null;
		}
		
		User user = new User();

		user.setId(userDTO.getId());
		user.setFirstName(userDTO.getFirstName());
		user.setLastName(userDTO.getLastName());
		user.setUsername(userDTO.getUsername());
		user.setEmail(userDTO.getEmail());
		user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		
		return user;
	}
	
}
