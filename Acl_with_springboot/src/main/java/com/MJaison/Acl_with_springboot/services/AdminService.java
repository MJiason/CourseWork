package com.MJaison.Acl_with_springboot.services;

import com.MJaison.Acl_with_springboot.dtos.*;
import com.MJaison.Acl_with_springboot.repository.RoleRepository;
import com.MJaison.Acl_with_springboot.repository.UserRepository;
import com.MJaison.Acl_with_springboot.repository.UserRoleRepository;
import com.sun.deploy.security.UserDeclinedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;
import java.security.AccessControlException;
import java.util.List;
import java.util.Optional;


@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    private boolean isRead(User user){
        for (UserRole role : user.getRoles()) {
            if (role.getRole().isRead() && role.getRole().getResource().equals("users")){
                return true;
            }

        }
        return false;
    }


    private boolean isWrite(User user){
        for (UserRole role : user.getRoles()) {
            if (role.getRole().isWrite() && role.getRole().getResource().equals("users")){
                return true;
            }

        }
        return false;
    }


    private boolean isCreate(User user){
        for (UserRole role : user.getRoles()) {
            if (role.getRole().isCreate() && role.getRole().getResource().equals("users")){
                return true;
            }

        }
        return false;
    }



    private boolean isDelete(User user){
        for (UserRole role : user.getRoles()) {
            if (role.getRole().isDelete() && role.getRole().getResource().equals("users")){
                return true;
            }

        }
        return false;
    }

    private User getUser(long userId) throws UsernameNotFoundException {
        if (!userRepository.findById(userId).isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }

        return  userRepository.findById(userId).get();
    }

    public List<User> getAllUsers(long userId) {
        if (!isRead(getUser(userId))){
            throw new AccessControlException("User no access");
        }
        return userRepository.findAll();
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    private void setRole(User user, long roleId) throws RoleNotFoundException {
        Optional<Role> role = roleRepository.findById(roleId);
      if (!role.isPresent()){
          throw new RoleNotFoundException("Role not found");
      }
      userRoleRepository.save(new UserRole(null, user, role.get()));

    }


    public User deleteById(long id, long userId) throws AccessControlException {
        if (!isDelete(getUser(userId))){
            throw new AccessControlException("User no access");
        }

        Optional<User> user = findById(id);

        if (!user.isPresent())
            return null;
        Optional<UserRole> userRole = userRoleRepository.findByUserId(id);
        if(userRole.isPresent()){
          userRoleRepository.delete(userRole.get());
        }
        this.userRepository.deleteById(id);

        return user.get();
    }

    public Optional<User> findById(long id) {
        return this.userRepository.findById(id);
    }

    public User create(CreateUserRequest user, long userId) throws AccessControlException, RoleNotFoundException {
        if (!isCreate(getUser(userId))){
            throw new AccessControlException("User no access");
        }

        if (!(userRepository.findUserByUsername(user.getUsername())== null)) {
            throw new UserDeclinedException("user exist with username");
        }
        User newUser = user.getUser();
        userRepository.save(newUser);
        setRole(newUser, user.getRoleId());
        return newUser;
    }

}