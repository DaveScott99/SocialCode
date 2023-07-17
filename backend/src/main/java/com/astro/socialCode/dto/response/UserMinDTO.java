package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.util.Objects;

import com.astro.socialCode.entities.User;

public class UserMinDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String username;
	private String profilePhoto;
	
	public UserMinDTO() {
	}
	
	public UserMinDTO(User user) {
		id = user.getId();
		username = user.getUsername();
		profilePhoto = user.getProfilePhoto();
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getProfilePhoto() {
		return profilePhoto;
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
		UserMinDTO other = (UserMinDTO) obj;
		return Objects.equals(id, other.id);
	}

}
