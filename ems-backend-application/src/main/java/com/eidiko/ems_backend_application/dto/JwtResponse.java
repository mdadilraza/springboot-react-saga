package com.eidiko.ems_backend_application.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String tokenType = "Bearer ";
    private EmployeeDto employeeDto;



}
