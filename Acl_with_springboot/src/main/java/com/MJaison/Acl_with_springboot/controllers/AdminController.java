package com.MJaison.Acl_with_springboot.controllers;

import com.MJaison.Acl_with_springboot.dtos.CreateUserRequest;
import com.MJaison.Acl_with_springboot.dtos.EntityError;
import com.MJaison.Acl_with_springboot.dtos.Role;
import com.MJaison.Acl_with_springboot.dtos.User;
import com.MJaison.Acl_with_springboot.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.AccessControlException;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    private long getUserId() {
        Object userObject = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = (User) userObject;
        return user.getId();
    }

    @GetMapping("/users/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = adminService.getAllUsers(getUserId());
            return new ResponseEntity<>(users, HttpStatus.OK);

        } catch (AccessControlException ex) {
            return new ResponseEntity(new EntityError("VAL COURSE 403", ex.getMessage()), HttpStatus.FORBIDDEN);

        } catch (Exception ex) {
            return new ResponseEntity(new EntityError("VAL COURSE 403", ex.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/roles")
    public ResponseEntity<Object> getRoles() {
        try {
            List<Role> roles = adminService.getAllRoles();
            return new ResponseEntity<>(roles, HttpStatus.OK);
        } catch (AccessControlException ex) {
            return new ResponseEntity(new EntityError("VAL COURSE 403", ex.getMessage()), HttpStatus.FORBIDDEN);

        } catch (Exception ex) {
            return new ResponseEntity(new EntityError("VAL COURSE 403", ex.getMessage()), HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {

        try {
            User user = adminService.deleteById(id, getUserId());
        } catch (AccessControlException ex) {
            return new ResponseEntity(new EntityError("VAL COURSE 403", ex.getMessage()), HttpStatus.FORBIDDEN);

        } catch (Exception ex) {
            return new ResponseEntity(new EntityError("VAL COURSE 403", ex.getMessage()), HttpStatus.FORBIDDEN);

        }

        return ResponseEntity.noContent().build();
    }


        @PostMapping("/users/new")
        public ResponseEntity<Object> createUser (@RequestBody CreateUserRequest user){

            User userCrated;
            try {
                userCrated = adminService.create(user, getUserId());


            } catch (IllegalArgumentException ex) {
                return new ResponseEntity<>(new EntityError("VAL COURSE 102", ex.getMessage()), HttpStatus.BAD_REQUEST);

            } catch (AccessControlException ex) {
                return new ResponseEntity(new EntityError("VAL COURSE 403", ex.getMessage()), HttpStatus.FORBIDDEN);

            } catch (Exception ex) {
                return new ResponseEntity<>(new EntityError("VAL COURSE 102", "Internal error"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(userCrated, HttpStatus.CREATED);

        }


    }
