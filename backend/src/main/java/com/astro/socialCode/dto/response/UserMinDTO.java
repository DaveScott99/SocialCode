package com.astro.socialCode.dto.response;

import java.io.Serializable;
import java.util.Objects;

import com.astro.socialCode.entities.User;

public class UserMinDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String username;
	private String photo;
	private String title;
	
	public UserMinDTO() {
	}
	
	public UserMinDTO(User user) {
		id = user.getId();
		username = user.getUsername();
		photo = user.getPhoto();
		title = user.getTitle();
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public String getPhoto() {
		return photo;
	}
	
	public String getTitle() {
		return title;
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
