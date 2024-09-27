package com.eidiko.ems_backend_application.service;
import com.eidiko.ems_backend_application.dto.EmployeeDto;
import com.eidiko.ems_backend_application.dto.RegisterRequest;
import com.eidiko.ems_backend_application.entity.Employee;
import com.eidiko.ems_backend_application.exception.ResourceNotFoundException;
import com.eidiko.ems_backend_application.modelmapper.EmployeeMapper;
import com.eidiko.ems_backend_application.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    EmployeeMapper employeeMapper;


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
     Employee employee= employeeRepository.save(employeeMapper.mapToEmployee(employeeDto));
        return employeeMapper.mapToEmployeeDto(employee);

    }

    @Override
    public EmployeeDto getEmployeeById(long id){
      Employee employee=  employeeRepository.findById(id)
              .orElseThrow(() ->
                      new ResourceNotFoundException("Employee is not Exist with The given "+id));

      return employeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
      List<Employee>  employeeList =employeeRepository.findAll();
        return employeeList
                .stream()
                .map(employeeMapper::mapToEmployeeDto)
                .toList();
    }

    @Override
    public EmployeeDto updateEmployee(long id, EmployeeDto employeeDto) {
     employeeDto.setId(id);
        Employee save = employeeRepository.save(employeeMapper.mapToEmployee(employeeDto));
        return employeeMapper.mapToEmployeeDto(save);
    }

    @Override
    public EmployeeDto deleteEmployee(long id) {
        EmployeeDto employeeDto  = getEmployeeById(id);
        System.out.println(employeeDto);
      employeeRepository.delete(employeeMapper.mapToEmployee(employeeDto));
        System.out.println("deleted ");
      return employeeDto;
    }

    @Override
    public void registerEmployee(RegisterRequest request) {

        Employee employee = new Employee();
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPassword(passwordEncoder.encode(request.getPassword()));
        employeeRepository.save(employee);
    }

    @Override
    public Employee getStudentByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
}
