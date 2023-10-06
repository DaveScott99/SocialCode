package com.astro.socialCode.entities;

import java.time.Instant;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "COMENT_POST")
public class ComentPost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_COMENT")
	private Long id;
	
	@Column(name = "BODY_COMENT")
	private String text;
	
	@ManyToOne
	@JoinColumn(name = "ID_POST")
	private Post post;
	
	@ManyToOne
	@JoinColumn(name = "ID_OWNER")
	private User owner;
	
	@Column(name = "CREATION_MOMENT_COMENT")
	@CreationTimestamp
	private Instant creationDate;
	
	public ComentPost() {
	}
	
	public ComentPost(Long id, String text, Post post, User owner, Instant creationDate) {
		this.id = id;
		this.text = text;
		this.post = post;
		this.owner = owner;
		this.creationDate = creationDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}
	
	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public Instant getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Instant creationDate) {
		this.creationDate = creationDate;
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
		ComentPost other = (ComentPost) obj;
		return Objects.equals(id, other.id);
	}
	
}
