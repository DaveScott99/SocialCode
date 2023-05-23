package com.astro.paraCodar.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "post")
public class Post {
	
	@Id
	@Column(name = "ID", nullable = false, unique = true)
	private final String id = UUID.randomUUID().toString();
	
	@Column(name = "CREATION_DATE", nullable = false)
	@CreationTimestamp
	private LocalDateTime creationDate;
	
	@Column(name = "IMAGE_POST", nullable = true, columnDefinition = "TEXT")
	private String imagePost;
	
	@Column(name = "BODY", nullable = false, columnDefinition = "TEXT")
	private String body;
	
	@ManyToOne
	@JsonIgnoreProperties("posts")
	private User user;
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties("post")
	private List<Coment> coments = new ArrayList<>();
	
	@Column(name = "LIKES", nullable = false)
	private Long likes = 0L;

	public Post() {
	}

	public Post(@NotNull LocalDateTime creationDate, String imagePost, @NotNull String body, @NotNull User user, List<Coment> coments,
			@NotNull Long likes) {
		this.creationDate = creationDate;
		this.imagePost = imagePost;
		this.body = body;
		this.user = user;
		this.coments = coments;
		this.likes = likes;
	}

	public String getId() {
		return id;
	}	

	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
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
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public List<Coment> getComents() {
		return coments;
	}

	public Long getLikes() {
		return likes;
	}
	
	public void incrementLikes() {
		likes+=1;
	}
	
	public void decrementLikes() {
		likes-=1;
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
