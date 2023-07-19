package com.astro.socialCode.entities;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "languages")
	private Set<Post> posts = new HashSet<>();
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "interest")
	private Set<User> users = new HashSet<>();

	public Language(){
	}
	
	public Language(Long id, String name, String icon, Set<Post> posts, Set<User> users) {
		this.id = id;
		this.name = name;
		this.icon = icon;
		this.posts = posts;
		this.users = users;
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
	
	public Set<User> getUSers() {
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

	@Override
	public String toString() {
		return "Language [id=" + id + ", name=" + name + "]";
	}

}
