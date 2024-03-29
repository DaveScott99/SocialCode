package com.astro.socialCode.entities;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "USER_ACCOUNT")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_USER")
	private Long id;
	
	@Column(name="FIRST_NAME_USER")
	private String firstName;
	
	@Column(name="LAST_NAME_USER")
	private String lastName;
	
	@Column(name="USERNAME_USER")
	private String username;
	
	@Column(name="BIOGRAPHY_USER")
	private String biography;
	
	@Column(name="TITLE_USER")
	private String title;
	
	@Column(name="GITHUB_USER")
	private String gitHubLink;
	
	@Column(name="LINKEDIN_USER")
	private String linkedinLink;
	
	@Column(name="PROFILE_PHOTO_USER")
	private String profilePhoto;
	
	@Column(name="EMAIL_USER")
	private String email;
	
	@Column(name="PASSWORD_USER")
	private String password;
	
	@Column(name = "REGISTRATION_MOMENT_USER")
	@CreationTimestamp
	private Instant registrationMoment;
	
	@OneToMany(mappedBy = "owner")
	private Set<Post> posts = new HashSet<>();
	
	@OneToMany(mappedBy = "owner")
	private Set<Video> videos = new HashSet<>();
	
	@OneToMany(mappedBy = "owner")
	private Set<ComentPost> comentsInPosts = new HashSet<>();
	
	@OneToMany(mappedBy = "owner")
	private Set<ComentVideo> comentsInVideos = new HashSet<>();
	
	@OneToMany(mappedBy = "owner")
	private Set<Playlist> playlists = new HashSet<>();
	
	@ManyToMany(mappedBy = "votes")
	private Set<Post> votedPosts = new HashSet<>();
	
	@ManyToMany(mappedBy = "votes", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<Video> votedVideos = new HashSet<>();
	
	@ManyToMany(mappedBy = "users")
	private Set<Language> interest = new HashSet<>();
	
	@ManyToMany
	@JoinTable(
		name = "USER_ACCOUNT_FOLLOWING",
		joinColumns = @JoinColumn(name = "ID_USER"),
		inverseJoinColumns = @JoinColumn(name = "ID_FOLLOWING")
	)
	private Set<User> following = new HashSet<>();
	
	@ManyToMany(mappedBy = "following")
	private Set<User> followers = new HashSet<>();
	
	public User() {
	}
	
	public User(Long id, String firstName, String lastName, String username, String biography, String title,
			String gitHubLink, String linkedinLink, String profilePhoto,
			String email, String password, Instant registrationMoment) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.biography = biography;
		this.title = title;
		this.gitHubLink = gitHubLink;
		this.linkedinLink = linkedinLink;
		this.profilePhoto = profilePhoto;
		this.email = email;
		this.password = password;
		this.registrationMoment = registrationMoment;
	}
	
	public User(Long id, String username, String profilePhoto) {
		this.id = id;
		this.username = username;
		this.profilePhoto = profilePhoto;
	}
			
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getGitHubLink() {
		return gitHubLink;
	}

	public void setGitHubLink(String gitHubLink) {
		this.gitHubLink = gitHubLink;
	}

	public String getLinkedinLink() {
		return linkedinLink;
	}

	public void setLinkedinLink(String linkedinLink) {
		this.linkedinLink = linkedinLink;
	}

	public String getProfilePhoto() {
		return profilePhoto;
	}

	public void setProfilePhoto(String profilePhoto) {
		this.profilePhoto = profilePhoto;
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

	public Set<Post> getPosts() {
		return posts;
	}

	public Set<Post> getVotedPosts() {
		return votedPosts;
	}
	
	public Set<ComentPost> getComentsInPosts() {
		return comentsInPosts;
	}

	public Set<ComentVideo> getComentsInVideos() {
		return comentsInVideos;
	}

	public Set<User> getFollowing() {
		return following;
	}

	public Set<User> getFollowers() {
		return followers;
	}
	
	public Set<Language> getInterest() {
		return interest;
	}
	
	public Set<Video> getVideos() {
		return videos;
	}

	public Set<Video> getVotedVideos() {
		return votedVideos;
	}

	public Set<Playlist> getPlaylists() {
		return playlists;
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
