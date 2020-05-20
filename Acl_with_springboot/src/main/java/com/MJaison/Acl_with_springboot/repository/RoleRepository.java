package com.MJaison.Acl_with_springboot.repository;

import com.MJaison.Acl_with_springboot.dtos.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String roleName);
}
