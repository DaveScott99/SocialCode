package com.astro.socialCode.entities;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "PLAYLIST")
public class Playlist {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_PLAYLIST")
	private Long id;
	
	@Column(name = "NAME_PLAYLIST")
	private String name;
	
	@Column(name = "CREATION_MOMENT_PLAYLIST")
	@CreationTimestamp
	private Instant creationMoment;
	
	@ManyToOne
	@JoinColumn(name = "ID_OWNER")
	private User owner;
	
	@ManyToMany(mappedBy = "playlists", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<Video> videos = new HashSet<>();
	
	public Playlist() {
	}

	public Playlist(Long id, String name, Instant creationMoment, User owner) {
		this.id = id;
		this.name = name;
		this.creationMoment = creationMoment;
		this.owner = owner;
	}

	public Playlist(Long id, String name, User owner) {
		this.id = id;
		this.name = name;
		this.owner = owner;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Instant getCreationMoment() {
		return creationMoment;
	}

	public void setCreationMoment(Instant creationMoment) {
		this.creationMoment = creationMoment;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public Set<Video> getVideos() {
		return videos;
	}
	
}
