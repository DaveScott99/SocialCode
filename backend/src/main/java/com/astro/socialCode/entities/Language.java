package com.astro.socialCode.entities;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "PROGRAMMING_LANGUAGE")
public class Language {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_LANGUAGE")
	private Long id;
	
	@Column(name="NAME_LANGUAGE")
	private String name;
	
	@Column(name = "ICON_LANGUAGE")
	private String icon;
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(
		name = "POST_PROGRAMMING_LANGUAGE",
		joinColumns = @JoinColumn(name = "ID_LANGUAGE"),
		inverseJoinColumns = @JoinColumn(name = "ID_POST")
	)
	private Set<Post> posts = new HashSet<>();
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(
		name = "USER_ACCOUNT_PROGRAMMING_LANGUAGE",
		joinColumns = @JoinColumn(name = "ID_LANGUAGE"),
		inverseJoinColumns = @JoinColumn(name = "ID_USER")
	)
	private Set<User> users = new HashSet<>();
	
	@JsonIgnore
	@ManyToMany
	@JoinTable(
		name = "VIDEO_PROGRAMMING_LANGUAGE",
		joinColumns = @JoinColumn(name = "ID_LANGUAGE"),
		inverseJoinColumns = @JoinColumn(name = "ID_VIDEO")
	)
	private Set<Video> videos = new HashSet<>();
	
	public Language(){
	}

	public Language(Long id) {
		this.id = id;
	}

	public Language(Long id, String name) {
		this.id = id;
		this.name = name;
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
	
	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Set<Post> getPosts() {
		return posts;
	}
	
	public Set<Video> getVideos() {
		return videos;
	}

	public Set<User> getUsers() {
		return users;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Language other = (Language) obj;
		return Objects.equals(id, other.id) && Objects.equals(name, other.name);
	}

}
