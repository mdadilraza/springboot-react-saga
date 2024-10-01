package com.eidiko.ems_backend_application.modelmapper;

import com.eidiko.ems_backend_application.dto.EmployeeDto;
import com.eidiko.ems_backend_application.entity.Employee;
import com.eidiko.ems_backend_application.entity.Role;
import com.eidiko.ems_backend_application.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class EmployeeMapper {

    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private RoleRepository roleRepository;

    public EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
//                employee.getPassword(),
                null ,
//                employee.getRoles().stream()
//                        .map(role -> role.getName().name())
//                        .collect(Collectors.toSet())
                employee.getRoles() != null ? employee.
                        getRoles().
                        stream().
                        map(role -> role.getName().
                                name()).
                        collect(Collectors.toSet()) :
                        new HashSet<>()

        );
    }

    public Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail(),
                encoder.encode(employeeDto.getPassword()),
                null
        );

    }
}
