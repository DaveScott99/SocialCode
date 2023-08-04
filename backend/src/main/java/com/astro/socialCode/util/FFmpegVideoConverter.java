package com.astro.socialCode.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class FFmpegVideoConverter {
	
	public void convertToSegments(File inputFile, File outputDirectory) throws IOException, InterruptedException{
		
		String outPut240p = outputDirectory.getAbsolutePath() + "/240p";
		File outputDirectory240p = new File(outPut240p);
		
		String outPut360p = outputDirectory.getAbsolutePath() + "/360p";
		File outputDirectory360p = new File(outPut360p);
		
		String outPut480p = outputDirectory.getAbsolutePath() + "/480p";
		File outputDirectory480p = new File(outPut480p);
		
		String outPut720p = outputDirectory.getAbsolutePath() + "/720p";
		File outputDirectory720p = new File(outPut720p);
		
		if (!outputDirectory240p.exists()) {
			outputDirectory240p.mkdirs();
		}
		
		if (!outputDirectory360p.exists()) {
			outputDirectory360p.mkdirs();
		}
		
		if (!outputDirectory480p.exists()) {
			outputDirectory480p.mkdirs();
		}
		
		if (!outputDirectory720p.exists()) {
			outputDirectory720p.mkdirs();
		}

		String ffmpegCommandFor240p = "ffmpeg -i " + inputFile.getAbsolutePath()
	        + " -c:v libx264 -preset fast -b:v 400k -vf \"scale=426x240\" -r 30"
	        + " -c:a aac -b:a 64k -threads 6"
	        + " -f hls -hls_time 5 -hls_list_size 0"
	        + " -hls_segment_filename " + new File(outputDirectory240p, "segment_%03d.ts").getAbsolutePath()
	        + " " + new File(outputDirectory240p, "segmentsUnion.m3u8").getAbsolutePath();
		
		String ffmpegCommandFor360p = "ffmpeg -i " + inputFile.getAbsolutePath()
	        + " -c:v libx264 -preset fast -b:v 800k -vf \"scale=640x360\" -r 30"
	        + " -c:a aac -b:a 96k -threads 6"
	        + " -f hls -hls_time 5 -hls_list_size 0"
	        + " -hls_segment_filename " + new File(outputDirectory360p, "segment_%03d.ts").getAbsolutePath()
	        + " " + new File(outputDirectory360p, "segmentsUnion.m3u8").getAbsolutePath();
		
		String ffmpegCommandFor480p = "ffmpeg -i " + inputFile.getAbsolutePath()
	        + " -c:v libx264 -preset fast -b:v 1200k -vf \"scale=854x480\" -r 30"
	        + " -c:a aac -b:a 96k -threads 6"
	        + " -f hls -hls_time 10 -hls_list_size 0"
	        + " -hls_segment_filename " + new File(outputDirectory480p, "segment_%03d.ts").getAbsolutePath()
	        + " " + new File(outputDirectory480p, "segmentsUnion.m3u8").getAbsolutePath();
		
		String ffmpegCommandFor720p = "ffmpeg -i " + inputFile.getAbsolutePath()
	        + " -c:v libx264 -preset fast -b:v 2500k -vf \"scale=1280x720\" -r 30"
	        + " -c:a aac -b:a 128k -threads 6"
	        + " -f hls -hls_time 15 -hls_list_size 0"
	        + " -hls_segment_filename " + new File(outputDirectory720p, "segment_%03d.ts").getAbsolutePath()
	        + " " + new File(outputDirectory720p, "segmentsUnion.m3u8").getAbsolutePath();
		
		//240p
		ProcessBuilder processBuilder240p = new ProcessBuilder(ffmpegCommandFor240p.split(" "));
		processBuilder240p.redirectErrorStream(true);
		Process process240p = processBuilder240p.start();
		
	    try (InputStream inputStream = process240p.getInputStream();
	         InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
	         BufferedReader bufferedReader = new BufferedReader(inputStreamReader)) {

	        String line;
	        while ((line = bufferedReader.readLine()) != null) {
	            
	        }
	    }
		
		int exitCode240p = process240p.waitFor();
		
		if (exitCode240p == 0) {
			process240p.destroy();
		}
		
		if (exitCode240p != 0) {
			throw new IOException("Erro ao executar o FFmpeg. Código de saída: " + exitCode240p);
		}
		
		//360p
		ProcessBuilder processBuilder360p = new ProcessBuilder(ffmpegCommandFor360p.split(" "));
		processBuilder360p.redirectErrorStream(true);
		Process process360p = processBuilder360p.start();
		
	    try (InputStream inputStream = process360p.getInputStream();
	        InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
	        BufferedReader bufferedReader = new BufferedReader(inputStreamReader)) {

	        String line;
	        while ((line = bufferedReader.readLine()) != null) {
	           
	        }
		}
			
		int exitCode360p = process360p.waitFor();
		
		if (exitCode360p == 0) {
			process360p.destroy();
		}
		
		if (exitCode360p != 0) {
			throw new IOException("Erro ao executar o FFmpeg. Código de saída: " + exitCode360p);
		}
		
		//480p
		ProcessBuilder processBuilder480p = new ProcessBuilder(ffmpegCommandFor480p.split(" "));
		processBuilder480p.redirectErrorStream(true);
		Process process480p = processBuilder480p.start();
		
	    try (InputStream inputStream = process480p.getInputStream();
	        InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
	        BufferedReader bufferedReader = new BufferedReader(inputStreamReader)) {

	        String line;
	        while ((line = bufferedReader.readLine()) != null) {
	            
	        }
		}
			
		int exitCode480p = process480p.waitFor();
		
		if (exitCode480p == 0) {
			process480p.destroy();
		}
		
		if (exitCode480p != 0) {
			throw new IOException("Erro ao executar o FFmpeg. Código de saída: " + exitCode480p);
		}
		
		
		//720p
		ProcessBuilder processBuilder720p = new ProcessBuilder(ffmpegCommandFor720p.split(" "));
		processBuilder720p.redirectErrorStream(true);
		Process process720p = processBuilder720p.start();
		
	    try (InputStream inputStream = process720p.getInputStream();
	        InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
	        BufferedReader bufferedReader = new BufferedReader(inputStreamReader)) {

	        String line;
	        while ((line = bufferedReader.readLine()) != null) {
	            
	        }
		}
			
		int exitCode720p = process720p.waitFor();
		
		if (exitCode720p == 0) {
			process720p.destroy();
		}
		
		if (exitCode720p != 0) {
			throw new IOException("Erro ao executar o FFmpeg. Código de saída: " + exitCode720p);
		}
			
	
	}
}
