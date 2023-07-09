package com.astro.socialCode.entities;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "POST")
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", nullable = false, unique = true)
	private Long id;
	
	@Column(name = "CREATION_DATE", nullable = false)
	@CreationTimestamp
	private Instant creationDate;
	
	@Column(name = "IMAGE_POST", nullable = true, columnDefinition = "TEXT")
	private String imagePost;
	
	@Column(name = "BODY", nullable = false, columnDefinition = "TEXT")
	private String body;
	
	@ManyToOne
	@JsonIgnoreProperties("posts")
	private User owner;
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
	@JsonIgnoreProperties("post")
	private List<Coment> coments = new ArrayList<>();
	
	@ManyToMany(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinTable(name = "post_vote",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "VOTES", columnDefinition = "TEXT DEFAULT ''")
	private Set<User> votes = new HashSet<>();
	
	@ManyToMany
	@JoinTable(name = "post_language",
		joinColumns = @JoinColumn(name = "post_id"),
		inverseJoinColumns = @JoinColumn(name = "language_id"))
	private Set<Language> languages = new HashSet<>();
	
	public Post() {
	}

	public Post(Long id, @NotNull Instant creationDate, String imagePost, @NotNull String body, @NotNull User owner) {
		this.id = id;
		this.creationDate = creationDate;
		this.imagePost = imagePost;
		this.body = body;
		this.owner = owner;
	}
	
	public Post(Long id, String body) {
		this.id = id;
		this.body = body;
	}
			
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}

	public Instant getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Instant creationDate) {
		this.creationDate = creationDate;
	}

	public String getImagePost() {
		return imagePost;
	}

	public void setImagePost(String imagePost) {
		this.imagePost = imagePost;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}
	
	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public List<Coment> getComents() {
		return coments;
	}

	public Set<User> getVotes() {
		return votes;
	}

	public Set<Language> getLanguages() {
		return languages;
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
		Post other = (Post) obj;
		return Objects.equals(id, other.id);
	}
	
}
