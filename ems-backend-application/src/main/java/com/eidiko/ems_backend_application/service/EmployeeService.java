package com.eidiko.ems_backend_application.service;

import com.eidiko.ems_backend_application.dto.EmployeeDto;
import com.eidiko.ems_backend_application.dto.RegisterRequest;
import com.eidiko.ems_backend_application.entity.Employee;

import java.util.List;

public interface EmployeeService {

     Employee createEmployee(Employee employee);
     EmployeeDto getEmployeeById(long id);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(long id , Employee employee);

    Employee deleteEmployee(long id);

    RegisterRequest registerEmployee(RegisterRequest request);

     Employee getEmployeeByEmail(String email);
}
