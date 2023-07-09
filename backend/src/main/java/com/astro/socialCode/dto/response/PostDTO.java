package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.astro.socialCode.dto.ComentDTO;
import com.astro.socialCode.entities.Language;
import com.astro.socialCode.entities.Post;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.NotBlank;

@JsonPropertyOrder(value = {"id", "creationDate", "imagePost", "body", "languages", "coments", "votes"})
public class PostDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JsonProperty(value = "id")
	private Long id;
	
	@JsonProperty(value = "creationDate")
	private Instant creationDate;
	
	@JsonProperty(value = "imagePost")
	private String imagePost;
	
	@NotBlank(message = "O Post deve conter pelo menos 1 caractere")
	private String body;
		
	private UserMinDTO owner;
	
	@JsonProperty(value = "languages")
	private Set<LanguageDTO> languages = new HashSet<>();
	
	@JsonProperty(value = "coments")
	private List<ComentDTO> coments = new ArrayList<>();
	
	@JsonProperty(value = "votes")
	private Set<UserMinDTO> votes = new HashSet<>();
	
	public PostDTO() {
	}
	
	public PostDTO(Long id, Instant creationDate, String imagePost,
			@NotBlank(message = "O Post deve conter pelo menos 1 caractere") String body,
			UserMinDTO owner) {
		this.id = id;
		this.creationDate = creationDate;
		this.imagePost = imagePost;
		this.body = body;
		this.owner = owner;
	}

	public PostDTO(Post entity) {
		id = entity.getId();
		creationDate = entity.getCreationDate();
		imagePost = entity.getImagePost();
		body = entity.getBody();
		owner = new UserMinDTO(entity.getOwner());
		entity.getLanguages().forEach(language -> getLanguages().add(new LanguageDTO(language)));
		entity.getComents().forEach(comentUser -> getComents().add(new ComentDTO(comentUser)));
		entity.getVotes().forEach(userLike -> getVotes().add(new UserMinDTO(userLike)));
	}
	
	public PostDTO(Post entity, Set<Language> languages) {
		this(entity);
		languages.forEach(language -> this.languages.add(new LanguageDTO(language)));
	}

	public Long getId() {
		return id;
	}

	public Instant getCreationDate() {
		return creationDate;
	}

	public String getImagePost() {
		return imagePost;
	}

	public String getBody() {
		return body;
	}
	
	public UserMinDTO getOwner() {
		return owner;
	}
	
	public Set<LanguageDTO> getLanguages(){
		return languages;
	}
	
	public List<ComentDTO> getComents() {
		return coments;
	}

	public Set<UserMinDTO> getVotes() {
		return votes;
	}

}
