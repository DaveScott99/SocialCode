package com.astro.socialCode.controllers;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.astro.socialCode.entities.VideoFile;
import com.astro.socialCode.repositories.VideoRepository;

@RestController
@RequestMapping("/upload")
public class UploadController {
	
	private final VideoRepository videoRepository;

	public UploadController(VideoRepository videoRepository) {
		super();
		this.videoRepository = videoRepository;
	}

	@PostMapping
	public String upload(@RequestParam MultipartFile file) {
		
		if (file.isEmpty()) {
			return "Selecione um arquivo.";
		}

		try {
			
			String uploadDir = "D:/ARQUIVOS/PROJETOS SPRING/paraCodar/files";
			
			File directory = new File(uploadDir);
			
			if (!directory.exists()) {
				directory.mkdirs();
			}
			
			String originalName = file.getOriginalFilename();
            String fileExtension = originalName.substring(originalName.lastIndexOf("."));
            String newFileName = UUID.randomUUID().toString() + fileExtension;
			
			String filePath = uploadDir + File.separator + newFileName;
			
			File dest = new File(filePath);
			file.transferTo(dest);
			
			VideoFile videoFile = new VideoFile();
			
			videoFile.setTitle(newFileName);
			videoFile.setContentType(file.getContentType());
			videoFile.setFileSize(file.getSize());
			videoFile.setFilePath(filePath);
			
			videoRepository.save(videoFile);
			
			return "Video enviado com sucesso!";
		}
		catch(IOException e) {
			e.printStackTrace();
			return "Ocorreu um erro";
		}
		
	}
	
}
