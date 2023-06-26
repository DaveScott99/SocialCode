package com.astro.paraCodar.security;

import java.security.Key;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.astro.paraCodar.dto.response.UserDTO;
import com.astro.paraCodar.entities.AuthToken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

public class TokenUtil {
	
	// Contantes utilitárias
	
	private static final String ISSUER = "SocialCode-API";
	private static final String TOKEN_HEADER = "Bearer ";
	private static final String TOKEN_KEY = "socialcodeapitokenkey1305@astro1";
	private static final long ONE_SECOND = 1000;
	private static final long EXPIRATION = 600000*ONE_SECOND;

	public static AuthToken encodeToken(UserDTO user) {
		
		// Criação da chave secreta
		Key secretKey = Keys.hmacShaKeyFor(TOKEN_KEY.getBytes());
		
		// Criação do payload do Token
		Map<String, String> claims = new HashMap<>();
		claims.put("ID", user.getId().toString());
		claims.put("Username", user.getUsername());
		
		// Criação do Token
		String tokenJWT = Jwts.builder()
								.setClaims(claims)
								.setIssuer(ISSUER)
								.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
								.signWith(secretKey, SignatureAlgorithm.HS256)
								.compact();
		
		AuthToken token = new AuthToken(TOKEN_HEADER + tokenJWT);
		return token;
	}
	
	public static Authentication decodeToken(HttpServletRequest request) {
		
		try {
			String jwtToken = request.getHeader("Authorization");
			jwtToken = jwtToken.replace(TOKEN_HEADER, "");
			
			// Decodificação do Token
			Jws<Claims> jwsClaims = Jwts.parserBuilder()
										.setSigningKey(TOKEN_KEY.getBytes())
										.build().parseClaimsJws(jwtToken);
			
			// Extraindo as informações do Token
			String username = jwsClaims.getBody().get("Username").toString();			
			String issuer = jwsClaims.getBody().getIssuer();
			Date validity = jwsClaims.getBody().getExpiration();
						
			if (username.length() > 0 && issuer.equals(ISSUER) && validity.after(new Date(System.currentTimeMillis()))) {
				
				// Caso a requisição tenha o cabeçalho correto é gerado um Token interno com informações relevantes
				return new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
								
			}
		}
		catch (Exception e) {
			System.out.println("DEBUG::Erro ao decodificar token");
		}
		
		return null;
	}
	
}
