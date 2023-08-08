package com.astro.socialCode.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.astro.socialCode.dto.mapper.UserMapper;
import com.astro.socialCode.dto.request.LoginDTO;
import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.entities.LoginMessage;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.security.TokenUtil;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LoginService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;
	
	private final BCryptPasswordEncoder passwordEncoder;
	
	public LoginService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, UserMapper userMapper) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.userMapper = userMapper;
	}

	public LoginMessage loginUser(LoginDTO loginDto) {		
		User user = userRepository.findByEmail(loginDto.getEmail());
		
		if(user !=  null) {
			
			String password = loginDto.getPassword();
			String encodedPassword = user.getPassword();
			Boolean isPasswordRight = passwordEncoder.matches(password, encodedPassword);
			
			if (isPasswordRight) {
				
				UserMinDTO userLogin = userRepository.findByEmailAndPassword(loginDto.getEmail(), encodedPassword)
						.map(userMapper::toMinDTO)
						.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
				
				if(userLogin != null) {
					return new LoginMessage("Login efetuado com sucesso", userLogin, TokenUtil.encodeToken(userLogin), true);
				}
				else {
					return new LoginMessage("Login falhou", false);
				}
				
			}
			
			else {
				return new LoginMessage("Senha incorreta", false);
			}
			
		}
		
		else {
			return new LoginMessage("Email não existe", false);
		}	
		
	}
}
