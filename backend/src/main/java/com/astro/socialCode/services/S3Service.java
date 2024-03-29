package com.astro.socialCode.services;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.time.Instant;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;

@Service
public class S3Service {

	private static Logger LOG = LoggerFactory.getLogger(S3Service.class);

	@Autowired
	private AmazonS3 s3client;

	@Value("${s3.bucket}")
	private String bucketName;

	public URL uploadFile(MultipartFile file, String folder, String subFolder) {
		try {
			String originalName = file.getOriginalFilename();
			String extension = FilenameUtils.getExtension(originalName);
			String fileName = folder + "/" + subFolder + "/" + Instant.now() + "." + extension;
			
			InputStream is = file.getInputStream();
			String contentType = file.getContentType();
			return uploadFile(is, fileName, contentType);
		}
		catch (IOException e){
			throw new IllegalArgumentException(e.getMessage());
		}

	}
	
	public void deleteFile(String fileName) {
		try {
			DeleteObjectRequest request = new DeleteObjectRequest(bucketName, fileName);
			s3client.deleteObject(request);
		}
		catch (AmazonServiceException e) {
			throw new AmazonServiceException(e.getMessage());
		}
		catch (SdkClientException e) {
			throw new SdkClientException(e.getMessage());
		}
	
	}

	private URL uploadFile(InputStream is, String fileName, String contentType) {
		ObjectMetadata meta = new ObjectMetadata();
		meta.setContentType(contentType);
		LOG.info("Upload start");
		s3client.putObject(bucketName, fileName, is, meta);
		LOG.info("Upload finish");
		return s3client.getUrl(bucketName, fileName);
	}
}