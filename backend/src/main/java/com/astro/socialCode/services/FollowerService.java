package com.astro.socialCode.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.astro.socialCode.dto.mapper.UserMapper;
import com.astro.socialCode.dto.response.UserMinDTO;
import com.astro.socialCode.entities.User;
import com.astro.socialCode.repositories.UserRepository;
import com.astro.socialCode.services.exceptions.EntityNotFoundException;
import com.astro.socialCode.util.UtilMethods;

@Service
public class FollowerService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;
	private final UtilMethods utilMethods;

	public FollowerService(UserRepository userRepository, UserMapper userMapper, UtilMethods utilMethods) {
		this.userRepository = userRepository;
		this.userMapper = userMapper;
		this.utilMethods = utilMethods;
	}

	@Transactional
	public void followUser(Long userId, Long followerId) {		
		userRepository.findById(userId)
		  	 .map(userFound -> {
		  		User userToFollow = userRepository.findById(followerId)
					  	    .orElseThrow(() -> new EntityNotFoundException("Usuário a ser seguido não encontrado"));
		  		
		  		if (!(userFound.getFollowing().contains(userToFollow)) && userFound.getId() != userToFollow.getId()) {
		  			userFound.getFollowing().add(userToFollow);
		  			userRepository.save(userFound);
					System.out.println("DEBUG::Usuário seguido com sucesso!");
		  		}

		  		return userFound;
		  		
		  	 })
		  	 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
	}
	
	@Transactional
	public void unfollowUser(Long userId, Long followerId) {
		userRepository.findById(userId)
			  .map(userFound -> {
				  User userToUnfollow = userRepository.findById(followerId)
					  	    .orElseThrow(() -> new EntityNotFoundException("Usuário seguido não encontrado"));
				  
				  if ((userFound.getFollowing().contains(userToUnfollow)) && userFound.getId() != userToUnfollow.getId()) {
					  userFound.getFollowing().remove(userToUnfollow); 
					  userRepository.save(userFound);
					  System.out.println("DEBUG::Usuário não está mais sendo seguido");
				  }
				  
				  return userFound;
				  
			  })
			  .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
	}
	
	@Transactional(readOnly = true)
	public Page<UserMinDTO> findUserFollowers(Pageable pageable, Long userId) {
		List<UserMinDTO> followers = userRepository.findById(userId)
				 .map(foundUser -> {
					 return foundUser.getFollowers()
					 		   .stream()
					 		   .map(userMapper::toMinDTO)
					 		   .toList();
				 })
				 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));	 
		
		return utilMethods.convertListToPagination(pageable, followers);
	}
	
	@Transactional(readOnly = true)
	public Page<UserMinDTO> findUserFollowing(Pageable pageable,  Long userId) {
		List<UserMinDTO> following = userRepository.findById(userId)
				 .map(foundUser -> {
					 return foundUser.getFollowing()
					 		   .stream()
					 		   .map(userMapper::toMinDTO)
					 		   .toList();
				 })
				 .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));	
		
		return utilMethods.convertListToPagination(pageable, following);
	}
	
	@Transactional(readOnly = true)
	public boolean isFollowing(String sourceUser, String userToFollow) {
		boolean isFollwing = userRepository.findByUsername(sourceUser)
			.map(userFound -> {
				User follower = userRepository.findByUsername(userToFollow)
				  	    .orElseThrow(() -> new EntityNotFoundException("Usuário seguido não encontrado"));
				if (userFound.getFollowing().contains(follower)) {
					return true;
				}
				return false;
			})
			.orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
		return isFollwing;	
	}
	
}
