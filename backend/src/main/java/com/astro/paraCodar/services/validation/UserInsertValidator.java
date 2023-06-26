package com.astro.paraCodar.services.validation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.astro.paraCodar.controllers.exceptions.FieldMessage;
import com.astro.paraCodar.dto.request.RegisterUserDTO;
import com.astro.paraCodar.entities.User;
import com.astro.paraCodar.repositories.UserRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

// Classe para validação de usuário com base na regra de negócio
public class UserInsertValidator implements ConstraintValidator<UserInsertValid, RegisterUserDTO> {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public void initialize(UserInsertValid ann) {
	}
	
	@Override
	public boolean isValid(RegisterUserDTO dto, ConstraintValidatorContext context) {

		List<FieldMessage> list = new ArrayList<>(); // Lista para armazenar eventuais erros de validação
		
		// Área do código para colocar teste de validação, acrescentando objetos FieldMessage à lista
		
		User email = userRepository.findByEmail(dto.getEmail());
		
		User username = userRepository.findByUsername(dto.getUsername())
									  .map(userFound -> {
										 return userFound;
									  })
									  .orElse(null);
		
		// Validação para saber se o email já é existente
		if (email != null) { 
			list.add(new FieldMessage("email", "Email já existente"));
		}
		
		// Validação para verificar se as senhas são idênticas
		if (dto.getPassword().compareTo(dto.getConfirmPassword()) != 0) {
			list.add(new FieldMessage("password", "Senhas precisam ser idênticas"));
		}
		
		// Validação para saber se o username já é existente
		if (username != null) { 
			list.add(new FieldMessage("username", "Username já existente"));
		}
		
		// FOR para inserir os erros de validação na lista do Beans Validation
		for (FieldMessage e : list) { 
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
																		.addConstraintViolation();
		}
		
		return list.isEmpty();
	}

}
