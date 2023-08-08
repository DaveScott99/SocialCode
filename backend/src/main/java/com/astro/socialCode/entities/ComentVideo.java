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
@Table(name = "COMENT_VIDEO")
public class ComentVideo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_COMENT")
	private Long id;
	
	@Column(name = "BODY_COMENT")
	private String text;
	
	@ManyToOne
	@JoinColumn(name = "ID_OWNER")
	private User owner;

	@ManyToOne
	@JoinColumn(name = "ID_VIDEO")
	private Video video;
	
	@Column(name = "CREATION_MOMENT_COMENT")
	@CreationTimestamp
	private Instant creationDate;
	
	public ComentVideo() {
	}
	
	public ComentVideo(Long id, String text, User owner, Video video, Instant creationDate) {
		this.id = id;
		this.text = text;
		this.owner = owner;
		this.video = video;
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

	public Video getVideo() {
		return video;
	}

	public void setVideo(Video video) {
		this.video = video;
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
		ComentVideo other = (ComentVideo) obj;
		return Objects.equals(id, other.id);
	}
	
}
