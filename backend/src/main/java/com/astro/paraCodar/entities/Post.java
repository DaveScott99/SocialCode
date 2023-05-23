package com.astro.paraCodar.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "post")
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate instant;
	private String title;
	
	@Column(columnDefinition = "TEXT")
	private String coverImg;
	
	@Column(columnDefinition = "TEXT")
	private String body;
	
	@ManyToOne
	@JsonIgnoreProperties("posts")
	private User user;
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties("post")
	private List<Coment> coments = new ArrayList<>();
	
	private Long likes = 0L;

	public Post() {
	}

	public Post(Long id, LocalDate instant, String title, String coverImg, String body, Long likes) {
		this.id = id;
		this.instant = instant;
		this.title = title;
		this.coverImg = coverImg;
		this.body = body;
		this.likes = 0L;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getInstant() {
		return instant;
	}

	public void setInstant(LocalDate instant) {
		this.instant = instant;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCoverImg() {
		return coverImg;
	}

	public void setCoverImg(String coverImg) {
		this.coverImg = coverImg;
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
