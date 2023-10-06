package com.astro.socialCode.dto.request;

import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.entities.Playlist;

public class PlaylistCreateDTO {

	private Long id;
	private String name;
	private UserMinDTO owner;
	
	public PlaylistCreateDTO() {
	}

	public PlaylistCreateDTO(Long id, String name, UserMinDTO owner) {
		this.id = id;
		this.name = name;
		this.owner = owner;
	}
	
	public PlaylistCreateDTO(Playlist entity) {
		id = entity.getId();
		name = entity.getName();
		owner = new UserMinDTO(entity.getOwner());
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

	public UserMinDTO getOwner() {
		return owner;
	}

	public void setOwner(UserMinDTO owner) {
		this.owner = owner;
	}
	
}
