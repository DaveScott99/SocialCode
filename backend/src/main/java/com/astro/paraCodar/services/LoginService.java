package com.astro.paraCodar.services;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.astro.paraCodar.dto.request.LoginDTO;
import com.astro.paraCodar.dto.response.UserDTO;
import com.astro.paraCodar.entities.LoginMessage;
import com.astro.paraCodar.entities.User;
import com.astro.paraCodar.repositories.UserRepository;
import com.astro.paraCodar.security.TokenUtil;

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
					return new LoginMessage("Login efetuado com sucesso", new UserDTO(user), TokenUtil.encodeToken(new UserDTO(userLogin.get())));
				}
				else {
					return new LoginMessage("Login falhou");
				}
				
			}
			
			else {
				return new LoginMessage("Senha incorreta");
			}
			
		}
		
		else {
			return new LoginMessage("Email não existe");
		}	
		
	}
}
