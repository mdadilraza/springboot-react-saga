package com.eidiko.ems_backend_application;

import com.eidiko.ems_backend_application.entity.Role;
import com.eidiko.ems_backend_application.entity.Roles;
import com.eidiko.ems_backend_application.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication

public class EmsBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(EmsBackendApplication.class, args);
	}
@Autowired
	private RoleRepository roleRepository;

	@Override
	public void run(String... args) {
		// Ensure roles exist in the database
		if (roleRepository.findByName(Roles.ROLE_EMPLOYEE).isEmpty()) {
			roleRepository.save(new Role(1L,Roles.ROLE_EMPLOYEE));
		}
		if (roleRepository.findByName(Roles.ROLE_ADMIN).isEmpty()) {
			roleRepository.save(new Role(2L ,Roles.ROLE_ADMIN));
		}
		// Add more roles as needed
	}
}
