package com.eidiko.ems_backend_application.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Roles implements GrantedAuthority {
    ROLE_EMPLOYEE,
    ROLE_ADMIN;


    @Override
    public String getAuthority() {
        return this.name();
    }
}