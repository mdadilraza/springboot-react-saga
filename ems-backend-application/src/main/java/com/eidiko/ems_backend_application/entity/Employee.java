package com.eidiko.ems_backend_application.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "employees")
@ToString
public class Employee
//        implements UserDetails
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "first_name")
    private String firstName ;

    @Column(name = "last_name")
    private String lastName ;

    @Column(name = "email", nullable = false ,unique = true)
    private String email;

    @Column(name = "password" ,nullable = false )
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "employee_roles",
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return Set.of( new SimpleGrantedAuthority(roles.toString()));
//    }
//
//    @Override
//    public String getUsername() {
//        return email;
//    }
}
