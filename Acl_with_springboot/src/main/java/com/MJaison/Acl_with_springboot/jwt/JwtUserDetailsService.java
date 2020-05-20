package com.MJaison.Acl_with_springboot.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.MJaison.Acl_with_springboot.dtos.User;
import com.MJaison.Acl_with_springboot.repository.UserRepository;
import com.sun.security.auth.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sun.plugin.util.UserProfile;

@Service
public class JwtUserDetailsService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;

 @Autowired
 private PasswordEncoder bcryptEncoder;


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findUserByUsername(username);
    if (user == null ){
      throw new  UsernameNotFoundException("User not found with username "+ username);
    }
    return user;
  }


}


