package com.eidiko.ems_backend_application.modelmapper;

import com.eidiko.ems_backend_application.dto.EmployeeDto;
import com.eidiko.ems_backend_application.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {

    @Autowired
    PasswordEncoder encoder;

    public EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail() ,
                employee.getPassword()
        );
    }

    public Employee mapToEmployee(EmployeeDto employeeDto){

        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail() ,
                encoder.encode(employeeDto.getPassword())
        );
    }
}
