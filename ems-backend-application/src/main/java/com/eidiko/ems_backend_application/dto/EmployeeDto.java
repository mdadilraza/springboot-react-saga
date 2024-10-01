package com.eidiko.ems_backend_application.dto;

import com.eidiko.ems_backend_application.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;


@Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
@ToString
    public class EmployeeDto {

      private long id;
        private String firstName ;
        private String lastName ;
        private String email;
        private String password;
        private Set<String> roles;
    }
