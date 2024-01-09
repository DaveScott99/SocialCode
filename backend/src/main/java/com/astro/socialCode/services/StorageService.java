package com.astro.socialCode.services;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;
import com.astro.socialCode.util.FileUpload;
import com.astro.socialCode.util.MessageResponse;

@Service
public class StorageService {
	
	@Value("${profile_photo_directory}")
	private String UPLOAD_PROFILE_PHOTO_DIRECTORY;
	
	private final UserRepository userRepository;
	private final FileUpload fileUpload;
	
	public StorageService(UserRepository userRepository, FileUpload fileUpload) {
		this.userRepository = userRepository;
		this.fileUpload = fileUpload;
	}
	
	@Transactional
	public MessageResponse uploadProfilePhoto(MultipartFile photoImage, String userAccount) throws InterruptedException {
		 
		 com.astro.socialCode.util.File file = fileUpload.uploadImage(photoImage, UPLOAD_PROFILE_PHOTO_DIRECTORY, userAccount);
		 
		 userRepository.findByUsername(userAccount)
			 .map(userFound -> {
				 userFound.setPhoto(file.getFileName());
				 return userRepository.save(userFound);
			 })
			 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
		 
		return new MessageResponse("Upload realizado com sucesso");
						
	}
	
	@Transactional(readOnly = true)	
	public Resource showImage(String directory, String fileName, String folderName) throws MalformedURLException {
		Path imagePath = Paths.get(directory + folderName + "/" + fileName);
		Resource resource = new UrlResource(imagePath.toUri());
		
		if (resource.exists() || resource.isReadable()) {
			return resource;
		}
		else {
			return null;
		}
	}
	
}
