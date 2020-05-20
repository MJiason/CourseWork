package com.MJaison.Acl_with_springboot.repository;

import com.MJaison.Acl_with_springboot.dtos.Course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Optional;


public interface CoursesRepository extends JpaRepository<Course, Long>{
}
