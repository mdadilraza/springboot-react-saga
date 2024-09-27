package com.eidiko.ems_backend_application.repository;

import com.eidiko.ems_backend_application.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee ,Long> {

    Employee findByEmail(String email);
}
