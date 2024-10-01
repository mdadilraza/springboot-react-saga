package com.eidiko.ems_backend_application.entity;

import com.eidiko.ems_backend_application.config.RoleDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles")

@JsonDeserialize(using = RoleDeserialize.class)
@ToString
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private Roles name;

    // Add a constructor that accepts a Roles enum
    public Role(Roles name) {
        this.name = name;
    }
}

