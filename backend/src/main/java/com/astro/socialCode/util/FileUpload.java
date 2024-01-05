package com.astro.socialCode.util;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUpload {

	@Transactional
	public com.astro.socialCode.util.File uploadImage(MultipartFile file, String directory, String folderName) throws InterruptedException {

		 String uploadDir = directory + folderName;

		 String originalName = file.getOriginalFilename();
         String fileExtension = originalName.substring(originalName.lastIndexOf("."));
         String newFileName = UUID.randomUUID().toString() + fileExtension;
		 String filePath = uploadDir + File.separator + newFileName;
		 File outputDirectory = new File(filePath);
		 
		 if (!outputDirectory.exists()) {
			 outputDirectory.mkdirs();
		 }
		 
		 try {			 
			 file.transferTo(outputDirectory);	
			 return new com.astro.socialCode.util.File(newFileName, filePath);
		 }
		 catch(IOException e) {
			 throw new IllegalArgumentException(e.getMessage());
		 }				
	
	}
	
}
