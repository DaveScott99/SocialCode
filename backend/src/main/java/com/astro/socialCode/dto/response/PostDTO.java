package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import com.astro.socialCode.dto.ComentDTO;
import com.astro.socialCode.entities.Language;
import com.astro.socialCode.entities.Post;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.validation.constraints.NotBlank;

@JsonPropertyOrder(value = {"id", "title", "creationDate", "image", "body", "languages", "coments", "votes", "votesCount"})
public class PostDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@JsonProperty(value = "id")
	private Long id;
	
	@JsonProperty(value = "title")
	private String title;
	
	@JsonProperty(value = "image")
	private String image;
	
	@NotBlank(message = "O Post deve conter pelo menos 1 caractere")
	private String body;
		
	@JsonProperty(value = "creationDate")
	private Instant creationDate;
	
	private UserMinDTO owner;
	
	@JsonProperty(value = "votesCount")
	private Long votesCount;
	
	@JsonProperty(value = "languages")
	private Set<LanguageDTO> languages = new HashSet<>();
	
	@JsonProperty(value = "coments")
	private List<ComentDTO> coments = new ArrayList<>();
	
	public PostDTO() {
	}
	
	public PostDTO(Long id, Instant creationDate, String image,
			@NotBlank(message = "O Post deve conter pelo menos 1 caractere") String body,
			UserMinDTO owner, Long votesCount) {
		this.id = id;
		this.creationDate = creationDate;
		this.image = image;
		this.body = body;
		this.owner = owner;
		this.votesCount = votesCount;
	}

	public PostDTO(Post entity) {
		id = entity.getId();
		title = entity.getTitle();
		creationDate = entity.getCreationDate();
		image = entity.getImage();
		body = entity.getBody();
		owner = new UserMinDTO(entity.getOwner());
		votesCount = entity.getVotes().stream().count();
		entity.getLanguages().forEach(language -> getLanguages().add(new LanguageDTO(language)));
		entity.getComents().forEach(comentUser -> getComents().add(new ComentDTO(comentUser)));
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
	
	public String getTitle() {
		return title;
	}
 
	public String getImage() {
		return image;
	}

	public String getBody() {
		return body;
	}
	
	public UserMinDTO getOwner() {
		return owner;
	}
	
	public Long votesCount() {
		return votesCount;
	}
	
	public Set<LanguageDTO> getLanguages(){
		return languages;
	}
	
	public List<ComentDTO> getComents() {
		return coments;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PostDTO other = (PostDTO) obj;
		return Objects.equals(id, other.id);
	}

}
