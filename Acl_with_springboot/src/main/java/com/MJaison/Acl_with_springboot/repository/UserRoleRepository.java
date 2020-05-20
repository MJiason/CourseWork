package com.MJaison.Acl_with_springboot.repository;

import com.MJaison.Acl_with_springboot.dtos.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findByUserId(Long id);
}
