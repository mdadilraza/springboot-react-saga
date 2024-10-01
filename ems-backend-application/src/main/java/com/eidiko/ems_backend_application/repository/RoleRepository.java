package com.eidiko.ems_backend_application.repository;

import com.eidiko.ems_backend_application.entity.Role;
import com.eidiko.ems_backend_application.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Roles name);
}