package com.astro.paraCodar.entities;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "USER")
public class User {

	@Id
	@Column(name = "ID", nullable = false, unique = true)
	private String id = UUID.randomUUID().toString();
	
	@Column(name="FIRST_NAME", nullable = false, length = 120)
	private String firstName;
	
	@Column(name="LAST_NAME", nullable = false, length = 120)
	private String lastName;
	
	@Column(name="USERNAME", unique = true, nullable = false, length = 150)
	private String username;
	
	@Column(name="BIOGRAPHY", nullable = true, length = 255)
	private String biography;
	
	@Column(name="USER_IMG", nullable = true, columnDefinition = "TEXT")
	private String userImg;
	
	@Column(name="EMAIL", unique = true, nullable = false, updatable = false)
	private String email;
	
	@Column(name="PASSWORD", nullable = false)
	private String password;
	
	@Column(name = "REGISTRATION_MOMENT", nullable = false)
	@CreationTimestamp
	private Instant registrationMoment;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
	@JsonIgnore
	private List<Post> posts;
	
	@ManyToMany(mappedBy = "likes", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
	@JsonIgnore
	private Set<Post> likedPosts = new HashSet<>();
	
	public User() {
	}

	public User(@NotNull String firstName, @NotNull String lastName, @NotNull String username, String biography, String userImg, @NotNull String email,
			@NotNull String password, Instant registrationMoment) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.biography = biography;
		this.userImg = userImg;
		this.email = email;
		this.password = password;
		this.registrationMoment = registrationMoment;
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getBiography() {
		return biography;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

	public String getUserImg() {
		return userImg;
	}

	public void setUserImg(String userImg) {
		this.userImg = userImg;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public Instant getRegistrationMoment() {
		return registrationMoment;
	}

	public void setRegistrationMoment(Instant registrationMoment) {
		this.registrationMoment = registrationMoment;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	public Set<Post> getLikedPosts() {
		return likedPosts;
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
		User other = (User) obj;
		return Objects.equals(id, other.id);
	}
	
}
