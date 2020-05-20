package com.MJaison.Acl_with_springboot;

import com.MJaison.Acl_with_springboot.dtos.Course;
import com.MJaison.Acl_with_springboot.repository.CoursesRepository;
import com.MJaison.Acl_with_springboot.services.AdminService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


@ExtendWith(MockitoExtension.class)
public class CoursesServiceTest {
    @Mock
    private CoursesRepository coursesRepository;

    @InjectMocks
    private AdminService adminService;

    @Test
    void contextLoads() {
    }

    @Test
    void shouldSavedСourseSuccessFully(){
        final Course course = new Course(null, "username", "discription");

        coursesRepository.save(course);

        assertThat(course).isNotNull();
        verify(coursesRepository).save(any(Course.class));
    }

    @Test
    void findById(){
        final Long id = 1L;

        assertThat(coursesRepository.findById(id)).isNotNull();
    }

    @Test
    void shouldBeDelete() {
        final Long id = 25L;

        coursesRepository.deleteById(id);


        verify(coursesRepository, times(1)).deleteById(id);
    }

}
