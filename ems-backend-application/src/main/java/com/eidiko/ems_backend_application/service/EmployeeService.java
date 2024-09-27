package com.eidiko.ems_backend_application.service;

import com.eidiko.ems_backend_application.dto.EmployeeDto;
import com.eidiko.ems_backend_application.dto.RegisterRequest;
import com.eidiko.ems_backend_application.entity.Employee;

import java.util.List;

public interface EmployeeService {

    public EmployeeDto createEmployee(EmployeeDto employeeDto);
    public EmployeeDto getEmployeeById(long id);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(long id , EmployeeDto employeeDto);

    EmployeeDto deleteEmployee(long id);

    void registerEmployee(RegisterRequest request);

  Employee getStudentByEmail(String email);
}
