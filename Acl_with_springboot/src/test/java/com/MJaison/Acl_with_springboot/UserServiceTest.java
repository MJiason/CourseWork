package com.MJaison.Acl_with_springboot;

import com.MJaison.Acl_with_springboot.dtos.User;
import com.MJaison.Acl_with_springboot.repository.UserRepository;
import com.MJaison.Acl_with_springboot.services.AdminService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AdminService adminService;

    @Test
    void contextLoads() {
    }

    @Test
    void shouldSavedUserSuccessFully(){
        final User user = new User("username", "password", "firstName", "lastName");

        userRepository.save(user);

        assertThat(user).isNotNull();
        verify(userRepository).save(any(User.class));
    }

    @Test
    void findByUsername(){
        final Long id = 1L;

        assertThat(adminService.findById(id)).isNotNull();
    }

    @Test
    void shouldBeDelete() {
        final Long id = 25L;

        userRepository.deleteById(id);


        verify(userRepository, times(1)).deleteById(id);
    }





}
