package com.astro.paraCodar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.astro.paraCodar.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
