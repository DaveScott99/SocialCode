package com.astro.socialCode.services;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.astro.socialCode.dto.request.LoginDTO;
import com.astro.socialCode.dto.response.UserDTO;
import com.astro.socialCode.entities.LoginMessage;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.security.TokenUtil;

@Service
public class LoginService {

	private final UserRepository userRepository;
	
	private final BCryptPasswordEncoder passwordEncoder;
	
	public LoginService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public LoginMessage loginUser(LoginDTO loginDto) {		
		User user = userRepository.findByEmail(loginDto.getEmail());
		
		if(user !=  null) {
			
			String password = loginDto.getPassword();
			String encodedPassword = user.getPassword();
			Boolean isPasswordRight = passwordEncoder.matches(password, encodedPassword);
			
			if (isPasswordRight) {
				
				Optional<User> userLogin = userRepository.findByEmailAndPassword(loginDto.getEmail(), encodedPassword);
				
				if(userLogin.isPresent()) {
					return new LoginMessage("Login efetuado com sucesso", new UserDTO(user), TokenUtil.encodeToken(new UserDTO(userLogin.get())), true);
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
