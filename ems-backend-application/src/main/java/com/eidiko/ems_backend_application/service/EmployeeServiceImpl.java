package com.eidiko.ems_backend_application.service;
import com.eidiko.ems_backend_application.dto.EmployeeDto;
import com.eidiko.ems_backend_application.dto.RegisterRequest;
import com.eidiko.ems_backend_application.entity.Employee;
import com.eidiko.ems_backend_application.entity.Role;
import com.eidiko.ems_backend_application.entity.Roles;
import com.eidiko.ems_backend_application.exception.ResourceNotFoundException;
import com.eidiko.ems_backend_application.modelmapper.EmployeeMapper;
import com.eidiko.ems_backend_application.repository.EmployeeRepository;
import com.eidiko.ems_backend_application.repository.RoleRepository;
import lombok.AllArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    private PasswordEncoder passwordEncoder;
    EmployeeMapper employeeMapper;
    private RoleRepository roleRepository;



    @Override
    public Employee createEmployee(Employee employee) {
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        log.info("employee : {}" , employee);
        return employeeRepository.save(employee);

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
    public EmployeeDto updateEmployee(long id, Employee employee) {
        Employee fetchedEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("user not available"));

        employee.setId(id);
        employee.setPassword(fetchedEmployee.getPassword());
//        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        Employee save = employeeRepository.save(employee);
        return employeeMapper.mapToEmployeeDto(save);
    }

    @Override
    public Employee deleteEmployee(long id) {
        Employee employee = employeeRepository.findById(id).get();
//        EmployeeDto employeeDto  = getEmployeeById(id);
//        System.out.println(employeeDto);
      employeeRepository.delete(employee);
        System.out.println("deleted ");
      return employee;
    }

    @Override
    public RegisterRequest registerEmployee(RegisterRequest request) {

        Employee employee = new Employee();
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPassword(passwordEncoder.encode(request.getPassword()));
        // Handle roles
//        Set<Role> roles = request.getRoles().stream()
//                .map(roleName -> roleRepository.findByName(roleName)
//                        .orElseThrow(() -> new RuntimeException("Error: Role not found.")))
//                .collect(Collectors.toSet());

        Set<Role> roles = request.getRoles() != null && !request.getRoles().isEmpty() ?
                request.getRoles().stream()
                        .map(roleName -> roleRepository.findByName(roleName)
                                .orElseThrow(() -> new RuntimeException("Error: Role not found.")))
                        .collect(Collectors.toSet()) :
                Set.of(new Role(Roles.ROLE_EMPLOYEE));
        employee.setRoles(roles);

        employeeRepository.save(employee);
        return request;
    }

    @Override
    public Employee getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("user not present"));
    }
}
