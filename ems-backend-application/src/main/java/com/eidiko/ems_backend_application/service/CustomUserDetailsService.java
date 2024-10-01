package com.eidiko.ems_backend_application.service;
import com.eidiko.ems_backend_application.entity.Employee;
import com.eidiko.ems_backend_application.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByEmail(username).get();
        Set<GrantedAuthority> authorities = employee.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("" + role.getName()))
                .collect(Collectors.toSet());

        if(employee ==null)
            throw  new UsernameNotFoundException("Username not found");
        return new User(employee.getEmail(), employee.getPassword(), authorities);
    }


}