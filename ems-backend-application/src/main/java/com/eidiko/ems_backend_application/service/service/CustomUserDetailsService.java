package com.eidiko.ems_backend_application.service.service;
import com.eidiko.ems_backend_application.entity.Employee;
import com.eidiko.ems_backend_application.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByEmail(username);
        if(employee ==null)
            throw  new UsernameNotFoundException("Username not found");
        return new User(employee.getEmail(), employee.getPassword(), new ArrayList<>());
    }


}