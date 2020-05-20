package com.MJaison.Acl_with_springboot;

import com.MJaison.Acl_with_springboot.dtos.User;
import com.MJaison.Acl_with_springboot.repository.UserRepository;
import com.MJaison.Acl_with_springboot.services.AdminService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
class AclWithSpringbootApplicationTests {
	@Mock
	private UserRepository userRepository;

	@InjectMocks
	private AdminService adminService;

	@Test
	void contextLoads() {
	}



}
