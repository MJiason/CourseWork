package com.MJaison.Acl_with_springboot.repository;

import com.MJaison.Acl_with_springboot.dtos.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUsername(String username);
}
