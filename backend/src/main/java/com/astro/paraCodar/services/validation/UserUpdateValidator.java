package com.astro.paraCodar.services.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import com.astro.paraCodar.controllers.exceptions.FieldMessage;
import com.astro.paraCodar.dto.request.UserUpdateDTO;
import com.astro.paraCodar.entities.User;
import com.astro.paraCodar.repositories.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

// Classe para validação de usuário com base na regra de negócio
public class UserUpdateValidator implements ConstraintValidator<UserUpdateValid, UserUpdateDTO> {

	@Autowired
	private HttpServletRequest request;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public void initialize(UserUpdateValid ann) {
	}
	
	@Override
	public boolean isValid(UserUpdateDTO dto, ConstraintValidatorContext context) {
		
		@SuppressWarnings("unchecked") // Capturar o ID do usuário que virá na requisição
		var uriVars = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		Long userId = Long.parseLong(uriVars.get("id"));
		
		List<FieldMessage> list = new ArrayList<>(); // Lista para armazenar eventuais erros de validação
		
		// Área do código para colocar teste de validação, acrescentando objetos FieldMessage à lista
		
		User user = userRepository.findByEmail(dto.getEmail());
		//User username = userRepository.findByUsername(dto.getUsername());
		
		if (user != null && userId != user.getId()) { // Validação para saber se o email já é existente
			list.add(new FieldMessage("email", "Email já existente"));
		}
		
		for (FieldMessage e : list) { // FOR para inserir os erros de validação na lista do Beans Validation
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
																		.addConstraintViolation();
		}
		
		return list.isEmpty();
	}

}
