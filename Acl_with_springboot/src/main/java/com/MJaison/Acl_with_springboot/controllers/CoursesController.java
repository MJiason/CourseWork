package com.MJaison.Acl_with_springboot.controllers;

import com.MJaison.Acl_with_springboot.dtos.Course;
import com.MJaison.Acl_with_springboot.dtos.EntityError;
import com.MJaison.Acl_with_springboot.dtos.User;
import com.MJaison.Acl_with_springboot.services.CoursesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.AccessControlException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
@RestController
public class CoursesController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private long getUserId(){
        Object userObject = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = (User) userObject;
        return user.getId();
    }


    @Autowired
    private CoursesService courseManagementService;

    @GetMapping("/instructors/{username}/courses")
    public ResponseEntity<List<Course>> getAllCourses(@PathVariable String username) {
        try {
            List<Course> list = courseManagementService.findAll(getUserId());
            return new ResponseEntity<>(list, HttpStatus.OK);
        }catch (AccessControlException exception){
            return new ResponseEntity(new EntityError("VAL COURSE 403", exception.getMessage()), HttpStatus.FORBIDDEN);
        }

    }

    @DeleteMapping("/instructors/{username}/courses/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String username, @PathVariable long id, Long userId) {
        Course course = courseManagementService.findById(id).get();
        try {
            courseManagementService.deleteById(id, getUserId());
        }catch (AccessControlException exception){
            return new ResponseEntity(new EntityError("VAL COURSE 403", exception.getMessage()), HttpStatus.FORBIDDEN);
        }


        if (course != null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();

    }

    @GetMapping("/instructors/{username}/courses/{id}")
    public ResponseEntity<Object> getCourse(@PathVariable String username, @PathVariable long id) {
        Optional<Course> course = this.courseManagementService.findById(id);

        if(!course.isPresent()){
            return new ResponseEntity<>(new EntityError("NOT_FOUND", "Course not found"),HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(course.get(), HttpStatus.OK);
    }

    @PutMapping("/instructors/{username}/courses/{id}")
    public ResponseEntity<Object> updateCourse(@PathVariable String username, @PathVariable long id,
                                               @RequestBody Course course) throws IllegalArgumentException {

        course.setUsername(username);
        Course courseUpdated;


        try {
            courseUpdated = courseManagementService.save(course, getUserId());
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(new EntityError("VAL COURSE 101", ex.getMessage()), HttpStatus.BAD_REQUEST);

        }catch (AccessControlException ex){
            return new ResponseEntity(new EntityError("VAL COURSE 403", ex.getMessage()), HttpStatus.FORBIDDEN);
        }
        catch (Exception ex) {
            return new ResponseEntity<>(new EntityError("VAL COURSE 101", "Internal error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(courseUpdated, HttpStatus.OK);
    }

    @PostMapping("/instructors/{username}/courses")
    public ResponseEntity<Object> createCourse(@PathVariable String username, @RequestBody Course course) {
        logger.info(course.getDescription());
        course.setUsername(username);

        Course courseCreated;
        try {
            courseCreated = courseManagementService.create(course, getUserId());
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(new EntityError("VAL COURSE 102", ex.getMessage()), HttpStatus.BAD_REQUEST);

        }catch (AccessControlException ex){
            return new ResponseEntity(new EntityError("VAL COURSE 403", ex.getMessage()), HttpStatus.FORBIDDEN);
        }
        catch (Exception ex) {
            logger.error("", ex);
            return new ResponseEntity<>(new EntityError("VAL COURSE 102", "Internal error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(courseCreated, HttpStatus.CREATED);

    }
}

