package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.astro.socialCode.dto.ComentDTO;
import com.astro.socialCode.entities.Language;
import com.astro.socialCode.entities.Post;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
	
	private boolean votedByUser;
	
	@JsonProperty(value = "languages")
	private Set<LanguageDTO> languages = new HashSet<>();
	
	@JsonProperty(value = "coments")
	private Set<ComentDTO> coments = new HashSet<>();
	
	@JsonIgnore
	private Set<UserMinDTO> votes = new HashSet<>();
	
	public PostDTO() {
	}
	
	public PostDTO(Long id, Instant creationDate, String image,
			@NotBlank(message = "O Post deve conter pelo menos 1 caractere") String body,
			UserMinDTO owner, Long votesCount, boolean votedByUser) {
		this.id = id;
		this.creationDate = creationDate;
		this.image = image;
		this.body = body;
		this.owner = owner;
		this.votesCount = votesCount;
		this.votedByUser = votedByUser;
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
		entity.getVotes().forEach(vote -> getVotes().add(new UserMinDTO(vote)));
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
	
	public boolean isVotedByUser() {
		return votedByUser;
	}

	public void setVotedByUser(boolean votedByUser) {
		this.votedByUser = votedByUser;
	}

	public Set<LanguageDTO> getLanguages(){
		return languages;
	}
	
	public Set<ComentDTO> getComents() {
		return coments;
	}

	public Set<UserMinDTO> getVotes() {
		return votes;
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
