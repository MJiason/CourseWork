package com.MJaison.Acl_with_springboot.services;

import com.MJaison.Acl_with_springboot.dtos.Course;
import com.MJaison.Acl_with_springboot.dtos.User;
import com.MJaison.Acl_with_springboot.dtos.UserRole;
import com.MJaison.Acl_with_springboot.repository.CoursesRepository;
import com.MJaison.Acl_with_springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.AccessControlException;
import java.util.List;
import java.util.Optional;

@Service
public class CoursesService {


    @Autowired
    private CoursesRepository coursesRepository;

    @Autowired
    private UserRepository userRepository;

    private User getUser(long userId) throws UsernameNotFoundException {
        if (!userRepository.findById(userId).isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }

        return  userRepository.findById(userId).get();
    }

    private boolean isRead(User user){
        for (UserRole role : user.getRoles()) {
            if (role.getRole().isRead() && role.getRole().getResource().equals("courses")){
                return true;
            }

        }
        return false;
    }


    private boolean isWrite(User user){
        for (UserRole role : user.getRoles()) {
            if (role.getRole().isWrite() && role.getRole().getResource().equals("courses")){
                return true;
            }

        }
        return false;
    }


    private boolean isCreate(User user){
        for (UserRole role : user.getRoles()) {
            if (role.getRole().isCreate() && role.getRole().getResource().equals("courses")){
                return true;
            }

        }
        return false;
    }



    private boolean isDelete(User user){
        for (UserRole role : user.getRoles()) {
            if (role.getRole().isDelete() && role.getRole().getResource().equals("courses")){
                return true;
            }

        }
        return false;
    }
    public List<Course> findAll(long userId) throws AccessControlException {
        if (!isRead(getUser(userId))){
            throw new AccessControlException("User no access");
        }
        return this.coursesRepository.findAll();
    }

    public Course deleteById(long id, long userId) throws AccessControlException {
        if (!isDelete(getUser(userId))){
            throw new AccessControlException("User no access");
        }
        Optional<Course> course = findById(id);

        if (!course.isPresent())
            return null;

        this.coursesRepository.deleteById(id);

        return course.get();
    }

    public Optional<Course> findById(long id) {
        return this.coursesRepository.findById(id);
    }


    public Course save(Course course, long userId) throws AccessControlException {
        if (!isWrite(getUser(userId))){
            throw new AccessControlException("User no access");
        }

        if (course.getId() <= 0) {
            throw new IllegalArgumentException("Id cannot be 0 for update operation");
        }

        if (!findById(course.getId()).isPresent()){
            throw new IllegalArgumentException("Id not found in db");
        }

        return this.coursesRepository.save(course);
    }


    public Course create(Course course, long userId) throws AccessControlException {
        if (!isCreate(getUser(userId))){
           throw new AccessControlException("User no access");
        }
        if (course.getId() != null && course.getId() > 0) {
            throw new IllegalArgumentException("Id must be 0 for create operation");
        }
        return this.coursesRepository.save(course);
    }
}


